import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // This ensures that client-side routing works correctly in dev
    historyApiFallback: true,
  },
  build: {
    // Optional: Useful for static deployments like Netlify/Vercel
    outDir: "dist",
    emptyOutDir: true,
  },
});
