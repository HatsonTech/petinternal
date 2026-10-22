import { Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { directionsUrl, site } from "@/lib/site";

const directions = directionsUrl();

// Keep in sync with the cookie banner's mobile `bottom` offset.
const BAR_HEIGHT = "h-16";

/**
 * Fixed call / WhatsApp / directions bar for phones (< md). On larger screens
 * the header button and the WhatsApp FAB take over. The spacer keeps the
 * footer's last line from sitting under the bar.
 */
export function MobileCallBar() {
  const whatsapp = site.whatsapp as string | undefined;
  const item =
    "flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.8rem] font-semibold leading-none transition-colors duration-200 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white";

  return (
    <>
      <div aria-hidden="true" className={`${BAR_HEIGHT} md:hidden`} />
      <nav
        aria-label="Hızlı iletişim"
        className="fixed inset-x-0 bottom-0 z-50 bg-brand-800 pb-[env(safe-area-inset-bottom)] text-white shadow-lift md:hidden"
      >
        <div className={`flex ${BAR_HEIGHT} divide-x divide-white/15`}>
          <a
            href={site.phoneHref}
            data-gtm-source="mobil-bar"
            className={`${item} bg-brand-600 hover:bg-brand-700`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            <span className="mt-1">Ara</span>
          </a>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-gtm-source="mobil-bar"
              className={`${item} hover:bg-white/10`}
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="mt-1">WhatsApp</span>
            </a>
          ) : null}
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            data-gtm-source="mobil-bar"
            className={`${item} hover:bg-white/10`}
          >
            <Navigation className="h-5 w-5" aria-hidden="true" />
            <span className="mt-1">Yol tarifi</span>
          </a>
        </div>
      </nav>
    </>
  );
}
