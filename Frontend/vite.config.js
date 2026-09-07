import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever Vite sees a request starting with '/api'
      "/api": {
        target: "http://localhost:8080", // Forward it to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
