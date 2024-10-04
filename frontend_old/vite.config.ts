import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        root: resolve(__dirname, "pages/nested/index.html"),
        register: resolve(__dirname, "pages/register/index.html"),
        login: resolve(__dirname, "pages/login/index.html"),
      },
    },
  },
});
