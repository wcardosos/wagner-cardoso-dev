import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";
import { readdir, readFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Posts live in the shared content package (packages/content/posts) since
// Task 003 migrated them out of apps/blog/src/content/posts. Resolved
// relative to this script's own file, mirroring the care taken in
// packages/content/src/collection.ts's `postsDir` (see Task 000 notes),
// so this keeps working regardless of the consuming app's cwd.
const postsDir = resolve(__dirname, "..", "..", "..", "packages", "content", "posts");
const ogDir = resolve(__dirname, "..", "public", "og");
const defaultPath = resolve(__dirname, "..", "public", "og-default.png");

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_CHARS_PER_LINE = 26;
const MAX_LINES = 3;
const LINE_HEIGHT = 74;

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Quebra de linha simples por contagem de caracteres, sem cortar palavras.
function wrapTitle(title) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > MAX_CHARS_PER_LINE && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  if (lines.length > MAX_LINES) {
    const kept = lines.slice(0, MAX_LINES);
    kept[MAX_LINES - 1] = `${kept[MAX_LINES - 1].replace(/…$/, "")}…`;
    return kept;
  }
  return lines;
}

function buildSvg(title) {
  const lines = wrapTitle(title);
  const titleStartY = HEIGHT / 2 - ((lines.length - 1) * LINE_HEIGHT) / 2 + 20;
  const tspans = lines
    .map((line, i) => {
      const dy = i === 0 ? 0 : LINE_HEIGHT;
      return `<tspan x="140" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#262525"/>
  <rect x="96" y="205" width="8" height="220" fill="#e53e3e"/>
  <text font-family="Montserrat, Helvetica, Arial, sans-serif" font-weight="700" font-size="60" fill="#fafaf9" y="${titleStartY}">${tspans}</text>
  <text x="140" y="556" font-family="Montserrat, Helvetica, Arial, sans-serif" font-weight="400" font-size="28" fill="#8b8989">blog.wagnercardoso.dev</text>
</svg>`;
}

async function renderToPng(title, outPath) {
  await sharp(Buffer.from(buildSvg(title))).png().toFile(outPath);
  console.log(`Wrote ${outPath}`);
}

// Parser inline mínimo do bloco de frontmatter `---`.
function parseFrontmatterTitle(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const titleLine = match[1]
    .split(/\r?\n/)
    .find((line) => /^title\s*:/.test(line));
  if (!titleLine) return null;
  return titleLine
    .replace(/^title\s*:\s*/, "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

await mkdir(ogDir, { recursive: true });

const files = (await readdir(postsDir)).filter((f) => /\.(md|mdx)$/.test(f));

for (const file of files) {
  const raw = await readFile(resolve(postsDir, file), "utf-8");
  const title = parseFrontmatterTitle(raw);
  if (!title) {
    console.warn(`Skipping ${file}: no title in frontmatter`);
    continue;
  }
  const slug = basename(file).replace(/\.(md|mdx)$/, "");
  await renderToPng(title, resolve(ogDir, `${slug}.png`));
}

await renderToPng("Blog · Wagner Cardoso", defaultPath);
