FROM node:22-alpine AS build

RUN apk add --no-cache git

WORKDIR /app

COPY . .

COPY .npmrc .npmrc

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY env.template.js /usr/share/nginx/html/assets/env.template.js

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
