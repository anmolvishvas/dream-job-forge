import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015", // Lower target means less transpilation work
    minify: false, // Avoid minification to save memory
    cssCodeSplit: false, // Reduce output complexity
    sourcemap: false, // Don't generate source maps
  },
});
