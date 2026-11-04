import { readFile } from "node:fs/promises";
import { expect, it } from "vitest";

// The small uppercase tags ("What we do", "Learn more", …) use text-accent on
// light backgrounds. The token must clear WCAG AA (4.5:1) against pure white,
// the worst case they render on.
const hslToRgb = (h: number, s: number, l: number) => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  if (h < 60) return [c + m, x + m, m];
  if (h < 120) return [x + m, c + m, m];
  if (h < 180) return [m, c + m, x + m];
  if (h < 240) return [m, x + m, c + m];
  if (h < 300) return [x + m, m, c + m];
  return [c + m, m, x + m];
};

const luminance = (r: number, g: number, b: number) => {
  const lin = (v: number) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

it("keeps the light-mode accent token at AA contrast against white", async () => {
  const css = await readFile("src/index.css", "utf8");
  const match = css.match(/--accent:\s*(\d+)\s+(\d+)%\s+(\d+)%/);
  expect(match, "accent token present in :root").toBeTruthy();
  const [, h, s, l] = match!.map(Number) as unknown as number[];
  const [r, g, b] = hslToRgb(h, s / 100, l / 100);
  const ratio = (1.0 + 0.05) / (luminance(r, g, b) + 0.05);
  expect(ratio).toBeGreaterThanOrEqual(4.5);
});
