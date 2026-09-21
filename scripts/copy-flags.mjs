// Copies the flags of African countries from flag-icons (MIT) into public/flags/.
// Run with `npm run flags` after changing src/config/africa-countries.ts.
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "node_modules/flag-icons/flags/4x3");
const target = join(root, "public/flags");
const config = await readFile(join(root, "src/config/africa-countries.ts"), "utf8");
const codes = [...new Set([...config.matchAll(/code: "([a-z]{2})"/g)].map((m) => m[1]))];

await mkdir(target, { recursive: true });
await Promise.all(codes.map((code) => copyFile(join(source, `${code}.svg`), join(target, `${code}.svg`))));
console.log(`✓ ${codes.length} flags copied to public/flags`);
