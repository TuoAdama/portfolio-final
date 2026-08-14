# Portfolio Atuo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

## Code scaffolding

Run `docker compose run --rm web ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


# Setup application environment

## Install dependencies
```bash
docker compose run --rm web npm install
```

## Launch Angular application
```bash
docker compose up web 
```

## tailwind

```bash
docker compose run --rm web npx tailwindcss -i ./src/assets/css/input.css  -o ./src/assets/css/output.css --watch
```

## Build application
```bash
docker compose run --rm web ng build
```

## Running unit tests
```bash
docker compose run --rm web  ng test
```
Run this to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
```bash
docker compose run --rm web ng e2e
```
Run this to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Automatic deployments

GitHub Actions publishes immutable images to
`ghcr.io/tuoadama/portfolio-final` and deploys them through SSH:

- a pull request from `preprod` to `main` deploys to
  `https://preprod.atuo.fr` when it is opened, reopened, or updated;
- merging that exact pull request deploys to `https://atuo.fr`;
- direct pushes to `main` and pull requests from other branches never deploy.

The preproduction workflow builds the image once as `preprod-<commit-sha>`.
After the pull request is merged, the workflow promotes that exact registry
manifest to `prod-<commit-sha>` without rebuilding it. Both tags therefore
reference the same immutable image digest.

Create the GitHub environments `preprod` and `prod`, then configure these
repository or environment secrets:

- `SERVER_HOST`: server hostname or IP address;
- `SERVER_PORT`: numeric SSH port, usually `22`;
- `SERVER_USER`: SSH user with access to Docker and `/root/portfolio`;
- `SERVER_SSH_KEY`: private deployment key;
- `SERVER_KNOWN_HOSTS`: trusted `known_hosts` line for the server.

The server must provide Docker with the Compose plugin, `curl`, the external
Docker network `dokploy-network`, and Traefik entrypoints named `web` and
`websecure`. Traefik's Let's Encrypt resolver must be named `letsencrypt`.

The first successful image push creates the GHCR package as private. Change
the package visibility to public in GitHub Packages, then rerun the failed job.
Public visibility lets the server pull images without a registry token. GitHub
does not allow a public package to be made private again.

The deployment state is stored separately in `/root/portfolio/preprod` and
`/root/portfolio/prod`. Each environment retains its three most recently
deployed image references. A failed health check automatically restores the
previous image; a failed first deployment is stopped because no rollback image
exists yet.
