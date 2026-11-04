import { defineConfig, type IndexHtmlTransformContext, type Plugin } from "vite";
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
      // Uses imagesrcset so phones preload the 768w variant and desktops the 1376w one.
      name: "preload-home-hero",
      apply: "build",
      transformIndexHtml(_html: string, ctx: IndexHtmlTransformContext) {
        const heroFiles = Object.values(ctx.bundle ?? {})
          .map((f) => f.fileName)
          .filter((n) => n.includes("hero-construction") && n.endsWith(".webp"));
        const mobile = heroFiles.find((n) => n.includes("-mobile"));
        const desktop = heroFiles.find((n) => !n.includes("-mobile"));
        const hero = desktop ?? mobile;
        if (!hero) return [];
        const base = process.env.VITE_BASE_PATH ?? "/";
        const attrs: Record<string, string> = {
          rel: "preload",
          as: "image",
          href: base + hero,
          fetchpriority: "high",
        };
        if (mobile && desktop) {
          attrs.imagesrcset = `${base}${mobile} 768w, ${base}${desktop} 1376w`;
          attrs.imagesizes = "100vw";
        }
        return [{ tag: "link", attrs, injectTo: "head" as const }];
      },
    } satisfies Plugin,
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
