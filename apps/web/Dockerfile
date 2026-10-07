# Build context is the monorepo root: docker build -f apps/web/Dockerfile .
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
RUN npm ci -w apps/web --include-workspace-root=false

COPY apps/web ./apps/web
RUN npm run build -w apps/web

FROM nginx:1.27-alpine

# Lets nginx.conf.template use the container's DNS resolver
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1
COPY apps/web/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80
