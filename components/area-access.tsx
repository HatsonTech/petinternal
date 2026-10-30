import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ANKARA_SLUG } from "@/lib/locations";

// Short homepage block under the contact/map section: how the main Çankaya
// areas reach the clinic. Road names are the verified ones used on the
// /veteriner/<slug>/ pages (OpenStreetMap, Vikipedi, EGO) — keep in sync.
const AREAS: { name: string; slug: string; route: string }[] = [
  { name: "Balgat", slug: "balgat-veteriner", route: "Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı → Kabil Caddesi" },
  { name: "Dikmen", slug: "dikmen-veteriner", route: "Dikmen Caddesi → Lizbon ya da Mimar Caddesi → Kabil Caddesi" },
  { name: "Çukurambar", slug: "cukurambar-veteriner", route: "Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı" },
  { name: "Söğütözü", slug: "sogutozu-veteriner", route: "Söğütözü Caddesi → Muhsin Yazıcıoğlu Caddesi → Çetin Emeç Bulvarı" },
  { name: "Emek", slug: "emek-veteriner", route: "Ziyabey ve Ceyhun Atuf Kansu Caddesi → Çetin Emeç Bulvarı" },
  { name: "Or-An", slug: "or-an-veteriner", route: "Dikmen Caddesi kuzeye → Kabil Caddesi" },
  { name: "Kızılay", slug: "cankaya-veteriner", route: "Dikmen Caddesi → Çetin Emeç Bulvarı; EGO 451 ve 454" },
];

export function AreaAccess() {
  return (
    <section aria-labelledby="semtlerden-ulasim" className="bg-paper pb-20 sm:pb-24">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Ulaşım</span>
          <h2
            id="semtlerden-ulasim"
            className="mt-3 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl"
          >
            Çankaya&apos;nın semtlerinden kliniğe
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Kliniğimiz Kabil Caddesi&apos;nin Çetin Emeç Bulvarı&apos;na yakın
            ucunda, 1335. Sokak&apos;ta. Başka semtte şubemiz yok; çevre
            semtlerden gelen yollar çoğunlukla Çetin Emeç Bulvarı&apos;nda
            birleşiyor.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <li key={a.name}>
              <Link
                href={`/veteriner/${a.slug}/`}
                className="group flex h-full items-start gap-3 rounded-2xl border border-hairline bg-surface p-4 shadow-soft transition-colors hover:border-brand-300"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-ink group-hover:text-brand">
                    {a.name}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                    {a.route}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/veteriner/${ANKARA_SLUG}/`}
          className="mt-6 inline-flex items-center gap-2 font-medium text-brand transition-colors hover:text-brand-700"
        >
          Ankara&apos;nın başka bir yerinden gece, pazar ya da bayramda mı
          geliyorsunuz?
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
