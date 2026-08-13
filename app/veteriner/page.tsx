import Link from "next/link";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";
import { locations } from "@/lib/locations";

const BASE = "https://www.petinternal.com";

export const metadata: Metadata = {
  title: "Hizmet Verdiğimiz Bölgeler",
  description:
    "Çankaya Öveçler'deki kliniğimize Balgat, Dikmen, Çukurambar, Or-An, Söğütözü ve Emek'ten ulaşım bilgileri. 7/24 açık veteriner kliniği.",
  keywords: [
    "Çankaya veteriner",
    "Öveçler veteriner",
    "Ankara veteriner kliniği",
    "Balgat veteriner",
    "Dikmen veteriner",
  ],
  alternates: { canonical: "/veteriner" },
};

export default function LocationsIndexPage() {
  const primary = locations.filter((l) => l.kind === "primary");
  const nearby = locations.filter((l) => l.kind === "nearby");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      { "@type": "ListItem", position: 2, name: "Bölgeler", item: `${BASE}/veteriner` },
    ],
  };

  return (
    <>
      <main id="main">
        <section className="bg-paper py-12 sm:py-16">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <span className="eyebrow">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Ankara
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Hizmet verdiğimiz bölgeler
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Tek kliniğimiz {site.address.full} adresinde, 7/24 açık. Aşağıdaki
                sayfalarda çevre bölgelerden kliniğe nasıl ulaşacağınızı ve sık
                sorulan soruların yanıtlarını bulabilirsiniz.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-paper pb-16 sm:pb-20">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                eyebrow="Kliniğimizin bulunduğu bölge"
                title="Çankaya ve Öveçler"
                align="left"
              />
              <ul className="mt-6 space-y-2">
                {primary.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/veteriner/${l.slug}`}
                      className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-700"
                    >
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-t border-hairline pt-8">
                <SectionHeading
                  eyebrow="Yakın bölgeler"
                  title="Çevre bölgelerden gelen dostlarımız"
                  align="left"
                >
                  Bu bölgelerde şubemiz bulunmuyor; sayfalar, oradan Öveçler'deki
                  kliniğimize ulaşmak isteyenler için hazırlandı.
                </SectionHeading>
                <ul className="mt-6 space-y-2">
                  {nearby.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/veteriner/${l.slug}`}
                        className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-700"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
