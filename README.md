<a href="#">
    <img src="https://i.postimg.cc/Bv6Cnp9z/group.png" alt="Hangout logo" align="right" height="60" />
</a>

# Hangout

Hangout is web app that allows you to communicate with other persons, either thorough a direct message chat or by using an audio video channel, leveraging peer to peer connection. It also supports messages with media conent, markdown and code.

<a href="https://www.youtube.com/watch?v=HNb0TTiL960">Hangout Demo</a>

## Repository layout

This is an npm workspaces monorepo:

- [`apps/web`](apps/web) – front-end (Vue 3, TypeScript, Pinia, Tailwind + DaisyUI)
- [`apps/api`](apps/api) – back-end (Express, Socket.IO, Prisma)

## Development

1. `npm install` – install dependencies for all apps
2. `cp apps/api/.env.example apps/api/.env` and fill in `JWT_SECRET`
3. `cd apps/api && npx prisma migrate deploy` – create the SQLite database
4. `npm run dev` – run front-end (http://localhost:5173) and back-end together

Other scripts:

- `npm run dev:web` / `npm run dev:api` – run a single app
- `npm run build` – build all apps
- `npm test` – run front-end unit tests

The front-end talks to the API through relative paths (`/api`, `/socket.io`, `/uploads`). In development Vite proxies them to `http://localhost:3000` (override with `API_PROXY_TARGET`); in production nginx does.

## Deployment

Everything runs with Docker Compose: nginx serves the front-end and proxies to the API, and the SQLite database plus uploaded files live in the `api-data` volume.

```
cp .env.example .env   # fill in JWT_SECRET
docker compose up -d --build
```

Database migrations run automatically when the API container starts.

## Accounts and uploads

- Users register and log in with a username and password. Passwords are hashed with scrypt and the API issues a JWT valid for 7 days.
- Uploaded files are stored on disk (`UPLOADS_DIR`). Once the folder reaches 3 GB (`UPLOADS_MAX_BYTES`), further uploads are rejected. Single files are limited to 10 MB.
