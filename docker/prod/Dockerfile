FROM node:24 AS build
WORKDIR /app

COPY ../../package*.json ./

RUN npm install

COPY ../.. .

RUN npm run build --prod

# Étape 2 : Serveur Nginx
FROM nginx:alpine
# Copie les fichiers buildés (HTML, JS, CSS)
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
