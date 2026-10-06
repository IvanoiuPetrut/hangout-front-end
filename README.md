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

- `npm install` – install dependencies for all apps
- `npm run dev` – run front-end and back-end together
- `npm run dev:web` / `npm run dev:api` – run a single app
- `npm run build` – build all apps
- `npm test` – run front-end unit tests

Each app reads its own `.env` file (`apps/web/.env`, `apps/api/.env`).

The back-end Docker image is built from the repository root:

```
docker build -f apps/api/Dockerfile .
```
