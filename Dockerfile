FROM node:22-alpine AS build

RUN apk add --no-cache git

WORKDIR /app

COPY . .

# Adiciona o token de autenticação no momento do build
ARG NPM_AUTH_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" > .npmrc

RUN npm install
RUN npm run build

FROM nginx:alpine

# Copia os arquivos do build para o nginx
COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html

# Copia configurações do nginx e templates de ambiente
COPY nginx.conf /etc/nginx/nginx.conf
COPY env.template.js /usr/share/nginx/html/assets/env.template.js
COPY env.template.js /usr/share/nginx/html/public/env/env.template.js

# Substitui as variáveis no env.js e inicia o nginx
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && \
                       envsubst < /usr/share/nginx/html/public/env/env.template.js > /usr/share/nginx/html/public/env/env.js && \
                       exec nginx -g 'daemon off;'"]

EXPOSE 80
