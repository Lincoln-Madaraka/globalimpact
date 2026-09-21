// Turns the raw photos in /photos into web-ready assets.
// Run with `npm run images` whenever a photo in /photos is added or replaced.
//
// Photos are mapped by what they show, not by their original filename,
// so the site can refer to them by purpose (e.g. "compliance", "contact").
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "photos");
const webDir = join(root, "public/images");
const brandDir = join(root, "public/brand");
const ogDir = join(root, "src/assets/og");
const appDir = join(root, "src/app");

const PHOTOS = {
  "Appointment Setter.jpeg": "consultation", // two professionals reviewing documents at a desk
  "Boost Team Productivity with the Perfect Coffee Machine #Teamwork #C.jpeg": "boardroom", // aerial view of a team around a table
  "Business owner working on their strategy _ Free Photo.jpeg": "strategy", // strategy mapping with sticky notes on glass
  "Career Development_ Complete Guide to Growing Your Professional Skills » Oxford College.jpeg": "community", // health, education, skills & career doodles
  "Cozy modern office design, a Photo by Beautiful things.jpeg": "office", // warm red-orange office interior
  "The Power of Side Hustle Stacking_ From 9–5 to 5 Streams of Income.jpeg": "contact", // envelopes and map pins
  "_ (10).jpeg": "handshake", // aerial handshake
  "_ (9).jpeg": "partnership", // handshake across a meeting table, white background
  "wallpaper.jpeg": "compliance", // holographic checklist held in an open hand
  "earth-nasa-apollo17-public-domain.jpg": "earth", // "The Blue Marble", NASA / Apollo 17 (public domain), Africa at the centre
};

// Larger source photos can be published wider than the default.
const WIDTHS = { earth: 1400 };
// Photos on a black background (space) are trimmed so the subject fills the frame.
const TRIM_BLACK = new Set(["earth"]);

await Promise.all([webDir, brandDir, ogDir].map((d) => mkdir(d, { recursive: true })));

/** Removes the black background, then crops a little further so the subject fills the frame edge to edge. */
async function trimToSubject(input) {
  const trimmed = await sharp(input).trim({ background: "#000000", threshold: 40 }).toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const side = Math.round(Math.min(width, height) * 0.93);
  return sharp(trimmed.data)
    .extract({ left: Math.round((width - side) / 2), top: Math.round((height - side) / 2), width: side, height: side })
    .toBuffer();
}

const dims = {};
for (const [file, name] of Object.entries(PHOTOS)) {
  const input = join(src, file);
  const source = TRIM_BLACK.has(name) ? await trimToSubject(input) : input;
  const web = await sharp(source)
    .resize({ width: WIDTHS[name] ?? 736, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(webDir, `${name}.webp`));
  dims[name] = { width: web.width, height: web.height };
  // Square crop used inside the circular frame of the social preview images.
  await sharp(source).resize(520, 520, { fit: "cover", position: "attention" }).jpeg({ quality: 82 }).toFile(join(ogDir, `${name}.jpg`));
  console.log(`✓ ${name.padEnd(12)} ${web.width}x${web.height}`);
}

await writeFile(join(root, "src/config/photo-dimensions.json"), JSON.stringify(dims, null, 2) + "\n");

// Logo: trim the white margin, then pad to a centred square.
const logo = sharp(join(src, "GI-Logo.jpeg")).trim({ threshold: 12 });
const trimmed = await logo.toBuffer({ resolveWithObject: true });
const side = Math.max(trimmed.info.width, trimmed.info.height);
const square = await sharp(trimmed.data)
  .extend({
    top: Math.floor((side - trimmed.info.height) / 2),
    bottom: Math.ceil((side - trimmed.info.height) / 2),
    left: Math.floor((side - trimmed.info.width) / 2),
    right: Math.ceil((side - trimmed.info.width) / 2),
    background: "#ffffff",
  })
  .toBuffer();
const padded = (size, pad) =>
  sharp(square)
    .resize(size - pad * 2, size - pad * 2)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" });

await padded(256, 0).webp({ quality: 90 }).toFile(join(brandDir, "logo-mark.webp"));
await padded(512, 40).png({ palette: true }).toFile(join(brandDir, "logo-512.png"));
await padded(512, 40).png({ palette: true }).toFile(join(appDir, "icon.png"));
await padded(180, 18).png({ palette: true }).toFile(join(appDir, "apple-icon.png"));
await padded(160, 0).png({ palette: true }).toFile(join(ogDir, "logo.png"));
console.log("✓ logo, icons");
