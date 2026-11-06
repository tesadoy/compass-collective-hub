import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, it } from "vitest";
import { generateStaticPages, publicPages } from "../../scripts/generate-static-pages.mjs";

const tempDirs: string[] = [];

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

it("generates static HTML for every public page with page-specific metadata and canonical URLs", async () => {
  const outputDir = await mkdtemp(join(tmpdir(), "tesadoy-static-pages-"));
  tempDirs.push(outputDir);

  const template = `<!doctype html><html><head>
    <title>Template</title>
    <meta name="description" content="Template description" />
    <link rel="canonical" href="https://tesadoy.com/" />
    <meta property="og:title" content="Template" />
    <meta property="og:description" content="Template description" />
    <meta property="og:url" content="https://tesadoy.com/" />
    <meta name="twitter:title" content="Template" />
    <meta name="twitter:description" content="Template description" />
  </head><body><div id="root"></div></body></html>`;

  await writeFile(join(outputDir, "index.html"), template);
  await generateStaticPages(outputDir);

  for (const page of publicPages) {
    const file = page.path === "/" ? "index.html" : join(page.path.slice(1), "index.html");
    const html = await readFile(join(outputDir, file), "utf8");
    const canonical = page.path === "/" ? "https://tesadoy.com/" : `https://tesadoy.com${page.path}`;
    expect(html).toContain(`<title>${page.title}</title>`);
    expect(html).toContain(`name="description" content="${page.description}"`);
    expect(html).toContain(`property="og:url" content="${canonical}"`);
    expect(html).toContain(`rel="canonical" href="${canonical}"`);
    expect(html).toContain('<div id="root"></div>');
  }
});