"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { pushEvent } from "@/lib/gtm";

const fieldBase =
  "w-full rounded-xl border border-hairline bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted transition-colors duration-200 ease-gentle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

/** How the visitor chose to send the request. No backend: each one hands the
 *  pre-filled text to an app on the visitor's device. */
type Channel = "whatsapp" | "eposta";

// Optional on purpose: if the clinic ever drops WhatsApp from lib/site.ts the
// form falls back to the e-mail + phone choice on its own.
const whatsappUrl = site.whatsapp as string | undefined;

const confirmation: Record<Channel, string> = {
  whatsapp:
    "WhatsApp açıldı. Talebiniz, mesajı WhatsApp'ta gönderdiğinizde bize ulaşır.",
  eposta:
    "E-posta uygulamanız açıldı. Talebiniz, e-postayı gönderdiğinizde bize ulaşır.",
};

function openExternal(url: string, newTab: boolean) {
  if (newTab) {
    // Returns null when a popup blocker steps in; fall back to same-tab.
    const w = window.open(url, "_blank");
    if (w) {
      w.opener = null;
      return;
    }
  }
  window.location.href = url;
}

export function ContactForm() {
  const [sent, setSent] = useState<Channel | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Which "send" button was pressed is the channel the visitor chose.
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel =
      submitter?.value === "eposta" || !whatsappUrl ? "eposta" : "whatsapp";

    const data = new FormData(e.currentTarget);
    const ad = String(data.get("ad") ?? "").trim();
    const tel = String(data.get("telefon") ?? "").trim();
    const tur = String(data.get("tur") ?? "");
    const mesaj = String(data.get("mesaj") ?? "").trim();
    const lines = [
      `Ad: ${ad}`,
      `Telefon: ${tel}`,
      `Hayvan türü: ${tur}`,
      ...(mesaj ? ["", mesaj] : []),
    ];

    if (channel === "whatsapp" && whatsappUrl) {
      const text = ["Merhaba, randevu talebim:", "", ...lines].join("\n");
      openExternal(`${whatsappUrl}?text=${encodeURIComponent(text)}`, true);
    } else {
      const subject = `Randevu talebi — ${ad || site.shortName}`;
      openExternal(
        `mailto:${site.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(lines.join("\n"))}`,
        false
      );
    }

    // Fired only now, once the visitor has picked a channel. Deliberately no
    // name/phone/message — GA4 forbids PII in event params.
    pushEvent("randevu_talebi", {
      hayvan_turu: tur,
      mesaj_var: mesaj.length > 0,
      kanal: channel,
    });
    setSent(channel);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-hairline bg-surface p-6 shadow-soft sm:p-8"
      aria-label="Randevu ve iletişim formu"
    >
      <h3 className="font-display text-xl font-semibold text-ink">
        Randevu talebi gönderin
      </h3>
      <p className="mt-1.5 text-sm text-muted">
        {whatsappUrl
          ? "Formu doldurun; bilgileriniz WhatsApp mesajına hazır olarak eklenir, siz gönderirsiniz."
          : "Formu doldurun; bilgileriniz e-postaya hazır olarak eklenir, siz gönderirsiniz."}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="ad" className="mb-1.5 block text-sm font-medium text-ink">
            Ad Soyad
          </label>
          <input id="ad" name="ad" type="text" required autoComplete="name" placeholder="Adınız" className={fieldBase} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="telefon" className="mb-1.5 block text-sm font-medium text-ink">
            Telefon
          </label>
          <input id="telefon" name="telefon" type="tel" required autoComplete="tel" placeholder="05xx xxx xx xx" className={fieldBase} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="tur" className="mb-1.5 block text-sm font-medium text-ink">
            Hayvan türü
          </label>
          <select id="tur" name="tur" defaultValue="Kedi" className={fieldBase}>
            <option>Kedi</option>
            <option>Köpek</option>
            <option>Kuş</option>
            <option>Kemirgen / Tavşan</option>
            <option>Diğer</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="mesaj" className="mb-1.5 block text-sm font-medium text-ink">
            Mesajınız
          </label>
          <textarea id="mesaj" name="mesaj" rows={4} placeholder="Dostunuzun durumu ve uygun olduğunuz saatler…" className={`${fieldBase} resize-none`} />
        </div>
      </div>

      {whatsappUrl ? (
        <button
          type="submit"
          name="kanal"
          value="whatsapp"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-base font-medium text-white shadow-soft transition-colors duration-200 ease-gentle hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
          WhatsApp ile Gönder
        </button>
      ) : null}

      <div
        className={`${whatsappUrl ? "mt-3" : "mt-6"} grid grid-cols-1 gap-3 sm:grid-cols-2`}
      >
        <button
          type="submit"
          name="kanal"
          value="eposta"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-hairline transition-colors duration-200 ease-gentle hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          E-posta ile gönder
        </button>
        <a
          href={site.phoneHref}
          data-gtm-source="randevu-formu"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-hairline transition-colors duration-200 ease-gentle hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Telefonla arayın
        </a>
      </div>

      <p
        className="mt-3 text-center text-xs font-medium text-brand"
        role="status"
        aria-live="polite"
      >
        {sent ? (
          <>
            {confirmation[sent]} Açılmadıysa{" "}
            <a href={site.phoneHref} className="whitespace-nowrap underline underline-offset-2">
              {site.phoneDisplay}
            </a>{" "}
            numarasından arayabilirsiniz.
          </>
        ) : null}
      </p>
    </form>
  );
}
