FROM node:24

WORKDIR /app

RUN npm install -g @angular/cli

EXPOSE 4200
