import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Imposta dinamicamente il base path
const isGitHubPages = process.env.DEPLOY_TARGET === "GH_PAGES";

export default defineConfig({
  base: isGitHubPages ? "/capstone/" : "/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
