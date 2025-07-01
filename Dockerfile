# --- Estágio 1: Build do Angular ---
# Usando node:18-alpine, uma versão LTS estável para maior compatibilidade
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Declara um "build argument" para o token do NPM.
# Este valor deve ser configurado como um Build Argument no painel do Dokploy.
ARG NPM_AUTH_TOKEN

# Debug
RUN echo "NPM_AUTH_TOKEN: ${NPM_AUTH_TOKEN}"

# Copia apenas os arquivos de definição de pacotes
COPY package*.json ./

# Cria o arquivo .npmrc dinamicamente usando o token passado como argumento.
# A sintaxe ${NPM_AUTH_TOKEN} garante que o valor do ARG seja usado.
RUN echo "@tivic-team:registry=https://npm.pkg.github.com/" > .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}" >> .npmrc

# Limpa o cache do npm e instala as dependências
# O RUN a seguir falhará se NPM_AUTH_TOKEN não for passado durante o build, o que é bom.
RUN npm install

# Remove o arquivo .npmrc para não deixar o token na imagem final
RUN rm .npmrc

# Copia todo o restante do código-fonte da aplicação
COPY . .

# Executa o script de build do Angular para produção
RUN npm run build

# --- Estágio 2: Servidor de Produção (Nginx) ---
# Inicia um novo estágio com uma imagem leve do Nginx
FROM nginx:alpine

# Remove o arquivo de configuração padrão do Nginx
#RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html
# Copia o arquivo de configuração customizado do Nginx para o local correto
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
# Copia os arquivos da build do Angular do estágio anterior para o diretório do Nginx
#COPY --from=build /app/dist/angular-base/browser /usr/share/nginx/html

# Copia os arquivos de ambiente, se necessário
COPY env.js /usr/share/nginx/html/assets/env.js
COPY env.js /usr/share/nginx/html/public/env/env.js

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando padrão do Nginx para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]
