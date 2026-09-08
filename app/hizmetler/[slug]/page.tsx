import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Info, Stethoscope } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FaqAccordion } from "@/components/faq";
import { site } from "@/lib/site";
import { getPost } from "@/lib/posts";
import { services, getService } from "@/lib/services";

const BASE = "https://www.petinternal.com";

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

  const url = `${BASE}/hizmetler/${service.slug}`;
  // Only render links whose target actually exists in lib/posts.
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
    provider: { "@id": BASE },
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
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetler",
        item: `${BASE}/hizmetler`,
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
                href="/hizmetler"
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

              <p className="mt-6 text-lg leading-relaxed text-ink/90">
                {service.intro}
              </p>

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
