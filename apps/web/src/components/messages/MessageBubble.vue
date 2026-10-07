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
  return moment(isoString).calendar(null, {
    sameDay: "[Today] HH:mm",
    lastDay: "[Yesterday] HH:mm",
    lastWeek: "ddd HH:mm",
    sameElse: "DD MMM YYYY, HH:mm"
  });
}

function isFileFromServer(message: string): boolean {
  return message.startsWith("/uploads/");
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

function isVideo(message: string): boolean {
  return (
    message.endsWith(".mp4") ||
    message.endsWith(".webm") ||
    message.endsWith(".ogg") ||
    message.endsWith(".mov") ||
    message.endsWith(".avi") ||
    message.endsWith(".flv")
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
  return DOMPurify.sanitize(html as string);
}
</script>

<template>
  <div
    class="flex animate-fade-up items-end gap-2.5"
    :class="{ 'flex-row-reverse': fromWho === 'me' }"
  >
    <button
      v-if="fromWho === 'friend'"
      @click="emit('toggleSelectedFriend')"
      class="avatar hidden shrink-0 sm:block"
      :aria-label="`Open ${senderName}'s profile`"
    >
      <div class="w-8 rounded-full ring-1 ring-base-content/10">
        <img v-if="photoUrl" alt="Profile photo" :src="props.photoUrl" />
        <img
          v-else
          alt="Profile photo"
          src="https://www.gravatar.com/avatar/3b3be63a4c2asdas01afdasda02?d=identicon"
        />
      </div>
    </button>
    <div
      class="flex min-w-0 max-w-[85%] flex-col gap-1 sm:max-w-[70%]"
      :class="fromWho === 'me' ? 'items-end' : 'items-start'"
    >
      <div class="flex items-baseline gap-2 px-1 text-xs">
        <button
          v-if="fromWho === 'friend'"
          @click="emit('toggleSelectedFriend')"
          class="font-semibold text-base-content/80 transition-colors hover:text-primary"
        >
          {{ senderName }}
        </button>
        <span class="text-base-content/40">{{ formatDate(props.createdAt) }}</span>
      </div>
      <a
        v-if="isPhoto(message) && isFileFromServer(message)"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        class="block overflow-hidden rounded-2xl ring-1 ring-base-content/10 transition-opacity hover:opacity-90"
      >
        <img :src="message" alt="File from server" class="max-h-80 w-auto object-cover" />
      </a>
      <video
        v-else-if="isVideo(message) && isFileFromServer(message)"
        :src="message"
        controls
        class="max-h-80 rounded-2xl ring-1 ring-base-content/10"
      ></video>
      <a
        v-else-if="isFileFromServer(message)"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 rounded-2xl bg-base-200 p-3 pr-4 ring-1 ring-base-content/10 transition-all hover:ring-primary/50"
      >
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </span>
        <span class="min-w-0 flex-1 break-words text-sm font-medium">
          {{ getFileNameFromUrl(message) }}
        </span>
      </a>
      <a
        v-else-if="isNormalUrl(message)"
        class="link break-all"
        :class="fromWho === 'me' ? 'bubble-me' : 'bubble-friend'"
        :href="message"
        target="_blank"
        rel="noopener noreferrer"
        >{{ message }}</a
      >
      <div
        v-else
        v-html="formatMessage(message)"
        class="markdown-wrapper min-w-0 max-w-full break-words"
        :class="fromWho === 'me' ? 'bubble-me' : 'bubble-friend'"
      ></div>
    </div>
  </div>
</template>

<style>
.bubble-me,
.bubble-friend {
  display: block;
  padding: 0.55rem 0.95rem;
  border-radius: 1.15rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.bubble-me {
  background: linear-gradient(135deg, oklch(var(--p)), oklch(var(--p) / 0.85));
  color: oklch(var(--pc));
  border-bottom-right-radius: 0.35rem;
  box-shadow: 0 4px 14px -6px oklch(var(--p) / 0.6);
}

.bubble-friend {
  background-color: oklch(var(--b2));
  border-bottom-left-radius: 0.35rem;
  box-shadow: inset 0 0 0 1px oklch(var(--bc) / 0.06);
}

.markdown-wrapper > :first-child {
  margin-top: 0;
}

.markdown-wrapper > :last-child {
  margin-bottom: 0;
}

.markdown-wrapper a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

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

.bubble-me blockquote {
  border-left-color: currentColor;
  background-color: rgb(255 255 255 / 0.1);
}

.markdown-wrapper pre {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background-color: #1e2030;
  color: #e4e6f0;
  border-radius: 0.75rem;
  overflow-x: auto;
  font-size: 0.85rem;
}

.markdown-wrapper pre code.hljs {
  padding: 0;
  background: transparent;
}

.markdown-wrapper code {
  border-radius: 0.375rem;
  white-space: pre-wrap;
}

.markdown-wrapper :not(pre) > code {
  padding: 0.1rem 0.35rem;
  background-color: oklch(var(--bc) / 0.1);
  font-size: 0.85em;
}

.bubble-me :not(pre) > code {
  background-color: rgb(255 255 255 / 0.15);
}
</style>
