import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // GitHub Pages vs Firebase Hosting
  base: mode === "firebase" ? "/" : "/portfoliosb/",

  build: {
    assetsDir: "assets",
  },
}));
