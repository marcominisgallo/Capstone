import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Carica le variabili di ambiente dal file `.env`
dotenv.config();

export default defineConfig({
  base: "/",
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
