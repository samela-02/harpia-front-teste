# --- Estágio 1: Build do Angular ---
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Build arg para token do NPM
ARG NPM_AUTH_TOKEN

# Criar arquivo .npmrc com token
RUN echo "@tivic-team:registry=https://npm.pkg.github.com/" > .npmrc && \
    echo "//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}" >> .npmrc

# Copia arquivos de definição
COPY package*.json ./
RUN npm install

# Remove o .npmrc por segurança
RUN rm .npmrc

# Copia todo o projeto (inclusive o environment gerado via Jenkins)
COPY . .

# Build de produção
RUN npm run build

# --- Estágio 2: Servidor de Produção (Nginx) ---
FROM nginx:alpine

# Remove conf padrão e adiciona personalizada
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia a build Angular para o Nginx
COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html

# Copia arquivo de ambiente dinâmico JS, se houver
COPY env.js /usr/share/nginx/html/assets/env.js
COPY env.js /usr/share/nginx/html/public/env/env.js

# Porta padrão
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
