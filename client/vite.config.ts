import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "@svgr/rollup";

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
      "@store": path.resolve("./src/store"),
      "@pages": path.resolve("./src/pages"),
      "@api": path.resolve("./src/api"),
      "@styles": path.resolve("./src/styles"),
      "@mocks": path.resolve("./src/mocks"),
      "@interfaces": path.resolve("./src/interfaces"),
      "@utils": path.resolve("./src/utils"),
      "@hooks": path.resolve("./src/hooks"),
      "@sockets": path.resolve("./src/sockets"),
    },
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    }
  }
});
