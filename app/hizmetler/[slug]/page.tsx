import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Info,
  MapPin,
  Navigation,
  Phone,
  Quote,
  Stethoscope,
} from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq";
import { LocationLinks } from "@/components/location-links";
import { ButtonLink } from "@/components/ui/button";
import { CLINIC_ID, SITE_URL, directionsUrl, site, testimonials } from "@/lib/site";
import { getPost } from "@/lib/posts";
import { services, getService } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: {
      type: "website",
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/hizmetler/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const url = `${SITE_URL}/hizmetler/${service.slug}/`;
  // Verbatim Google quotes for the emergency layout, looked up by reviewer.
  const quotes = (service.urgent?.reviewers ?? [])
    .map((name) => testimonials.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));  // Only render links whose target actually exists in lib/posts.
  const related = service.relatedPosts
    .map((slug) => getPost(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    url,
    // Reference the VeterinaryCare defined once in app/layout.tsx rather than
    // redefining the business on every page.
    provider: { "@id": CLINIC_ID },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Çankaya" },
      { "@type": "City", name: "Ankara" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+905362906958",
        contactType: "Randevu",
      },
      serviceUrl: url,
    },
    inLanguage: "tr-TR",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${SITE_URL}/hizmetler/`,
      },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <>
      <main id="main">
        <article className="bg-paper py-12 sm:py-16">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/hizmetler/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Tüm hizmetler
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                  Hizmet
                </span>
                <span>Çankaya Öveçler, Ankara</span>
              </div>

              <h1 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                {service.h1}
              </h1>

              {service.urgent && (
                <>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink
                      href={site.phoneHref}
                      variant="primary"
                      size="lg"
                      external={false}
                    >
                      <Phone className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                      Hemen Ara: {site.phoneDisplay}
                    </ButtonLink>
                    <ButtonLink href={directionsUrl()} variant="secondary" size="lg">
                      <Navigation className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                      Yol tarifi al
                    </ButtonLink>
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>
                      <a
                        href={site.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-brand"
                      >
                        {site.address.full}
                      </a>{" "}
                      · 7/24 açık
                    </span>
                  </p>

                  {quotes.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {quotes.map((t) => (
                        <figure
                          key={t.name}
                          className="flex flex-col rounded-2xl border border-hairline bg-surface p-5 shadow-soft"
                        >
                          <Quote className="h-5 w-5 text-brand-300" aria-hidden="true" />
                          <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink/90">
                            “{t.quote}”
                          </blockquote>
                          <figcaption className="mt-3 text-sm text-muted">
                            <span className="font-semibold text-ink">{t.name}</span>
                            {t.source ? ` · ${t.source} yorumu` : null}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </>
              )}

              <p className="mt-6 text-lg leading-relaxed text-ink/90">
                {service.intro}
              </p>

              {/* Long-form sections: the page's main questions, answered first */}
              {service.sections?.map((sec) => (
                <section key={sec.h2}>
                  <h2 className="mt-9 font-display text-xl font-semibold text-ink sm:text-2xl">
                    {sec.h2}
                  </h2>
                  {sec.paragraphs?.map((p, i) => (
                    <p key={i} className="mt-3 leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {sec.list && (
                    <ul className="mt-4 space-y-2.5">
                      {sec.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {sec.alert ? (
                            <AlertTriangle
                              className="mt-1 h-5 w-5 shrink-0 text-brand"
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          )}
                          <span className="leading-relaxed text-muted">
                            {item.text}
                            {item.link && (
                              <>
                                {" "}
                                <Link
                                  href={item.link.href}
                                  className="font-medium text-brand hover:text-brand-700"
                                >
                                  {item.link.label}
                                </Link>
                              </>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.after && (
                    <p className="mt-4 leading-relaxed text-muted">{sec.after}</p>
                  )}
                  {sec.links && sec.links.length > 0 && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      İlgili rehber:{" "}
                      {sec.links.map((l, i) => (
                        <span key={l.href}>
                          {i > 0 && " · "}
                          <Link
                            href={l.href}
                            className="font-medium text-brand hover:text-brand-700"
                          >
                            {l.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </section>
              ))}

              {/* Bu hizmet neleri kapsar */}
              <h2 className="mt-9 font-display text-xl font-semibold text-ink sm:text-2xl">
                Bu hizmet neleri kapsar?
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.covers.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Ziyaret nasıl ilerler */}
              <h2 className="mt-9 font-display text-xl font-semibold text-ink sm:text-2xl">
                Ziyaret nasıl ilerler?
              </h2>
              {service.visit.map((v, i) => (
                <div key={i}>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                    {i + 1}. {v.step}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
                </div>
              ))}

              {/* Gelmeden önce */}
              <h2 className="mt-9 font-display text-xl font-semibold text-ink sm:text-2xl">
                Gelmeden önce hazırlayın
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.prepare.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border-l-4 border-brand bg-cream p-4 sm:p-5">
                <Info
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <p className="leading-relaxed text-ink/90">
                  Randevu ve sorularınız için{" "}
                  <a
                    href={site.phoneHref}
                    className="font-medium text-brand hover:text-brand-700"
                  >
                    {site.phoneDisplay}
                  </a>{" "}
                  numarasından arayabilir ya da{" "}
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand hover:text-brand-700"
                  >
                    WhatsApp
                  </a>{" "}
                  üzerinden yazabilirsiniz. Kliniğimiz {site.address.full}{" "}
                  adresinde 7/24 açıktır.
                </p>
              </div>

              {/* FAQ */}
              {service.faqs.length > 0 && (
                <section className="mt-12 border-t border-hairline pt-8">
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Sık Sorulan Sorular
                  </h2>
                  <FaqAccordion items={service.faqs} />
                </section>
              )}

              {/* Sources — only references that were opened and checked */}
              {service.sources && service.sources.length > 0 && (
                <section className="mt-10">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Kaynaklar
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {service.sources.map((s) => (
                      <li key={s.url}>
                        {s.publisher}:{" "}
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:text-brand-700"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Medical disclaimer */}
              <div className="mt-10 flex items-start gap-3 rounded-2xl border border-hairline bg-cream p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                  <Stethoscope className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-muted">
                  Bu sayfadaki bilgiler hayvan sahiplerini bilgilendirme
                  amaçlıdır ve veteriner hekim muayenesinin yerini tutmaz.
                  Dostunuza özel tanı ve tedavi kararları, ancak klinik muayene
                  ve gerekli tetkiklerin ardından verilebilir. Bir şikâyetiniz
                  varsa lütfen{" "}
                  <a
                    href={site.phoneHref}
                    className="font-medium text-brand hover:text-brand-700"
                  >
                    kliniğimize danışın
                  </a>
                  .
                </p>
              </div>

              {/* Related guides — internal linking */}
              {related.length > 0 && (
                <div className="mt-12 border-t border-hairline pt-8">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    İlgili rehberler
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-700"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Location pages — one crawlable entry per district */}
              <div className="mt-12 border-t border-hairline pt-8">
                <h2 className="font-display text-xl font-semibold text-ink">
                  {service.access
                    ? "Çankaya ve Ankara'dan ulaşım"
                    : "Bölgenizden kliniğe ulaşım"}
                </h2>
                {service.access ? (
                  <>
                    <p className="mt-2 leading-relaxed text-muted">
                      {service.access.text}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {service.access.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="inline-flex items-center gap-2 font-medium text-brand transition-colors hover:text-brand-700"
                          >
                            <MapPin className="h-4 w-4" aria-hidden="true" />
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      Semtinizden yol tarifi için:
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Tek kliniğimiz Öveçler&apos;de. Semtinizden yol tarifi ve
                    ulaşım bilgisi için:
                  </p>
                )}
                <LocationLinks className="mt-4" />
              </div>

              {/* Other services */}
              <div className="mt-12 border-t border-hairline pt-8">
                <h2 className="font-display text-xl font-semibold text-ink">
                  Diğer hizmetlerimiz
                </h2>
                <ul className="mt-4 space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/hizmetler/${s.slug}`}
                          className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-700"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        <CtaBand />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceLd, faqLd, breadcrumbLd]),
        }}
      />
    </>
  );
}
