# Dev container mode
FROM node:24-alpine AS dev
RUN apk add nginx git envsubst
EXPOSE 80
ENV BACKEND_PROTO=https
ENV BACKEND_HOST=shimmie.shishnet.org
ENV WEB_ROOT=/workspaces/shimmie2fev/dist
ENV WEB_CONF=/etc/nginx/http.d/default.conf

# Build stage
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM nginx:alpine
EXPOSE 80
ENV BACKEND_PROTO=https
ENV BACKEND_HOST=shimmie.shishnet.org
ENV WEB_ROOT=/usr/share/nginx/html
ENV WEB_CONF=/etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.sh custom-nginx.template /tmp/
ENTRYPOINT [ "/bin/sh", "/tmp/nginx.sh"]
