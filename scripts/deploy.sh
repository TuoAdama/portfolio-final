#!/bin/sh

set -eu

if [ "$#" -ne 5 ]; then
  echo "Usage: $0 <environment> <deployment-directory> <image> <domain> <health-url>" >&2
  exit 64
fi

deploy_environment=$1
deployment_directory=$2
new_image=$3
domain=$4
health_url=$5

case "$deploy_environment" in
  preprod|prod) ;;
  *)
    echo "Unsupported deployment environment: $deploy_environment" >&2
    exit 64
    ;;
esac

case "$new_image" in
  ghcr.io/tuoadama/portfolio-final:"$deploy_environment"-*) ;;
  *)
    echo "Unexpected image reference: $new_image" >&2
    exit 64
    ;;
esac

case "$domain" in
  atuo.fr|preprod.atuo.fr) ;;
  *)
    echo "Unexpected deployment domain: $domain" >&2
    exit 64
    ;;
esac

compose_file="$deployment_directory/docker-compose.yml"
environment_file="$deployment_directory/.env"
history_file="$deployment_directory/.deployed-images"

if [ ! -f "$compose_file" ]; then
  echo "Compose file not found: $compose_file" >&2
  exit 66
fi

mkdir -p "$deployment_directory"
cd "$deployment_directory"

previous_image=""
if [ -f "$environment_file" ]; then
  previous_image=$(sed -n 's/^PORTFOLIO_IMAGE=//p' "$environment_file" | head -n 1)
fi

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

compose() {
  docker compose --env-file "$environment_file" -f "$compose_file" "$@"
}

rollback() {
  echo "Deployment failed; restoring the previous image." >&2

  if [ -n "$previous_image" ] && [ "$previous_image" != "$new_image" ]; then
    write_environment_file "$previous_image"
    compose pull
    compose up -d --remove-orphans --wait --wait-timeout 120
    echo "Rollback completed with $previous_image." >&2
  elif [ -z "$previous_image" ]; then
    compose down --remove-orphans || true
    echo "No previous image was available; the failed first deployment was stopped." >&2
  else
    echo "The failed image was already the active version; no distinct rollback target exists." >&2
  fi
}

write_environment_file "$new_image"

if ! compose pull; then
  rollback
  exit 1
fi

if ! compose up -d --remove-orphans --wait --wait-timeout 120; then
  rollback
  exit 1
fi

if ! curl --fail --silent --show-error \
  --retry 23 --retry-delay 5 --retry-all-errors \
  --connect-timeout 5 --max-time 10 \
  "$health_url" >/dev/null; then
  rollback
  exit 1
fi

temporary_history_file="$history_file.tmp.$$"
{
  printf '%s\n' "$new_image"
  if [ -f "$history_file" ]; then
    awk -v image="$new_image" '$0 != image && NF > 0' "$history_file"
  fi
} | awk 'NR <= 3' > "$temporary_history_file"

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

mv "$temporary_history_file" "$history_file"
chmod 600 "$history_file"

echo "Deployment of $new_image to $deploy_environment succeeded."
