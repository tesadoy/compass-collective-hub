import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set VITE_BASE_PATH=/<repo-name>/ when deploying to a GitHub Pages project site.
  base: process.env.VITE_BASE_PATH ?? "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    imagetools({
      // Only opaque PNG sources are transcoded; JPEGs and transparent logos stay untouched.
      // Inspect the actual format because the home hero has a .jpg name but PNG data.
      defaultDirectives: async (_url, metadata) => {
        const source = await metadata();
        return source.format === "png" && !source.hasAlpha
          ? new URLSearchParams({ format: "webp", lossless: "true", effort: "6" })
          : new URLSearchParams();
      },
    }),
    react(),
    {
      // Preload the homepage hero so mobile browsers fetch it before the JS bundle runs.
      name: "preload-home-hero",
      apply: "build",
      transformIndexHtml(_html, ctx) {
        const hero = Object.values(ctx.bundle ?? {}).find((f) => f.fileName.includes("hero-construction"));
        if (!hero) return [];
        return [{ tag: "link", attrs: { rel: "preload", as: "image", href: (process.env.VITE_BASE_PATH ?? "/") + hero.fileName, fetchpriority: "high" }, injectTo: "head" }];
      },
    },
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
