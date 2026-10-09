import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { expect, it } from "vitest";

it("preserves every pixel and original dimensions when compressing website photos", async () => {
  const names = [
    "hero-construction.jpg",
    "about-hero.jpg",
    "projects-hero.jpg",
    "divisions-hero.jpg",
    "div-construction.jpg",
    "proj-mixed-use.jpg",
  ];
  for (const name of names) {
    const source = await readFile(resolve("src/assets", name));
    const compressed = await sharp(source).webp({ lossless: true, effort: 6 }).toBuffer();
    const original = await sharp(source).raw().toBuffer({ resolveWithObject: true });
    const result = await sharp(compressed).raw().toBuffer({ resolveWithObject: true });
    expect(result.info.width, name).toBe(original.info.width);
    expect(result.info.height, name).toBe(original.info.height);
    expect(result.data.equals(original.data), name).toBe(true);
    expect(compressed.length, name).toBeLessThan(source.length);
  }
}, 60000);