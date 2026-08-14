#!/bin/sh

set -eu

# Le workflow doit fournir exactement les cinq paramètres nécessaires au déploiement.
if [ "$#" -ne 5 ]; then
  echo "Usage: $0 <environment> <deployment-directory> <image> <domain> <health-url>" >&2
  exit 64
fi

deploy_environment=$1
deployment_directory=$2
new_image=$3
domain=$4
health_url=$5

# Restreint les valeurs acceptées afin d'éviter de déployer dans un environnement inattendu.
case "$deploy_environment" in
  preprod|prod) ;;
  *)
    echo "Unsupported deployment environment: $deploy_environment" >&2
    exit 64
    ;;
esac

# Accepte uniquement les images immuables publiées par ce projet pour l'environnement ciblé.
case "$new_image" in
  ghcr.io/tuoadama/portfolio-final:"$deploy_environment"-*) ;;
  *)
    echo "Unexpected image reference: $new_image" >&2
    exit 64
    ;;
esac

# Empêche qu'une erreur de configuration redirige le healthcheck vers un autre domaine.
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

# Le fichier Compose est copié sur le serveur par GitHub Actions avant l'appel du script.
if [ ! -f "$compose_file" ]; then
  echo "Compose file not found: $compose_file" >&2
  exit 66
fi

mkdir -p "$deployment_directory"
cd "$deployment_directory"

previous_image=""
# L'image actuellement déclarée sert de cible au rollback si le nouveau déploiement échoue.
if [ -f "$environment_file" ]; then
  previous_image=$(sed -n 's/^PORTFOLIO_IMAGE=//p' "$environment_file" | head -n 1)
fi

# Écrit le fichier .env de manière atomique pour que Compose ne lise jamais un fichier partiel.
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

# Centralise l'appel à Compose avec le bon fichier d'environnement et le bon projet.
compose() {
  docker compose --env-file "$environment_file" -f "$compose_file" "$@"
}

# Restaure l'image précédente, ou arrête le premier déploiement lorsqu'aucun rollback n'existe.
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

# Rend la nouvelle image active dans la configuration avant son téléchargement et son démarrage.
write_environment_file "$new_image"

# Un échec de téléchargement ne doit jamais remplacer la version précédemment opérationnelle.
if ! compose pull; then
  rollback
  exit 1
fi

# --wait bloque jusqu'à ce que le healthcheck Docker déclare le conteneur sain.
if ! compose up -d --remove-orphans --wait --wait-timeout 120; then
  rollback
  exit 1
fi

# Vérifie ensuite le chemin public complet : DNS, HTTPS, Traefik puis Nginx.
if ! curl --fail --silent --show-error \
  --retry 23 --retry-delay 5 --retry-all-errors \
  --connect-timeout 5 --max-time 10 \
  "$health_url" >/dev/null; then
  rollback
  exit 1
fi

# Construit un historique sans doublons, du plus récent au plus ancien, limité à trois images.
temporary_history_file="$history_file.tmp.$$"
{
  printf '%s\n' "$new_image"
  if [ -f "$history_file" ]; then
    awk -v image="$new_image" '$0 != image && NF > 0' "$history_file"
  fi
} | awk 'NR <= 3' > "$temporary_history_file"

# Supprime uniquement les anciennes images connues de cet environnement, sans prune global.
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

# Publie atomiquement le nouvel historique seulement après un déploiement entièrement validé.
mv "$temporary_history_file" "$history_file"
chmod 600 "$history_file"

echo "Deployment of $new_image to $deploy_environment succeeded."
