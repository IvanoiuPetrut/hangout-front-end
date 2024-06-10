<script setup lang="ts">
import moment from "moment";
import { Marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import "highlight.js/styles/atom-one-dark.css";

const props = defineProps<{
  fromWho: "me" | "friend";
  message: string;
  photoUrl: string;
  senderName: string;
  createdAt: string;
}>();

const emit = defineEmits<{
  (e: "toggleSelectedFriend"): void;
}>();

function formatDate(isoString: string): string {
  return moment(isoString).format("DD/MM/YYYY HH:mm");
}

function isFileFromServer(message: string): boolean {
  return message.startsWith("https://images-hangout-app.s3.eu-central-1.amazonaws.com/");
}

function isPhoto(message: string): boolean {
  return (
    message.endsWith(".jpg") ||
    message.endsWith(".png") ||
    message.endsWith(".jpeg") ||
    message.endsWith(".gif") ||
    message.endsWith(".webp") ||
    message.endsWith(".svg")
  );
}

function isNormalUrl(message: string): boolean {
  return message.startsWith("http");
}

function getFileNameFromUrl(url: string): string {
  return url.split("/").pop()!;
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    }
  })
);

function formatMessage(message: string): string {
  const html = marked.parse(message);
  console.log(html);
  return DOMPurify.sanitize(html);
}
</script>

<template>
  <div class="flex gap-4">
    <div class="chat-image avatar self-start hidden sm:block">
      <div class="w-10 rounded-full">
        <img v-if="photoUrl" alt="Profile photo" :src="props.photoUrl" />
        <img
          v-else
          alt="Profile photo"
          src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01afdasda02?d=identicon"
        />
      </div>
    </div>
    <div>
      <div>
        <button
          @click="emit('toggleSelectedFriend')"
          class="font-bold mr-4 hover:underline hover:text-primary"
        >
          {{ senderName }}
        </button>
        <span class="text-xs opacity-70">{{ formatDate(props.createdAt) }}</span>
      </div>
      <a
        v-if="isPhoto(message) && isFileFromServer(message)"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="message" alt="File from server" class="w-full h-full" />
      </a>
      <a
        v-else-if="isFileFromServer(message)"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 bg-neutral p-1 md:p-4 rounded-lg mt-2 border border-primary hover:border-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <span class="flex-1 break-words">
          {{ getFileNameFromUrl(message) }}
        </span>
      </a>
      <a
        v-else-if="isNormalUrl(message)"
        class="link"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        >{{ message }}</a
      >
      <div v-else v-html="formatMessage(message)" class="text-base markdown-wrapper"></div>
    </div>
  </div>
</template>

<style>
.markdown-wrapper ol li {
  list-style-type: decimal;
  margin-left: 1rem;
}

.markdown-wrapper ul li {
  list-style-type: disc;
  margin-left: 1rem;
}

.markdown-wrapper h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.markdown-wrapper h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.markdown-wrapper h3 {
  font-size: 1.125rem;
  font-weight: 600;
}

.markdown-wrapper h4 {
  font-size: 1rem;
  font-weight: 600;
}

.markdown-wrapper h5 {
  font-size: 0.875rem;
  font-weight: 600;
}

.markdown-wrapper h6 {
  font-size: 0.75rem;
  font-weight: 600;
}

.markdown-wrapper p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.markdown-wrapper blockquote {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid oklch(var(--p));
  background-color: oklch(var(--p) / 0.05);
  border-radius: 0 0.5rem 0.5rem 0;
}

.markdown-wrapper pre {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: var(--color-neutral);
  border-radius: 0.5rem;
}

.markdown-wrapper code {
  border-radius: 0.5rem;
}
</style>
