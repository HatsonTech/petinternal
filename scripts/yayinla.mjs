#!/usr/bin/env node
// Taslak yazilari yayina alir ve tarihlerini bugune ceker.
//
//   node scripts/yayinla.mjs          -> siradaki 5 taslagi yayinlar
//   node scripts/yayinla.mjs 3        -> siradaki 3 taslagi yayinlar
//   node scripts/yayinla.mjs --list   -> bekleyen taslaklari listeler
//
// Tarih otomatik olarak bugun yapilir; boylece ileri tarihli yazi olusmaz.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "lib/posts";
const AY = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
            "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const arg = process.argv[2];
const listOnly = arg === "--list";
const count = listOnly ? 0 : Number(arg ?? 5);

if (!listOnly && (!Number.isInteger(count) || count < 1)) {
  console.error("Kullanim: node scripts/yayinla.mjs [adet|--list]");
  process.exit(1);
}

const drafts = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(DIR, f), "utf8")) }))
  .filter((p) => p.data.published === false)
  .sort((a, b) => a.data.slug.localeCompare(b.data.slug, "tr"));

if (drafts.length === 0) {
  console.log("Bekleyen taslak yok.");
  process.exit(0);
}

if (listOnly) {
  console.log(`Bekleyen ${drafts.length} taslak:\n`);
  for (const d of drafts) console.log("  -", d.data.slug);
  process.exit(0);
}

const now = new Date();
const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const trDate = `${now.getDate()} ${AY[now.getMonth() + 1]} ${now.getFullYear()}`;

const batch = drafts.slice(0, count);
for (const { file, data } of batch) {
  delete data.published;
  data.dateISO = iso;
  data.updatedISO = iso;
  data.date = trDate;
  writeFileSync(join(DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`  yayinlandi  ${data.slug}  (${iso})`);
}

console.log(`\n${batch.length} yazi yayina alindi. Kalan taslak: ${drafts.length - batch.length}`);
console.log("Siteyi yeniden derlemeyi unutmayin: npm run build");
