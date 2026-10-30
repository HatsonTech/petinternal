import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { SITE_URL, site } from "@/lib/site";
import { ANKARA_SLUG, locations, type Location } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Ankara ve Çankaya'dan Kliniğe Ulaşım",
  description:
    "Çankaya Öveçler'deki 7/24 açık veteriner kliniğine Ankara'nın her yerinden, Balgat, Dikmen, Çukurambar, Or-An, Söğütözü ve Emek'ten ulaşım rehberi.",
  keywords: [
    "Ankara veteriner",
    "Çankaya veteriner",
    "Öveçler veteriner",
    "Ankara 7/24 açık veteriner",
    "Balgat veteriner",
    "Dikmen veteriner",
    "Çukurambar veteriner",
  ],
  alternates: { canonical: "/veteriner" },
};

function LocationItem({ loc }: { loc: Location }) {
  return (
    <li>
      <Link
        href={`/veteriner/${loc.slug}/`}
        className="group flex items-start gap-3.5 rounded-2xl border border-hairline bg-surface p-5 shadow-soft transition-colors hover:border-brand-300"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
          <MapPin className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-ink transition-colors group-hover:text-brand">
            {loc.title}
          </span>
          {loc.summary && (
            <span className="mt-1 block text-sm leading-relaxed text-muted">
              {loc.summary}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

export default function LocationsIndexPage() {
  const ankara = locations.find((l) => l.slug === ANKARA_SLUG);
  const primary = locations.filter((l) => l.kind === "primary" && l.slug !== ANKARA_SLUG);
  const nearby = locations.filter((l) => l.kind === "nearby");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Bölgeler", item: `${SITE_URL}/veteriner/` },
    ],
  };

  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: locations.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: l.title,
      url: `${SITE_URL}/veteriner/${l.slug}/`,
    })),
  };

  return (
    <>
      <main id="main">
        <section className="bg-paper py-12 sm:py-16">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <span className="eyebrow">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Ankara · Çankaya
              </span>
              <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Kliniğe ulaşım: Ankara ve Çankaya
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Tek kliniğimiz {site.address.full} adresinde ve 7/24 açık. Başka
                bir semtte şubemiz yok; aşağıdaki sayfalar, Ankara&apos;nın ve
                Çankaya&apos;nın farklı bölgelerinden bu adrese hangi yollarla
                geleceğinizi, toplu taşıma seçeneklerini ve o bölgeye özel sık
                sorulan soruları anlatıyor.
              </p>
              <ul className="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:gap-6">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
                  Gece, pazar ve bayram dâhil açık
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                  <a href={site.phoneHref} className="hover:text-brand">
                    Yola çıkmadan arayın: {site.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-paper pb-16 sm:pb-20">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              {ankara && (
                <Link
                  href={`/veteriner/${ankara.slug}/`}
                  className="group block rounded-2xl border-l-4 border-brand bg-cream p-5 transition-colors sm:p-6"
                >
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                    Gece, pazar ya da bayramda veteriner mi arıyorsunuz?
                  </span>
                  <span className="mt-2 flex items-center gap-2 font-display text-xl font-semibold text-ink group-hover:text-brand">
                    {ankara.title}
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </span>
                  {ankara.summary && (
                    <span className="mt-2 block leading-relaxed text-ink/80">
                      {ankara.summary}
                    </span>
                  )}
                </Link>
              )}

              <div className="mt-12">
                <SectionHeading
                  eyebrow="Kliniğimizin bulunduğu yer"
                  title="Çankaya ve Öveçler"
                  align="left"
                />
                <ul className="mt-6 space-y-3">
                  {primary.map((l) => (
                    <LocationItem key={l.slug} loc={l} />
                  ))}
                </ul>
              </div>

              <div className="mt-12 border-t border-hairline pt-8">
                <SectionHeading
                  eyebrow="Komşu semtler"
                  title="Çevre semtlerden ulaşım"
                  align="left"
                >
                  Bu semtlerde şubemiz bulunmuyor; sayfalar oradan
                  Öveçler&apos;deki kliniğimize gelmek isteyenler için hazırlandı.
                </SectionHeading>
                <ul className="mt-6 space-y-3">
                  {nearby.map((l) => (
                    <LocationItem key={l.slug} loc={l} />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, listLd]) }}
      />
    </>
  );
}
