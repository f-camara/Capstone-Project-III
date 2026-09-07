import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Vitest configuration for the React frontend. jsdom lets us render
// components in a DOM-like environment during tests.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
  },
});