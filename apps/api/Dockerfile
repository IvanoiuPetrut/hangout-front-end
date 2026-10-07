# Build context is the monorepo root: docker build -f apps/api/Dockerfile .
FROM node:24-alpine

# Prisma's engines need OpenSSL, which the alpine base image doesn't ship.
# su-exec lets the entrypoint drop from root to the "node" user.
RUN apk add --no-cache openssl su-exec

WORKDIR /app

# Install only the api workspace's dependencies using the root lockfile
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
RUN npm ci -w apps/api --include-workspace-root=false

COPY apps/api ./apps/api

WORKDIR /app/apps/api

RUN npx prisma generate

RUN npm run build

# Set after the build so npm ci above still installs the dev dependencies
ENV NODE_ENV=production

# Writable locations for the unprivileged user; the code itself stays root-owned
RUN mkdir -p /data uploads && chown node:node /data uploads

COPY apps/api/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]
# Apply pending database migrations, then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && exec node dist/index.js"]
