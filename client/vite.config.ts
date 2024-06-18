import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/override.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@assets": path.resolve("./src/assets"),
      "@components": path.resolve("./src/components"),
      "@state": path.resolve("./src/state"),
      "@pages": path.resolve("./src/pages"),
      "@api": path.resolve("./src/api"),
      "@styles": path.resolve("./src/styles"),
      "@mocks": path.resolve("./src/mocks"),
    },
  },
});
