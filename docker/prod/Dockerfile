FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build -- --configuration=production

# Étape 2 : Serveur Nginx pour héberger l'app
FROM nginx:alpine

# Copier le build Angular dans Nginx
COPY --from=build /app/dist/portfolio/browser/ /usr/share/nginx/html

# Copier la config Nginx personnalisée
COPY nginx/conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
