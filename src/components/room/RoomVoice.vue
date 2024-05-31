<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import RoomVoiceActions from "@/components/room/room_voice/RoomVoiceActions.vue";
import RoomVoiceConnectedUsers from "@/components/room/room_voice/RoomVoiceConnectedUsers.vue";
import { useUserStore } from "@/stores/user";
import LocalStream from "@/components/room/room_voice/LocalStream.vue";
import RemoteStream from "@/components/room/room_voice/RemoteStream.vue";
import { useSocketStore } from "@/stores/socket";
import type { ConnectedUser } from "@/types/types";

const props = defineProps<{
  roomId: string;
}>();

const PEER_CONFIGURATION = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"]
    }
  ]
};

const isUserInVoiceChannel = ref(false);
const localStream = ref<MediaStream>();
const connectedUsers = ref<Array<ConnectedUser>>([]);
const socketStore = useSocketStore();

async function fetchUserMedia(): Promise<MediaStream> {
  console.log("Fetching user media");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  return stream;
}

async function answerAndCreatePeerConnection(
  offerObj: any,
  toSocketId: string
): Promise<{ peerConnection: RTCPeerConnection; remoteStream: MediaStream }> {
  const peerConnection = new RTCPeerConnection(PEER_CONFIGURATION);
  const remoteStream = new MediaStream();

  if (localStream.value) {
    localStream.value.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream.value!);
    });
  }

  peerConnection.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      console.log("Sending ICE candidate");
      setTimeout(() => {
        socketStore.socket.emit("sendIceCandidateToTheOferrer", {
          iceCandidate: event.candidate,
          chatRoomId: props.roomId,
          toSocketId: toSocketId
        });
      }, 5000);
    }
  });

  peerConnection.addEventListener("track", (event) => {
    console.log("Track received from other person", event);
    remoteStream.addTrack(event.track);
  });

  if (offerObj) {
    console.log("Setting remote description");
    await peerConnection.setRemoteDescription(offerObj);
  }

  return { peerConnection, remoteStream };
}

async function createPeerConnection(
  userId: string,
  offerObj: any = null
): Promise<{ peerConnection: RTCPeerConnection; remoteStream: MediaStream }> {
  console.log("Creating peer connection");
  const peerConnection = new RTCPeerConnection(PEER_CONFIGURATION);
  const remoteStream = new MediaStream();

  if (localStream.value) {
    localStream.value.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream.value!);
    });
  }

  peerConnection.addEventListener("signalingstatechange", (event) => {
    console.log(event);
    console.log(peerConnection.signalingState);
  });

  peerConnection.addEventListener("icecandidate", (event) => {
    console.log("ICE candidate found", event);
    if (event.candidate) {
      console.log("Sending ICE candidate");
      setTimeout(() => {
        socketStore.socket.emit("sendIceCandidate", {
          iceCandidate: event.candidate,
          chatRoomId: props.roomId,
          forUserId: userId
        });
      }, 5000);
    }
  });

  peerConnection.addEventListener("track", (event) => {
    console.log("Track received from other person", event);
    remoteStream.addTrack(event.track);
  });

  if (offerObj) {
    console.log("Setting remote description");
    await peerConnection.setRemoteDescription(offerObj);
  }

  return { peerConnection, remoteStream };
}

socketStore.socket.on("receiveOffer", async (payload) => {
  console.log("Received offer", payload);
  const { peerConnection, remoteStream } = await answerAndCreatePeerConnection(
    payload.offer,
    payload.socketId
  );
  const answer = await peerConnection.createAnswer({});
  await peerConnection.setLocalDescription(answer);
  connectedUsers.value.forEach((user) => {
    if (user.id === payload.userId) {
      user.peerConnection = peerConnection;
      user.mediaStream = remoteStream;
    }
  });
  socketStore.socket.emit("sendAnswer", {
    answer: answer,
    chatRoomId: props.roomId,
    toSocketId: payload.socketId
  });
});

socketStore.socket.on("receiveAnswer", async (payload) => {
  connectedUsers.value.forEach((user) => {
    if (user.id === payload.userId) {
      if (user.peerConnection) {
        user.peerConnection.setRemoteDescription(payload.answer);
      }
    }
  });
});

socketStore.socket.on("receiveIceCandidate", async (payload) => {
  console.log("Received ice candidate", payload);
  const iceCandidate = new RTCIceCandidate(payload.iceCandidate);
  connectedUsers.value.forEach((user) => {
    if (user.id === payload.userId) {
      if (user.peerConnection) {
        user.peerConnection.addIceCandidate(iceCandidate);
      }
    }
  });
});

async function joinVoiceChannel() {
  isUserInVoiceChannel.value = true;
  socketStore.socket.emit("joinVoiceRoom", {
    chatRoomId: props.roomId,
    userName: useUserStore().userName,
    userPhoto: useUserStore().photo
  });
  try {
    localStream.value = await fetchUserMedia();
  } catch (error) {
    console.log(error);
  } finally {
    try {
      if (connectedUsers.value.length > 0) {
        for (const user of connectedUsers.value) {
          const { peerConnection, remoteStream } = await createPeerConnection(user.id);
          const offer = await peerConnection.createOffer({});
          await peerConnection.setLocalDescription(offer);
          socketStore.socket.emit("sendOffer", {
            offer: offer,
            chatRoomId: props.roomId,
            forUserId: user.id
          });
          user.peerConnection = peerConnection;
          user.mediaStream = remoteStream;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

socketStore.socket.on("userLeftVoiceRoom", (data) => {
  for (const newUser of data) {
    let haveFoundUser = false;
    for (const currentUser of connectedUsers.value) {
      if (newUser.id === currentUser.id) {
        haveFoundUser = true;
        break;
      }
    }
    if (!haveFoundUser) {
      connectedUsers.value.push(newUser);
    }
  }

  for (const currentUser of connectedUsers.value) {
    let haveFoundUser = false;
    for (const newUser of data) {
      if (newUser.id === currentUser.id) {
        haveFoundUser = true;
        break;
      }
    }
    if (!haveFoundUser) {
      connectedUsers.value = connectedUsers.value.filter((user) => {
        return user.id !== currentUser.id;
      });
    }
  }
  connectedUsers.value = connectedUsers.value.filter((user) => {
    return user.name !== useUserStore().userName;
  });

  connectedUsers.value = connectedUsers.value.filter((user) => {
    return user.id !== null;
  });
});

socketStore.socket.on("userJoinedVoiceRoom", (data) => {
  for (const newUser of data) {
    let haveFoundUser = false;
    for (const currentUser of connectedUsers.value) {
      if (newUser.id === currentUser.id) {
        haveFoundUser = true;
        break;
      }
    }
    if (!haveFoundUser) {
      connectedUsers.value.push(newUser);
    }
  }

  for (const currentUser of connectedUsers.value) {
    let haveFoundUser = false;
    for (const newUser of data) {
      if (newUser.id === currentUser.id) {
        haveFoundUser = true;
        break;
      }
    }
    if (!haveFoundUser) {
      connectedUsers.value = connectedUsers.value.filter((user) => {
        return user.id !== currentUser.id;
      });
    }
  }
  connectedUsers.value = connectedUsers.value.filter((user) => {
    return user.name !== useUserStore().userName;
  });

  connectedUsers.value = connectedUsers.value.filter((user) => {
    return user.id !== null;
  });
});

function handleToggleAudio(value: boolean) {
  console.log("Toggling audio", value);
}

function handleToggleCamera(value: boolean) {
  if (localStream.value) {
    localStream.value.getVideoTracks().forEach((track) => {
      track.enabled = !value;
    });
  }
}

function handleToggleMic(value: boolean) {
  if (localStream.value) {
    localStream.value.getAudioTracks().forEach((track) => {
      track.enabled = !value;
    });
  }
}

function handleEndCall() {
  isUserInVoiceChannel.value = false;
  localStream.value?.getTracks().forEach((track) => {
    track.stop();
  });
  socketStore.socket.emit("leaveVoiceRoom", {
    chatRoomId: props.roomId
  });
}

onMounted(async () => {
  console.log(connectedUsers.value.length);
});

onUnmounted(() => {
  handleEndCall();
});
</script>

<template>
  <div v-if="!isUserInVoiceChannel" class="w-full h-full flex items-center justify-center">
    <button @click="joinVoiceChannel" class="btn btn-wide btn-primary">Join voice channel</button>
  </div>
  <div v-else class="w-full h-full flex flex-col max-w-3xl mx-auto pt-2">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
      <LocalStream :local-stream="localStream" />
      <RemoteStream
        v-for="user in connectedUsers"
        :key="user.id"
        :local-stream="user.mediaStream"
        :user-name="user.name"
        :photo="user.photo"
      />
    </div>
    {{ connectedUsers }}

    <div class="mt-auto">
      <RoomVoiceConnectedUsers />
      <RoomVoiceActions
        @toggleAudio="handleToggleAudio"
        @toggleCamera="handleToggleCamera"
        @toggleMic="handleToggleMic"
        @end-call="handleEndCall"
      />
    </div>
  </div>
</template>
