"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import {
  CONSENT_STORAGE_KEY,
  updateConsent,
  type ConsentChoice,
} from "@/lib/gtm";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_STORAGE_KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — stay hidden */
    }
  }, []);

  function decide(value: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      /* ignore — consent still applies for this page view */
    }
    // Tell GTM before hiding: the container is holding tags on
    // wait_for_update, and this is what releases them.
    updateConsent(value);
    setShow(false);
  }

  if (!show) return null;

  // Phones (< md): one slim row parked directly on top of the fixed
  // MobileCallBar (h-16), so it never covers Ara / WhatsApp / Yol tarifi.
  // md+: the original floating card, bottom-left.
  return (
    <section
      aria-label="Çerez bildirimi"
      className="animate-fade-up fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-[60] md:inset-x-auto md:bottom-5 md:left-5 md:max-w-sm"
    >
      <div className="border-t border-hairline bg-surface px-4 py-2 shadow-lift md:rounded-2xl md:border md:p-4">
        <div className="flex items-center gap-3 md:items-start">
          <span className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200 md:flex">
            <Cookie className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2 md:block">
            <p className="min-w-0 flex-1 text-[0.8rem] leading-snug text-ink/90 md:text-sm md:leading-relaxed">
              <span className="md:hidden">Sitemizde çerez kullanıyoruz.</span>
              <span className="hidden md:inline">
                Size daha iyi bir deneyim sunmak için çerezler kullanıyoruz.
              </span>
            </p>
            <div className="flex shrink-0 gap-2 md:mt-3 md:flex-wrap">
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="rounded-full bg-brand-600 px-3 py-1.5 text-[0.8rem] font-medium text-white shadow-soft transition-colors duration-200 ease-gentle hover:bg-brand-700 md:px-4 md:py-2 md:text-sm"
              >
                Kabul Et
              </button>
              <button
                type="button"
                onClick={() => decide("rejected")}
                className="rounded-full px-3 py-1.5 text-[0.8rem] font-medium text-ink ring-1 ring-hairline transition-colors duration-200 ease-gentle hover:bg-cream md:px-4 md:py-2 md:text-sm"
              >
                Reddet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
