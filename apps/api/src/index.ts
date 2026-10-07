import "dotenv/config";
import express from "express";
import multer from "multer";
import { authRouter } from "./routes/authRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { friendRouter } from "./routes/friendRoute.js";
import { messagesRouter } from "./routes/messagesRoute.js";
import { chatRoomRouter } from "./routes/chatRoomRoute.js";
import { UPLOADS_DIR } from "./storage/fileStorage.js";
import { getUserId, verifyTokens } from "./middleware/verifyUser.js";
import {
  getChatRoomMemberPersistence,
  isChatRoomOwnerPersistence,
} from "./persistance/chatRoomPersistence.js";

import {
  handleCreateFriendChat,
  leaveFriendChat,
  handleFriendChatMessage,
  createFriendChatPayload,
  friendChatMessagePayload,
  handleChatRoomChatMessage,
  joinChatRoomSocket,
  leaveChatRoomSocket,
} from "./sockets/messages.js";

import { Server, Socket } from "socket.io";
import http from "http";
import https from "https";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
// Requests arrive through Traefik and then nginx, so the client IP (used for
// rate limiting) is two proxy hops away. Override with TRUST_PROXY if the
// proxy chain differs.
app.set("trust proxy", Number(process.env.TRUST_PROXY ?? 2));

// No CORS headers: browsers only reach the API through the app's own origin
// (nginx in production, the Vite dev server proxy in development)
app.use(express.json());
app.use("/auth", authRouter);
// Files the chat shows inline; anything else is served as a download
const INLINE_UPLOAD_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".avif",
  ".svg",
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".avi",
  ".flv",
  ".mp3",
  ".wav",
  ".m4a",
]);

// Public so <img>/<video> tags can load them; file names are random UUIDs
app.use(
  "/uploads",
  express.static(UPLOADS_DIR, {
    index: false,
    setHeaders: (res, filePath) => {
      // Uploads are served from the app's own origin, so never let an
      // uploaded HTML/SVG file run scripts there
      res.setHeader(
        "Content-Security-Policy",
        "sandbox; default-src 'none'; img-src 'self'; media-src 'self'; style-src 'unsafe-inline'"
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
      if (!INLINE_UPLOAD_EXTENSIONS.has(path.extname(filePath).toLowerCase())) {
        res.setHeader("Content-Disposition", "attachment");
      }
    },
  })
);
app.use(verifyTokens);
app.use("/user", userRouter);
app.use("/friend", friendRouter);
app.use("/messages", messagesRouter);
app.use("/chat-room", chatRoomRouter);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(413)
      .json({ error: "File is too large. Maximum size is 10MB." });
  }
  next(err);
});

// Last resort: log the error and answer with JSON instead of Express's default
// HTML page, which includes the stack trace unless NODE_ENV=production
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  // Client errors such as malformed JSON bodies (body-parser sets the status)
  const status = Number(err?.status ?? err?.statusCode);
  if (status >= 400 && status < 500) {
    return res.status(status).json({ error: "Invalid request" });
  }
  console.log(err);
  res.status(500).json({ error: "Something went wrong" });
});

// Keep serving other users if a handler rejects without catching the error
process.on("unhandledRejection", (reason) => {
  console.log("Unhandled promise rejection:", reason);
});

// const server = http.createServer(app);
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello from TypeScript + Express!");
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port} :)`);
});

// Same origin only, like the REST API (Socket.IO sends no CORS headers by default)
const io = new Server(server);

io.use(async (socket, next) => {
  // Handlers act as this user; ids and tokens in event payloads are ignored
  const userId = await getUserId(socket.handshake.auth.token);
  if (userId) {
    socket.data.userId = userId;
    return next();
  }
  return next(new Error("Authentication error"));
});

// A handler that throws (e.g. on a malformed payload) must not crash the server
function safe<T extends unknown[]>(
  event: string,
  handler: (...args: T) => Promise<void>
) {
  return async (...args: T) => {
    try {
      await handler(...args);
    } catch (error) {
      console.log(`Socket handler "${event}" failed:`, error);
    }
  };
}

type chatRoomUsers = {
  id: string;
  socketId: string;
  name: string;
  photo: string;
};

type chatRooms = {
  chatRoomId: string;
  users: chatRoomUsers[];
};

const chatRooms: chatRooms[] = [];

function findVoiceRoom(chatRoomId: unknown): chatRooms | undefined {
  return chatRooms.find((chatRoom) => chatRoom.chatRoomId === chatRoomId);
}

function isInVoiceRoom(chatRoom: chatRooms | undefined, socketId: string) {
  return !!chatRoom?.users.some((user) => user.socketId === socketId);
}

// WebRTC signaling is only relayed between sockets in the same voice room
function shareVoiceRoom(socketId: string, otherSocketId: unknown) {
  return chatRooms.some(
    (chatRoom) =>
      isInVoiceRoom(chatRoom, socketId) &&
      chatRoom.users.some((user) => user.socketId === otherSocketId)
  );
}

io.on("connection", (socket: Socket) => {
  const userId: string = socket.data.userId;

  socket.on("connect", () => {
    console.log("user connected", socket.id);
  });

  socket.on(
    "friendChatMessage",
    safe("friendChatMessage", async (payload: friendChatMessagePayload) => {
      await handleFriendChatMessage(io, socket, payload);
    })
  );

  socket.on(
    "createFriendChat",
    safe("createFriendChat", async (payload: createFriendChatPayload) => {
      await handleCreateFriendChat(socket, payload);
    })
  );

  socket.on(
    "leaveFriendChat",
    safe("leaveFriendChat", async (payload: any) => {
      await leaveFriendChat(socket, payload);
    })
  );

  socket.on(
    "chatRoomChatMessage",
    safe("chatRoomChatMessage", async (payload: any) => {
      await handleChatRoomChatMessage(io, socket, payload);
    })
  );

  socket.on(
    "joinChatRoom",
    safe("joinChatRoom", async (payload: any) => {
      await joinChatRoomSocket(socket, payload);
    })
  );

  socket.on(
    "leaveChatRoom",
    safe("leaveChatRoom", async (payload: any) => {
      await leaveChatRoomSocket(socket, payload);
    })
  );

  socket.on(
    "joinVoiceRoom",
    safe("joinVoiceRoom", async (payload: { chatRoomId: string }) => {
      const chatRoomId = payload?.chatRoomId;
      // Only members may join; name and photo come from their profile
      const member = await getChatRoomMemberPersistence({ chatRoomId, userId });
      if (!member) {
        return;
      }
      socket.join(chatRoomId + "-voice");
      console.log("joinVoiceRoom", chatRoomId, userId, member.username);
      const voiceUser = {
        id: userId,
        socketId: socket.id,
        name: member.username,
        photo: member.photo ?? "",
      };
      let chatRoom = findVoiceRoom(chatRoomId);
      if (chatRoom) {
        chatRoom.users.push(voiceUser);
      } else {
        chatRoom = { chatRoomId, users: [voiceUser] };
        chatRooms.push(chatRoom);
      }
      io.in(chatRoomId + "-voice").emit("userJoinedVoiceRoom", chatRoom.users);
    })
  );

  socket.on(
    "leaveVoiceRoom",
    safe("leaveVoiceRoom", async (payload: { chatRoomId: string }) => {
      const chatRoom = findVoiceRoom(payload?.chatRoomId);
      if (chatRoom) {
        const userIndex = chatRoom.users.findIndex(
          (user) => user.id === userId
        );
        if (userIndex > -1) {
          chatRoom.users.splice(userIndex, 1);
        }
        socket
          .to(chatRoom.chatRoomId + "-voice")
          .emit("userLeftVoiceRoom", chatRoom.users);
      }
    })
  );

  socket.on(
    "sendIceCandidate",
    safe(
      "sendIceCandidate",
      async (payload: {
        iceCandidate: any;
        chatRoomId: string;
        forUserId: string;
      }) => {
        console.log("sendIceCandidate");
        const chatRoom = findVoiceRoom(payload?.chatRoomId);
        if (!isInVoiceRoom(chatRoom, socket.id)) {
          return;
        }
        const socketId = chatRoom.users.find(
          (user) => user.id === payload.forUserId
        )?.socketId;
        if (!socketId) {
          return;
        }
        socket.to(socketId).emit("receiveIceCandidate", {
          iceCandidate: payload.iceCandidate,
          userId: userId,
        });
      }
    )
  );

  socket.on(
    "sendIceCandidateToTheOferrer",
    safe(
      "sendIceCandidateToTheOferrer",
      async (payload: {
        iceCandidate: any;
        chatRoomId: string;
        toSocketId: string;
      }) => {
        console.log("sendIceCandidateToTheOferrer");
        if (!shareVoiceRoom(socket.id, payload?.toSocketId)) {
          return;
        }
        socket.to(payload.toSocketId).emit("receiveIceCandidate", {
          iceCandidate: payload.iceCandidate,
          userId: userId,
        });
      }
    )
  );

  socket.on(
    "sendOffer",
    safe(
      "sendOffer",
      async (payload: { offer: any; chatRoomId: string; forUserId: string }) => {
        console.log("sendOffer");
        const chatRoom = findVoiceRoom(payload?.chatRoomId);
        if (!isInVoiceRoom(chatRoom, socket.id)) {
          return;
        }
        const socketId = chatRoom.users.find(
          (user) => user.id === payload.forUserId
        )?.socketId;
        if (!socketId) {
          return;
        }
        socket.to(socketId).emit("receiveOffer", {
          offer: payload.offer,
          socketId: socket.id,
          userId: userId,
        });
      }
    )
  );

  socket.on(
    "sendAnswer",
    safe("sendAnswer", async (payload: { answer: any; toSocketId: string }) => {
      console.log("sendAnswer");
      if (!shareVoiceRoom(socket.id, payload?.toSocketId)) {
        return;
      }
      socket.to(payload.toSocketId).emit("receiveAnswer", {
        answer: payload.answer,
        socketId: socket.id,
        userId: userId,
      });
    })
  );

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    chatRooms.forEach((chatRoom) => {
      const userIndex = chatRoom.users.findIndex(
        (user) => user.socketId === socket.id
      );
      if (userIndex > -1) {
        chatRoom.users.splice(userIndex, 1);
        io.in(chatRoom.chatRoomId + "-voice").emit(
          "userLeftVoiceRoom",
          chatRoom.users
        );
      }
    });
    console.log("chatRooms", chatRooms);
  });

  socket.on(
    "kickUser",
    safe("kickUser", async (payload: { chatRoomId: string; userId: string }) => {
      const chatRoomId = payload?.chatRoomId;
      const kickedUserId = payload?.userId;
      // Only the room owner can kick (the REST call removes the membership)
      if (
        typeof kickedUserId !== "string" ||
        !(await isChatRoomOwnerPersistence({ chatRoomId, userId }))
      ) {
        return;
      }
      io.in(chatRoomId).emit("userKicked", { userId: kickedUserId });

      // Stop delivering the room's messages and calls to the kicked user
      const roomSockets = await io.in(chatRoomId).fetchSockets();
      for (const roomSocket of roomSockets) {
        if (roomSocket.data.userId === kickedUserId) {
          roomSocket.leave(chatRoomId);
          roomSocket.leave(chatRoomId + "-voice");
        }
      }
      const voiceRoom = findVoiceRoom(chatRoomId);
      if (voiceRoom?.users.some((user) => user.id === kickedUserId)) {
        voiceRoom.users = voiceRoom.users.filter(
          (user) => user.id !== kickedUserId
        );
        io.in(chatRoomId + "-voice").emit("userLeftVoiceRoom", voiceRoom.users);
      }
    })
  );
});
