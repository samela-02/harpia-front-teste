# --- Estágio 1: Build do Angular ---
FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Argumento para o token, que será passado pelo Jenkins
ARG NPM_AUTH_TOKEN

# O Jenkins irá criar este arquivo .npmrc ANTES de rodar o 'docker build'
# Ou você pode criá-lo aqui de forma segura:
COPY .npmrc .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}" >> .npmrc

# Copia os arquivos de dependência PRIMEIRO para otimizar o cache
COPY package*.json ./
RUN npm install

# Remove o .npmrc antes de copiar o resto do código
RUN rm .npmrc

# Copia TODO o código da aplicação (que o Jenkins já baixou)
COPY . .

# O Jenkins já terá gerado o arquivo environment.development.ts
# então o COPY acima já o inclui.

# Executa o build de produção
RUN npm run build

# --- Estágio 2: Servidor de Produção (Nginx) ---
FROM nginx:alpine

# Remove a configuração padrão e copia a sua
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia apenas os artefatos de build do estágio anterior
COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html

# O env.js será gerado pelo Jenkins e copiado para a pasta correta
# antes do build, então este COPY funciona.
COPY env.js /usr/share/nginx/html/assets/env.js
COPY env.js /usr/share/nginx/html/public/env/env.js

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
