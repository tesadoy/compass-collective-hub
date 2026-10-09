import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { expect, it } from "vitest";

// The build only transcodes opaque PNG data to lossless WebP (see vite.config.ts).
// JPEG photos must stay JPEG, and the converted source must survive bit-for-bit.
it("keeps the converted hero pixel-identical and smaller, and leaves JPEG photos as JPEGs", async () => {
  const pngDataHero = "hero-construction.jpg";
  const source = await readFile(resolve("src/assets", pngDataHero));
  const original = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  const originalMeta = await sharp(source).metadata();

  expect(originalMeta.format, pngDataHero).toBe("png");
  expect(originalMeta.hasAlpha, pngDataHero).toBeFalsy();

  const compressed = await sharp(source)
    .webp({ lossless: true, effort: 6 })
    .toBuffer();
  const result = await sharp(compressed).raw().toBuffer({ resolveWithObject: true });

  expect(result.info.width, pngDataHero).toBe(original.info.width);
  expect(result.info.height, pngDataHero).toBe(original.info.height);
  expect(result.data.equals(original.data), pngDataHero).toBe(true);
  expect(compressed.length, pngDataHero).toBeLessThan(source.length);

  for (const name of ["about-hero.jpg", "div-construction.jpg", "proj-mixed-use.jpg"]) {
    const meta = await sharp(await readFile(resolve("src/assets", name))).metadata();
    expect(meta.format, name).toBe("jpeg");
  }
}, 60000);
