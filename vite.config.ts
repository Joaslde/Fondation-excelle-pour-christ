import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Suppression des plugins Replit qui causaient des erreurs de dépendance

export default defineConfig({
  plugins: [
    react(),
    // Suppression de :
    // runtimeErrorOverlay(),
    // ... (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined ? [...] : []),
    // Ces lignes utilisaient les dépendances Replit non trouvées sur Render.
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});