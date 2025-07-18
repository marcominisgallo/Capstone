import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configurazione di Vite
export default defineConfig({
  base: "/capstone/",
  plugins: [react()],
  build: {
    outDir: "dist", // La directory di output sarà 'dist' (Netlify la cerca qui)
  },
  server: {
    port: 3000, // Porta per il server di sviluppo locale
  },
  resolve: {
    alias: {
      "@": "/src", // Alias opzionale per semplificare i percorsi
    },
  },
});
