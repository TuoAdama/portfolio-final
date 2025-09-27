# Portfolio Atuo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

## Code scaffolding

Run `docker compose run --rm web ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


# Setup application environment

## Install dependencies
```bash
docker compose run --rm web npm install
```

## Launch application
```bash
docker compose run --rm web ng serve --host=0.0.0.0
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


