import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const apiTarget = process.env.API_PROXY_TARGET || "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Mirrors the nginx routes used in production (see nginx.conf.template)
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/socket.io": {
        target: apiTarget,
        ws: true
      },
      "/uploads": apiTarget
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@helpers": fileURLToPath(new URL("./src/helpers", import.meta.url)),
      "@stores": fileURLToPath(new URL("./src/stores", import.meta.url))
    }
  }
});
