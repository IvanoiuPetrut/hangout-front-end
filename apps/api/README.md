<a href="#">
    <img src="https://i.postimg.cc/Bv6Cnp9z/group.png" alt="Weather app logo" align="right" height="60" />
</a>

# Hangout

Hangout is web app that allows you to communicate with other persons, either thorough a direct message chat or by using an audio video channel, leveraging peer to peer connection. It also supports messages with media conent, markdown and code.

<a href="../web">Front-end</a>

<a href="https://www.youtube.com/watch?v=HNb0TTiL960">Hangout Demo</a>

<p align="center">
  <img src="https://i.postimg.cc/Y0rTqW3C/image-mare.png" alt="Photo of the presentation of the project"/>
  <img src="https://i.postimg.cc/xTFBnqb9/imageaudiovideo.png" alt="Photo of the presentation of the project"/>
</p>

## Features

- Login and register with username and password
- Change user name and photo
- Add/Remove friends
- Chat with friends by using:
    - Plain text
    - Media files
    - Code snipets
- Create chat rooms
- Manage chat rooms
- Comunicate with other users through an audio video channel
    - Connection is done peer to peer by using WebRTC protocol

## Technologies

- Express
- Web Sockets
- WebRTC
- TypeScript
- Prisma
- Molter

## Build process

See the [root README](../../README.md) for setup. From the repository root:

- `npm run dev:api` (to run the app with rebuild on change)
- `npm run build -w apps/api` (for production)
