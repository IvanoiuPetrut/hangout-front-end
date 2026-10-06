# Build context is the monorepo root: docker build -f apps/api/Dockerfile .
FROM node:18-alpine

# Prisma's engines need OpenSSL, which the alpine base image doesn't ship
RUN apk add --no-cache openssl

WORKDIR /app

# Install only the api workspace's dependencies using the root lockfile
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
RUN npm ci -w apps/api --include-workspace-root=false

COPY apps/api ./apps/api

WORKDIR /app/apps/api

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Apply pending database migrations, then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && exec node dist/index.js"]
