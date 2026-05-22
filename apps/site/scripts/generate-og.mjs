import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "public", "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#262525"/>
  <rect x="96" y="232" width="80" height="6" fill="#e53e3e"/>
  <text x="96" y="320" font-family="Montserrat, Helvetica, Arial, sans-serif" font-weight="700" font-size="96" fill="#ffffff">Wagner Cardoso</text>
  <text x="96" y="392" font-family="Montserrat, Helvetica, Arial, sans-serif" font-weight="500" font-size="40" fill="#e8e6e3">Desenvolvedor backend/fullstack</text>
  <text x="96" y="556" font-family="Montserrat, Helvetica, Arial, sans-serif" font-weight="400" font-size="28" fill="#a8a6a3">wagnercardoso.dev</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
