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

const connectedUsers = ref<Array<ConnectedUser>>([]);
const isUserInVoiceChannel = ref(false);
const localStream = ref<MediaStream>();
const remoteStream = ref<MediaStream>();
const socketStore = useSocketStore();
const peerConnection = ref<RTCPeerConnection>();

async function fetchUserMedia(): Promise<MediaStream> {
  console.log("Fetching user media");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  return stream;
}

async function createPeerConnection(offerObj: any = null) {
  console.log("Creating peer connection");
  const peerConnection = new RTCPeerConnection(PEER_CONFIGURATION);
  remoteStream.value = new MediaStream();

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
    console.log("ICE candidate fround", event);
    if (event.candidate) {
      console.log("Sending ICE candidate");
      socketStore.socket.emit("send-ice-candidate", {
        iceCandidate: event.candidate
      });
    }
  });

  peerConnection.addEventListener("track", (event) => {
    console.log("Track received from other person", event);
    remoteStream.value!.addTrack(event.track);
  });

  if (offerObj) {
    console.log("Setting remote description");
    await peerConnection.setRemoteDescription(offerObj.offer);
  }

  return peerConnection;
}

async function createCall() {
  console.log("Creating call");
  localStream.value = await fetchUserMedia();
  try {
    const peerConnection = await createPeerConnection();
    const offer = await peerConnection.createOffer({});
    await peerConnection.setLocalDescription(offer);
    socketStore.socket.emit("send-offer", {
      offer: offer
    });
  } catch (error) {
    console.log(error);
  }
}

async function answerCall(offerObj: any) {
  console.log("Answering call");
  localStream.value = await fetchUserMedia();
  try {
    peerConnection.value = await createPeerConnection(offerObj);
    const answer = await peerConnection.value.createAnswer({});
    await peerConnection.value.setLocalDescription(answer);
    offerObj.answer = answer;

    //We get the ice candidates from the server and add them to the peer connection so that the connection can be established
    const offerIceCandidates = await socketStore.socket.emitWithAck("send-new-answer", offerObj);
    offerIceCandidates.forEach((iceCandidate: RTCIceCandidate) => {
      peerConnection.value!.addIceCandidate(iceCandidate);
    });
  } catch (error) {
    console.log(error);
  }
  // peerConnections.value.push(peerConnection);
}

async function addAnswer(offerObj: any) {
  //this function is called when the other person answers the call
  await peerConnection.value!.setRemoteDescription(offerObj.answer); //We set the remote description of the offer
}

async function addNewIceCandidate(iceCandidate: RTCIceCandidate) {
  //this function is called when the other person sends a new ice candidate
  await peerConnection.value!.addIceCandidate(iceCandidate);
}

// * ------------ SOCKETS

//on connection get all available offers and call createOfferEls
const availableOffers = ref<Array<any>>([]); // -> this array needs to be rendered as a list of buttons on the UI
socketStore.socket.on("available-offers", (offers) => {
  console.log(offers);
  for (const offer of offers) {
    availableOffers.value.push(offer);
  }
});

socketStore.socket.on("new-offer-awaiting", (offers) => {
  for (const offer of offers) {
    availableOffers.value.push(offer);
  }
});

socketStore.socket.on("answer-response", (offerObj) => {
  console.log(offerObj);
  addAnswer(offerObj);
});

socketStore.socket.on("received-ice-candidate-from-server", (iceCandidate) => {
  addNewIceCandidate(iceCandidate);
  console.log(iceCandidate);
});
// * ------------ SOCKETS end

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
  }
}

socketStore.socket.on("userLeftVoiceRoom", (data) => {
  connectedUsers.value = data;
  connectedUsers.value = connectedUsers.value.filter((user) => {
    return user.name !== useUserStore().userName;
  });
  connectedUsers.value.forEach((user) => {
    user.mediaStream = null;
  });
});

// ! First step is to join the voice room
socketStore.socket.on("userJoinedVoiceRoom", (data) => {
  connectedUsers.value = data;
  connectedUsers.value = connectedUsers.value.filter((user) => {
    return user.name !== useUserStore().userName;
  });
  connectedUsers.value.forEach((user) => {
    user.mediaStream = null;
  });

  // add mediastream null to the connected users
  // connectedUsers.value.forEach((user) => {
  //   user.mediaStream = null;
  // });
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
  // peerConnection.value?.close();
  // peerConnection.value = null;
  // remoteStream.value = null;
}

onMounted(() => {
  // createCall();
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

    <!-- <button @click="createCall" class="btn mb-4">call</button>
    <button @click="answerCall" class="btn">answer</button> -->
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
