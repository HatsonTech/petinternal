import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, MapPin, PawPrint, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* restrained decorative wash behind the photo only — not a hero gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-10%] hidden h-[36rem] w-[36rem] rounded-full bg-brand-100/50 blur-3xl dark:bg-brand-900/30 lg:block"
      />
      <div className="container-px relative grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Copy */}
        <div className="lg:col-span-6 lg:pr-6">
          <span className="eyebrow">
            <PawPrint className="h-4 w-4" aria-hidden="true" />
            Çankaya · Ankara
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Ankara, Çankaya Öveçler&apos;de{" "}
            <span className="text-brand">7/24 açık</span> veteriner kliniği
          </h1>
          <p className="mt-4 text-balance font-display text-xl font-medium leading-snug text-ink/85 sm:text-2xl">
            Patili dostlarınıza gece gündüz şefkatle bakıyoruz.
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Çankaya Öveçler'de; uzman veteriner hekimimiz Öykü Yalçın ve ekibiyle
            kedi, köpek, kuş, tavşan ve küçük memelilere koruyucu hekimlikten
            cerrahiye, tahlilden acil müdahaleye kadar hizmet veriyoruz. Gece, pazar ve bayram dâhil
            açığız.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              href={site.phoneHref}
              variant="primary"
              size="lg"
              external={false}
              ariaLabel={`Hemen Ara: ${site.phoneDisplay}`}
            >
              <Phone className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
              Hemen Ara
            </ButtonLink>
            <ButtonLink href={site.whatsapp} variant="secondary" size="lg">
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
              WhatsApp&apos;tan Yaz
            </ButtonLink>
            <ButtonLink href="/#iletisim" variant="secondary" size="lg">
              <CalendarCheck className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
              Randevu Al
            </ButtonLink>
          </div>

          <div className="mt-8 flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <Link
              href="/veteriner/ovecler-veteriner/"
              className="underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              {site.address.full}
            </Link>
          </div>
        </div>

        {/* Photo + overlapping card */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-cream shadow-lift ring-1 ring-black/5">
              <Image
                src="/images/about-care.jpg"
                alt="Yumuşak bir battaniyede dinlenen golden retriever yavrusu"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="object-cover"
              />
            </div>

            {/* small 7/24 pill */}
            <div className="absolute -right-3 top-5 rounded-full border border-hairline bg-surface/95 px-3.5 py-1.5 text-xs font-semibold text-brand shadow-soft backdrop-blur-sm">
              7/24 Acil Açık
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
