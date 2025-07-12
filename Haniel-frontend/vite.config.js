import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configurazione di Vite
export default defineConfig({
  plugins: [react()], // Plugin per supportare React
  build: {
    outDir: "dist", // Specifica la directory di output per il build
  },
  server: {
    port: 3000, // Porta per il server di sviluppo (puoi cambiarla se necessario)
  },
  resolve: {
    alias: {
      "@": "/src", // Alias per semplificare i percorsi (opzionale)
    },
  },
});
