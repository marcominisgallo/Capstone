import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.DEPLOY_TARGET === "GH_PAGES" ? "/Capstone/" : "/", // Percorso base dinamico
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": "/src", // Alias per semplificare i percorsi
    },
  },
});
