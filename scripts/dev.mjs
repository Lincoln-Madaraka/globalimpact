// Starts the Next.js dev server and opens the site in the browser once it's ready.
// Run with `npm run dev`. Extra arguments are passed through, e.g. `npm run dev -- -p 4000`.
//
// The URL is read from Next's own "Local:" line, so the right page opens even
// if Next had to fall back to another port.
import { spawn } from "node:child_process";

const next = spawn("next", ["dev", ...process.argv.slice(2)], {
  stdio: ["inherit", "pipe", "inherit"],
  env: { ...process.env, FORCE_COLOR: "1" },
});

let url;
let opened = false;

next.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
  const text = chunk.toString().replace(/\x1b\[[0-9;]*m/g, "");
  url ??= text.match(/Local:\s+(http\S+)/)?.[1];
  if (!opened && url && text.includes("Ready")) {
    opened = true;
    spawn("open", [url], { stdio: "ignore" });
  }
});

next.on("exit", (code) => process.exit(code ?? 0));
