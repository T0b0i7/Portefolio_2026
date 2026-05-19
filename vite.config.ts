import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-dom") || id.includes("react-router-dom") || id.includes("/react/")) {
            return "react-vendor";
          }

          if (id.includes("@tanstack")) {
            return "data-vendor";
          }

          if (id.includes("@radix-ui")) {
            return "radix-vendor";
          }

          if (id.includes("lucide-react")) {
            return "icons-vendor";
          }

          if (id.includes("recharts") || id.includes("dayjs") || id.includes("date-fns")) {
            return "charts-vendor";
          }

          if (id.includes("framer-motion")) {
            return "animation-vendor";
          }

          if (id.includes("supabase")) {
            return "supabase-vendor";
          }
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
