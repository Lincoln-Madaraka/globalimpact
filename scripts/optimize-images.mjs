// Turns the raw photos in /photos into web-ready assets. Run with `npm run images`
// whenever a photo is added or replaced.
//
// - Photos are mapped by purpose (not by original filename) to public/images/<name>.webp.
// - Portraits become 4:5 crops in public/images/people/<slug>.webp.
// - NASA Earth textures become public/textures/*.webp for the spinning globe, and
//   public/images/earth-poster.webp is rendered with the same shading as the live globe.
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "photos");
const webDir = join(root, "public/images");
const peopleDir = join(root, "public/images/people");
const textureDir = join(root, "public/textures");
const brandDir = join(root, "public/brand");
const ogDir = join(root, "src/assets/og");
const appDir = join(root, "src/app");

const PHOTOS = {
  "Appointment Setter.jpeg": "consultation", // two professionals reviewing documents at a desk
  "Boost Team Productivity with the Perfect Coffee Machine #Teamwork #C.jpeg": "boardroom", // aerial view of a team around a table
  "Business owner working on their strategy _ Free Photo.jpeg": "strategy", // strategy mapping with sticky notes on glass
  "_ (10).jpeg": "handshake", // aerial handshake
  "_ (9).jpeg": "partnership", // handshake across a low table, white background
  "desk-globe.jpeg": "desk-globe", // warm desk globe, Asia and the Indian Ocean
  "hands-on-globe.jpeg": "hands", // many hands resting together on a globe
  "earth-nasa-apollo17-public-domain.jpg": "earth", // "The Blue Marble", NASA / Apollo 17 (public domain); social previews only
  // From GIA's own website (confirm reuse with GIA):
  "gia/bonfire.jpg": "bonfire", // fire on the rocks by a lake at dusk
  "gia/retreat-group.jpg": "kogi-elders", // two Kogi elders at a retreat
  "gia/outdoor-gathering.jpg": "gathering", // elders in white on coastal rocks
  "gia/forest.jpg": "fire-circle", // people seated around a fire in a tent
  "gia/womens-circle.jpg": "womens-circle", // women seated in a circle in a thatched hall
  "gia/elder.jpg": "elder", // Indigenous leader in a feather headdress
  "gia/salon.jpg": "salon", // a Wisdom Salon at the Co-Creation Loft
  // From the Wisdom Age Foundation's website (confirm reuse):
  "gia/rita.jpg": "rita", // Rita, Huni Kuin, Aibu Dayá women's association
  "gia/amazon.png": "woven-hands", // hands joined over woven Huni Kuin textiles
  "gia/fertiliser.png": "rice-farmers", // farmers planting rice in Java
};

// Photos can be published up to this width (never enlarged beyond the original).
const WIDTHS = { earth: 1400 };
const DEFAULT_WIDTH = 1600;
// Photos on a black background (space) are trimmed so the subject fills the frame.
const TRIM_BLACK = new Set(["earth"]);
// Keep only this top fraction of a photo, e.g. to cut off a phone app's carousel dots.
const CROP_BOTTOM = { "woven-hands": 0.9 };

const PEOPLE = ["dana", "erik", "camilla", "diego", "zaenab", "tomas", "satish", "peter", "flora", "pascal", "tamas", "andrea", "martina"];

await Promise.all([webDir, peopleDir, textureDir, brandDir, ogDir].map((d) => mkdir(d, { recursive: true })));

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
  let source = TRIM_BLACK.has(name) ? await trimToSubject(input) : input;
  if (CROP_BOTTOM[name]) {
    const { width, height } = await sharp(source).metadata();
    source = await sharp(source).extract({ left: 0, top: 0, width, height: Math.round(height * CROP_BOTTOM[name]) }).toBuffer();
  }
  const web = await sharp(source)
    .resize({ width: WIDTHS[name] ?? DEFAULT_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(webDir, `${name}.webp`));
  dims[name] = { width: web.width, height: web.height };
  // Smaller copy for phones, picked by src/lib/image-loader.ts.
  await sharp(source).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(webDir, `${name}-640.webp`));
  // Right-hand photo panel of the social preview images.
  await sharp(source).resize(440, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82 }).toFile(join(ogDir, `${name}.jpg`));
  console.log(`✓ ${name.padEnd(14)} ${web.width}x${web.height}`);
}
await writeFile(join(root, "src/config/photo-dimensions.json"), JSON.stringify(dims, null, 2) + "\n");

for (const slug of PEOPLE) {
  await sharp(join(src, "gia", `${slug}.jpg`))
    .resize(640, 800, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 80 })
    .toFile(join(peopleDir, `${slug}.webp`));
}
console.log(`✓ ${PEOPLE.length} portraits`);

// ---------- Spinning Earth: textures + poster ----------
const globe = JSON.parse(await readFile(join(root, "src/config/globe.json"), "utf8"));
const dayFile = join(src, "nasa/earth-day-5400.jpg");
const cloudFile = join(src, "nasa/earth-clouds-2048.jpg");

for (const [size, suffix] of [[2048, "2k"], [4096, "4k"]]) {
  await sharp(dayFile).resize(size, size / 2, { kernel: "lanczos3" }).webp({ quality: 80, effort: 6 }).toFile(join(textureDir, `earth-day-${suffix}.webp`));
}
for (const [size, suffix] of [[1024, "1k"], [2048, "2k"]]) {
  await sharp(cloudFile).resize(size, size / 2).greyscale().webp({ quality: 60 }).toFile(join(textureDir, `earth-clouds-${suffix}.webp`));
}
console.log("✓ earth textures");

/**
 * Renders frame 0 of the live globe (see src/components/earth/createEarth.ts).
 * Keep the maths in sync with the fragment shader there.
 */
async function renderGlobePoster(size) {
  const day = await sharp(dayFile).resize(2700, 1350).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const cloud = await sharp(cloudFile).greyscale().raw().toBuffer({ resolveWithObject: true });
  const toLinear = new Float32Array(256).map((_, i) => {
    const c = i / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const toSrgb = (c) => {
    const v = c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  };
  const sample = (img, channels, u, v, linear) => {
    const { width, height } = img.info;
    const x = (((u % 1) + 1) % 1) * width - 0.5;
    const y = Math.max(0, Math.min(height - 1, v * height - 0.5));
    const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
    const out = [0, 0, 0];
    for (const [dx, dy, w] of [[0, 0, (1 - fx) * (1 - fy)], [1, 0, fx * (1 - fy)], [0, 1, (1 - fx) * fy], [1, 1, fx * fy]]) {
      const px = (((x0 + dx) % width) + width) % width;
      const py = Math.min(height - 1, y0 + dy);
      const i = (py * width + px) * channels;
      for (let c = 0; c < Math.min(channels, 3); c++) out[c] += w * (linear ? toLinear[img.data[i + c]] : img.data[i + c] / 255);
    }
    return out;
  };
  const rad = Math.PI / 180;
  const spin = -(globe.startLongitude + 90) * rad;
  const [ax, vt] = [globe.axialTilt * rad, globe.viewTilt * rad];
  const sunLen = Math.hypot(...globe.sun);
  const sun = globe.sun.map((c) => c / sunLen);
  const smooth = (e0, e1, x) => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };
  const S = size * 2; // 2x supersampling
  const out = Buffer.alloc(S * S * 4);
  for (let py = 0; py < S; py++) {
    for (let px = 0; px < S; px++) {
      const x = ((2 * (px + 0.5)) / S - 1) / globe.radius;
      const y = (1 - (2 * (py + 0.5)) / S) / globe.radius;
      const r2 = x * x + y * y;
      if (r2 >= 1) continue;
      const z = Math.sqrt(1 - r2);
      // p = Ry(-spin) · Rz(-axialTilt) · Rx(-viewTilt) · n
      let [a, b, c] = [x, y * Math.cos(-vt) - z * Math.sin(-vt), y * Math.sin(-vt) + z * Math.cos(-vt)];
      [a, b] = [a * Math.cos(-ax) - b * Math.sin(-ax), a * Math.sin(-ax) + b * Math.cos(-ax)];
      [a, c] = [a * Math.cos(-spin) + c * Math.sin(-spin), -a * Math.sin(-spin) + c * Math.cos(-spin)];
      const u = Math.atan2(c, -a) / (2 * Math.PI);
      const v = Math.acos(Math.max(-1, Math.min(1, b))) / Math.PI;
      const ground = sample(day, 3, u, v, true);
      const cl = smooth(0.08, 0.9, sample(cloud, 1, u, v, false)[0]) * globe.cloudOpacity;
      const ndl = x * sun[0] + y * sun[1] + z * sun[2];
      const lit = smooth(-0.12, 0.3, ndl) * (0.35 + 0.75 * Math.max(ndl, 0));
      const limb = (1 - z) ** 4 * globe.hazeStrength;
      const i = (py * S + px) * 4;
      for (let k = 0; k < 3; k++) {
        const albedo = ground[k] * (1 - cl) + 0.92 * cl;
        out[i + k] = toSrgb(albedo * lit * (1 - limb) + globe.haze[k] * lit * limb);
      }
      out[i + 3] = 255;
    }
  }
  await sharp(out, { raw: { width: S, height: S, channels: 4 } })
    .resize(size, size, { kernel: "lanczos3" })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(join(webDir, "earth-poster.webp"));
}
await renderGlobePoster(globe.posterSize);
console.log("✓ earth poster");

// ---------- Logo ----------
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
