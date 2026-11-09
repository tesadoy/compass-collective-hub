import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const siteUrl = "https://tesadoy.com";

export const publicPages = [
  {
    path: "/",
    title: "TESADOY DYNAMICS — Multi-Sector Contracting Group",
    description:
      "Integrated consulting, procurement, logistics, construction, interiors, technology, private equity and agriculture — delivered with institutional discipline.",
  },
  {
    path: "/about",
    title: "About TESADOY DYNAMICS",
    description:
      "An integrated contracting group built on institutional rigor, long-horizon partnerships and integrated delivery across eight disciplines.",
  },
  {
    path: "/divisions",
    title: "Our Divisions | TESADOY DYNAMICS",
    description:
      "Eight operating divisions: consulting, procurement, logistics, construction, interiors, tech, private equity and agriculture.",
  },
  {
    path: "/projects",
    title: "Selected Projects | TESADOY DYNAMICS",
    description:
      "A selection of TESADOY DYNAMICS projects across construction, interiors, logistics, agriculture and private equity.",
  },
  {
    path: "/contact",
    title: "Contact TESADOY DYNAMICS",
    description:
      "Get in touch to scope a project, request a proposal or partner with our team across consulting, procurement, logistics, construction, interiors, technology, private equity and agriculture.",
  },
  {
    path: "/careers",
    title: "Careers | TESADOY DYNAMICS",
    description:
      "Build a career at TESADOY DYNAMICS. Open roles across consulting, procurement, logistics, construction, design, technology, private equity and agriculture.",
  },
  {
    path: "/legal/privacy",
    title: "Privacy Policy | TESADOY DYNAMICS",
    description:
      "How TESADOY DYNAMICS collects, uses and protects your personal information.",
  },
  {
    path: "/legal/terms",
    title: "Terms of Service | TESADOY DYNAMICS",
    description:
      "Terms governing the use of the TESADOY DYNAMICS website and client portal.",
  },
];

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const setMeta = (html, attribute, value) => {
  const escapedValue = escapeHtml(value);
  const tagPattern = new RegExp(`<meta\\s+${attribute}="[^"]*"\\s*\\/?\\s*>`, "i");
  if (!tagPattern.test(html)) throw new Error(`Missing expected metadata tag: ${attribute}`);
  return html.replace(tagPattern, `<meta ${attribute}="${escapedValue}" />`);
};

export const renderPage = (template, page) => {
  const canonicalUrl = `${siteUrl}${page.path === "/" ? "/" : page.path}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'name="description" content', page.description);
  html = setMeta(html, 'property="og:title" content', page.title);
  html = setMeta(html, 'property="og:description" content', page.description);
  html = setMeta(html, 'property="og:url" content', canonicalUrl);
  html = setMeta(html, 'name="twitter:title" content', page.title);
  html = setMeta(html, 'name="twitter:description" content', page.description);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  return html;
};

export const generateStaticPages = async (outputDir) => {
  let template = await readFile(join(outputDir, "index.html"), "utf8");
  const heroPreloads = new Map();
  template = template.replace(/<link\b[^>]*\bdata-page-hero="([^"]+)"[^>]*>/gi, (tag, pagePath) => {
    heroPreloads.set(pagePath, tag.replace(/\s+data-page-hero="[^"]*"/i, ""));
    return "";
  });

  for (const page of publicPages) {
    const outputPath = page.path === "/" ? "index.html" : join(page.path.slice(1), "index.html");
    const filePath = join(outputDir, outputPath);
    await mkdir(dirname(filePath), { recursive: true });
    const preload = heroPreloads.get(page.path);
    const pageTemplate = preload
      ? template.replace(/<head\b[^>]*>/i, (head) => `${head}\n    ${preload}`)
      : template;
    await writeFile(filePath, renderPage(pageTemplate, page));
  }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateStaticPages(process.argv[2] ?? "dist");
}