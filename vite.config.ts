import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": "/src",
      config: "/src/config",
      services: "/src/services",
      pages: "/src/pages",
      components: "/src/components",
      routes: "/src/routes",
      // hooks: "/src/hooks",
      assets: "/src/assets",
      utils: "/src/utils",
      context: "/src/context",
      modules: "/src/modules",
      store: "/src/store",
    },
  },
});
