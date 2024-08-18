import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dm": "https://portal.docs24.store/",
    },
  },
  // server: {
  //   proxy: {
  //     "/dm": {
  //       target: "https://portal.docs24.store/dm/",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/dm/, ""),
  //     },
  //   },
  // },
});
