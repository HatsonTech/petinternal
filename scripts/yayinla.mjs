#!/usr/bin/env node
// Taslak yazilari yayina alir ve tarihlerini bugune ceker.
//
//   node scripts/yayinla.mjs          -> siradaki 5 taslagi yayinlar
//   node scripts/yayinla.mjs 3        -> siradaki 3 taslagi yayinlar
//   node scripts/yayinla.mjs --list   -> bekleyen taslaklari listeler
//   node scripts/yayinla.mjs --gunluk -> bugun hic yayin yoksa 1 taslak yayinlar
//                                        (GitHub Actions her gun bunu calistirir)
//
// Sira: "queue" alani olmayanlar once (slug sirasiyla), sonra queue numarasina gore.
//
// Tarih otomatik olarak bugun yapilir; boylece ileri tarihli yazi olusmaz.

import { readFileSync, writeFileSync, readdirSync, existsSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "lib/posts";
const LOG = "scripts/yayin-gunlugu.txt";
const AY = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
            "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const arg = process.argv[2];
const listOnly = arg === "--list";
const daily = arg === "--gunluk";
const count = listOnly ? 0 : daily ? 1 : Number(arg ?? 5);

if (!listOnly && (!Number.isInteger(count) || count < 1)) {
  console.error("Kullanim: node scripts/yayinla.mjs [adet|--list|--gunluk]");
  process.exit(1);
}

const drafts = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({ file: f, data: JSON.parse(readFileSync(join(DIR, f), "utf8")) }))
  .filter((p) => p.data.published === false)
  .sort((a, b) => (a.data.queue ?? 0) - (b.data.queue ?? 0) || a.data.slug.localeCompare(b.data.slug, "tr"));

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

if (daily && existsSync(LOG) && readFileSync(LOG, "utf8").split(/\s+/).includes(iso)) {
  console.log("Bugun zaten yayin yapildi.");
  process.exit(0);
}

const batch = drafts.slice(0, count);
for (const { file, data } of batch) {
  delete data.published;
  delete data.queue;
  data.dateISO = iso;
  data.updatedISO = iso;
  data.date = trDate;
  writeFileSync(join(DIR, file), JSON.stringify(data, null, 2) + "\n", "utf8");
  appendFileSync(LOG, `${iso} ${data.slug}\n`, "utf8");
  console.log(`  yayinlandi  ${data.slug}  (${iso})`);
}

console.log(`\n${batch.length} yazi yayina alindi. Kalan taslak: ${drafts.length - batch.length}`);
console.log("Siteyi yeniden derlemeyi unutmayin: npm run build");
