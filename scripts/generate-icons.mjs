/** Gera PNGs do icon.svg para PWA (requer: npm install sharp --no-save) */
import { readFileSync } from "fs";
import sharp from "sharp";

const svg = readFileSync("icon.svg");
const sizes = [
  ["icon-512.png", 512],
  ["icon-192.png", 192],
  ["apple-touch-icon.png", 180],
  ["favicon-32.png", 32],
  ["favicon-16.png", 16],
];

for (const [file, size] of sizes) {
  await sharp(svg).resize(size, size).png().toFile(file);
  console.log(`✓ ${file}`);
}
