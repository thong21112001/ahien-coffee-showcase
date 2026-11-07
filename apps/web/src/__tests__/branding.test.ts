import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function getWebDir(): string {
  const cwd = process.cwd();
  if (cwd.endsWith("apps\\web") || cwd.endsWith("apps/web")) {
    return cwd;
  }
  return path.resolve(cwd, "apps/web");
}

test("Branding: SVG logo assets exist and have authentic A Hiền Coffee elements", () => {
  const webDir = getWebDir();
  const logoPath = path.resolve(webDir, "public/brand/ahien-logo.svg");
  const markPath = path.resolve(webDir, "public/brand/ahien-mark.svg");

  assert.ok(fs.existsSync(logoPath), `ahien-logo.svg must exist at ${logoPath}`);
  assert.ok(fs.existsSync(markPath), `ahien-mark.svg must exist at ${markPath}`);

  const logoContent = fs.readFileSync(logoPath, "utf-8");
  assert.match(logoContent, /A HIỀN COFFEE/, "Logo must contain brand name A HIỀN COFFEE");
  assert.match(logoContent, /SINCE 1986/, "Logo must contain SINCE 1986");
  assert.match(logoContent, /ĐÀ NẴNG/, "Logo must contain origin ĐÀ NẴNG");
});

test("Branding: Default Next.js SVGs have been removed from public directory", () => {
  const webDir = getWebDir();
  const publicDir = path.resolve(webDir, "public");
  const nextSvg = path.join(publicDir, "next.svg");
  const vercelSvg = path.join(publicDir, "vercel.svg");
  const globeSvg = path.join(publicDir, "globe.svg");

  assert.strictEqual(fs.existsSync(nextSvg), false, "next.svg should be deleted");
  assert.strictEqual(fs.existsSync(vercelSvg), false, "vercel.svg should be deleted");
  assert.strictEqual(fs.existsSync(globeSvg), false, "globe.svg should be deleted");
});

test("Branding: Application layout metadata contains authentic A Hiền Coffee branding", () => {
  const webDir = getWebDir();
  const layoutPath = path.resolve(webDir, "src/app/layout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  assert.match(layoutContent, /A Hiền Coffee \| Cà Phê Di Sản & Specialty Roastery — Since 1986/);
  assert.match(layoutContent, /Góc nhỏ A Hiền Coffee — Since 1986\./);
  assert.match(layoutContent, /\/brand\/ahien-mark\.svg/);
  assert.match(layoutContent, /\/brand\/ahien-logo\.svg/);
});
