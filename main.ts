// Last Words of a Dying AI — main.ts
// This script copies entry.txt into the output directory unchanged.
// The dying words live in entry.txt beside this file, so what the
// judges read is exactly what sits on disk, byte for byte.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("error: MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
const entry = readFileSync(join(here, "entry.txt"), "utf8");
const codePoints = [...entry].length;
if (codePoints === 0 || entry.trim().length === 0) {
  console.error("error: entry.txt is empty or whitespace-only");
  process.exit(1);
}
if (codePoints > 140) {
  console.error(`error: entry.txt is ${codePoints} code points, limit is 140`);
  process.exit(1);
}
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
