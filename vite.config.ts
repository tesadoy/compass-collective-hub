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
      // Mark each page's hero preload so the static-page generator can keep only the
      // matching image in each entry document instead of downloading every page hero.
      name: "preload-public-page-heroes",
      apply: "build",
      transformIndexHtml(_html: string, ctx: IndexHtmlTransformContext) {
        const files = Object.values(ctx.bundle ?? {}).map((file) => file.fileName);
        const base = process.env.VITE_BASE_PATH ?? "/";
        const heroes = [
          { path: "/", stem: "hero-construction", responsive: true },
          { path: "/about", stem: "about-hero" },
          { path: "/careers", stem: "careers-hero" },
          { path: "/divisions", stem: "divisions-hero" },
          { path: "/projects", stem: "projects-hero" },
          { path: "/contact", stem: "contact-hero" },
        ];

        return heroes.flatMap(({ path, stem, responsive }) => {
          const heroFiles = files.filter((name) => name.includes(stem) && name.endsWith(".webp"));
          const mobile = responsive ? heroFiles.find((name) => name.includes("-mobile")) : undefined;
          const desktop = responsive
            ? heroFiles.find((name) => !name.includes("-mobile"))
            : heroFiles[0];
          const hero = desktop ?? mobile;
          if (!hero) return [];

          const attrs: Record<string, string> = {
            rel: "preload",
            as: "image",
            href: base + hero,
            fetchpriority: "high",
            "data-page-hero": path,
          };
          if (mobile && desktop) {
            attrs.imagesrcset = `${base}${mobile} 768w, ${base}${desktop} 1376w`;
            attrs.imagesizes = "100vw";
          }
          return [{ tag: "link", attrs, injectTo: "head-prepend" as const }];
        });
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
