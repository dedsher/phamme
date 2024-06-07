import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@assets": path.resolve("./src/assets"),
      "@components": path.resolve("./src/components"),
      "@state": path.resolve("./src/state"),
      "@modules": path.resolve("./src/modules"),
      "@pages": path.resolve("./src/pages"),
      "@api": path.resolve("./src/api"),
    },
  },
});
