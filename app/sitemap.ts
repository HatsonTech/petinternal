import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

const BASE = "https://www.petinternal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.dateISO),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/hizmetler/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Geo landing pages. Çankaya/Öveçler are where the clinic physically is, so
  // they rank higher than the nearby areas we simply serve visitors from.
  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${BASE}/veteriner/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l.kind === "primary" ? 0.9 : 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${BASE}/veteriner`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...locationPages,
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
