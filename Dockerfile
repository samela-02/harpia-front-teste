FROM node:22-alpine AS build

RUN apk add --no-cache git

WORKDIR /app

COPY . .

COPY environment.development.ts ./src/environments/
COPY .npmrc .npmrc

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY env.js /usr/share/nginx/html/assets/env.js
COPY env.js /usr/share/nginx/html/public/env/env.js

EXPOSE 80
