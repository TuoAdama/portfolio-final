#!/bin/sh

# Exit immediately on errors (-e) or references to undefined variables (-u).
set -eu

# --- Read arguments ---------------------------------------------------------

# The workflow must provide exactly the five arguments required for deployment.
if [ "$#" -ne 5 ]; then
  echo "Usage: $0 <environment> <deployment-directory> <image> <domain> <health-url>" >&2
  exit 64
fi

deploy_environment=$1
deployment_directory=$2
new_image=$3
domain=$4
health_url=$5

# --- Validate the deployment target ----------------------------------------

# Mirror the matrix defined in deploy.yml to prevent mismatches between the
# environment, deployment directory, domain, and health-check URL.
case "$deploy_environment" in
  preprod)
    expected_deployment_directory=/root/portfolio/preprod
    expected_domain=preprod.atuo.fr
    ;;
  prod)
    expected_deployment_directory=/root/portfolio/prod
    expected_domain=atuo.fr
    ;;
  *)
    echo "Unsupported deployment environment: $deploy_environment" >&2
    exit 64
    ;;
esac

expected_health_url="https://$expected_domain/health"

# These checks prevent, for example, a production deployment from targeting the
# preproduction directory or a health check from querying the wrong application.
if [ "$deployment_directory" != "$expected_deployment_directory" ]; then
  echo "Unexpected deployment directory for $deploy_environment: $deployment_directory" >&2
  exit 64
fi

if [ "$domain" != "$expected_domain" ]; then
  echo "Unexpected deployment domain for $deploy_environment: $domain" >&2
  exit 64
fi

if [ "$health_url" != "$expected_health_url" ]; then
  echo "Unexpected health URL for $deploy_environment: $health_url" >&2
  exit 64
fi

# Only accept immutable images published by this project for the target environment.
case "$new_image" in
  ghcr.io/tuoadama/portfolio-final:"$deploy_environment"-*) ;;
  *)
    echo "Unexpected image reference: $new_image" >&2
    exit 64
    ;;
esac

# Strip the image prefix to isolate and validate the revision supplied by GitHub.
# IMAGE_SHA is always a full Git SHA, so it must contain 40 hexadecimal characters.
image_revision=${new_image#ghcr.io/tuoadama/portfolio-final:"$deploy_environment"-}
if ! printf '%s\n' "$image_revision" | grep -Eq '^[0-9a-f]{40}$'; then
  echo "Image tag must end with the 40-character Git commit SHA: $new_image" >&2
  exit 64
fi

# --- Prepare local state ----------------------------------------------------

# All persistent files remain scoped to their environment through the validated
# directory above (/root/portfolio/prod or /root/portfolio/preprod).
compose_file="$deployment_directory/docker-compose.yml"
environment_file="$deployment_directory/.env"
history_file="$deployment_directory/.deployed-images"

# GitHub Actions copies the Compose file to the server before invoking this script.
if [ ! -f "$compose_file" ]; then
  echo "Compose file not found: $compose_file" >&2
  exit 66
fi

mkdir -p "$deployment_directory"
cd "$deployment_directory"

previous_image=""
# The currently configured image becomes the rollback target if deployment fails.
# An empty value means this is the environment's first deployment.
if [ -f "$environment_file" ]; then
  previous_image=$(sed -n 's/^PORTFOLIO_IMAGE=//p' "$environment_file" | head -n 1)
fi

# Write .env atomically so Compose never reads a partially written file.
write_environment_file() {
  selected_image=$1
  temporary_environment_file="$environment_file.tmp.$$"

  {
    printf 'DEPLOY_ENV=%s\n' "$deploy_environment"
    printf 'DOMAIN=%s\n' "$domain"
    printf 'PORTFOLIO_IMAGE=%s\n' "$selected_image"
  } > "$temporary_environment_file"

  chmod 600 "$temporary_environment_file"
  mv "$temporary_environment_file" "$environment_file"
}

# Run Compose consistently with the correct environment and Compose files.
compose() {
  docker compose --env-file "$environment_file" -f "$compose_file" "$@"
}

# --- Deploy and roll back ---------------------------------------------------

# Restore the previous image, or stop the first deployment if no rollback exists.
rollback() {
  echo "Deployment failed; restoring the previous image." >&2

  if [ -n "$previous_image" ] && [ "$previous_image" != "$new_image" ]; then
    # Normal case: redeploy the known previous image and wait until it is healthy.
    write_environment_file "$previous_image"
    compose pull
    compose up -d --remove-orphans --wait --wait-timeout 120
    echo "Rollback completed with $previous_image." >&2
  elif [ -z "$previous_image" ]; then
    # First deployment: no previously stable state exists to restore.
    compose down --remove-orphans || true
    echo "No previous image was available; the failed first deployment was stopped." >&2
  else
    # Redeploying the same SHA provides no distinct fallback version.
    echo "The failed image was already the active version; no distinct rollback target exists." >&2
  fi
}

# Make the new image active in the configuration before pulling and starting it.
write_environment_file "$new_image"

# A pull failure must never replace the previously operational version.
if ! compose pull; then
  rollback
  exit 1
fi

# --wait blocks until Docker's health check reports that the container is healthy.
if ! compose up -d --remove-orphans --wait --wait-timeout 120; then
  rollback
  exit 1
fi

# Then verify the full public path: DNS, HTTPS, Traefik, and finally Nginx.
# Retries span about two minutes, allowing routing and the TLS certificate to
# become available after the container starts.
if ! curl --fail --silent --show-error \
  --retry 23 --retry-delay 5 --retry-all-errors \
  --connect-timeout 5 --max-time 10 \
  "$health_url" >/dev/null; then
  rollback
  exit 1
fi

# --- Retain deployment images ----------------------------------------------

# Build a deduplicated, newest-first history limited to three images.
# These entries retain the active image and two rollback candidates.
temporary_history_file="$history_file.tmp.$$"
{
  printf '%s\n' "$new_image"
  if [ -f "$history_file" ]; then
    awk -v image="$new_image" '$0 != image && NF > 0' "$history_file"
  fi
} | awk 'NR <= 3' > "$temporary_history_file"

# Remove only old images known to this environment; never run a global prune.
if [ -f "$history_file" ]; then
  while IFS= read -r old_image; do
    [ -n "$old_image" ] || continue
    if ! grep -Fqx "$old_image" "$temporary_history_file"; then
      if ! docker image rm "$old_image"; then
        echo "Keeping $old_image because Docker reports that it is still in use."
      fi
    fi
  done < "$history_file"
fi

# Atomically publish the new history only after deployment is fully validated.
mv "$temporary_history_file" "$history_file"
chmod 600 "$history_file"

echo "Deployment of $new_image to $deploy_environment succeeded."
