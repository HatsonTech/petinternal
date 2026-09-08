// ── Single source of truth for clinic content (Turkish) ──────────────
// Blog post types + loader now live in lib/posts.ts

export const site = {
  name: "Pet Internal Veteriner Kliniği",
  shortName: "Pet Internal",
  phoneDisplay: "0536 290 69 58",
  phoneHref: "tel:+905362906958",
  whatsapp: "https://wa.me/905362906958",
  email: "pati@petinternal.com",
  address: {
    line: "Öveçler, 1335. Sk. 8/B",
    district: "06460 Çankaya / Ankara",
    full: "Öveçler, 1335. Sk. 8/B, 06460 Çankaya/Ankara",
  },
  // Exact clinic coordinates → single pin (keyless Google Maps embed)
  geo: { lat: 39.8925626, lng: 32.8300456 },
  mapsEmbed:
    "https://maps.google.com/maps?q=39.8925626,32.8300456&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/place/Pet+%C4%B0nternal+Veteriner+Klini%C4%9Fi/@39.8925626,32.8300456,17z/data=!4m6!3m5!1s0x14d3456948de1403:0xe35bbafbc16bf703!8m2!3d39.8925626!4d32.8300456",
  hours: [
    { day: "Hafta içi", time: "7/24 Açık" },
    { day: "Hafta sonu", time: "7/24 Açık" },
    { day: "Acil servis", time: "Kesintisiz" },
  ],
  // Clinician who authors and medically reviews the blog content.
  // Single source of truth: used for schema.org author + reviewedBy.
  vet: {
    name: "Öykü Yalçın",
    // Professional name on the university / LinkedIn record. Schema-only: it
    // lets search engines resolve both names to one entity without changing
    // anything the visitor sees.
    alternateName: "Öznur Öykü Şimay",
    jobTitle: "Uzman Veteriner Hekim",
    alumniOf: "Ankara Üniversitesi",
    // Drives Person.knowsAbout — the clinic's actual clinical focus, and what
    // the blog is overwhelmingly about.
    knowsAbout: [
      "veteriner iç hastalıkları",
      "kedi ve köpek iç hastalıkları",
      "klinik tanı ve laboratuvar değerlendirmesi",
    ],
    // Corroborates the Person entity: the profile carries the İç Hastalıkları
    // specialisation and the Ankara Üniversitesi record.
    sameAs: ["https://www.linkedin.com/in/%C3%B6znur-%C3%B6yk%C3%BC-%C5%9Fimay-b3a881183/"] as string[],
  },
  social: {
    instagram: "https://www.instagram.com/petinternal/",
  },
} as const;

// Root-anchored so they work from any route (e.g. /blog/...), not just home.
export const navLinks = [
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  /** Stars actually given by the reviewer. Never hard-code this. */
  rating?: number;
  /** Where the review was left, e.g. "Google". */
  source?: string;
};

// Genuine Google reviews, quoted verbatim from the clinic's Google profile.
// Surnames are reduced to an initial (KVKK: the reviewer published the text on
// Google, not here). Two quotes are the reviewer's opening sentences where the
// original ran longer — nothing is paraphrased, reordered or added.
//
// Deliberately NOT marked up with Review/AggregateRating: Google's guidelines
// say "Don't aggregate reviews or ratings from other websites", and reviews the
// business controls are ineligible for star display on LocalBusiness anyway.
// These are shown as plain social proof with a link out to the real profile.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Öykü Hanım çok bilgili ve ilgili. Tavşanlarımız artık ona emanet. Kliniklerinin fiziksel koşulları da çok iyi. Her bakımdan gönül rahatlığıyla tercih edebilirsiniz.",
    name: "Burçak Ö.",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Güleryüzlü ve donanımlı hocalarımıza çok teşekkür ediyoruz. Benim ve can dostum için çok tehlikeli olan bir süreci atlatmamıza vesile oldular. Hepsine teker teker sonsuz kere minnettarız.",
    name: "Mert A.",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Mesleğinizi sadece bilgiyle değil, muazzam bir merhamet, şefkat ve sevgiyle yapıyorsunuz. İyi ki varsınız, iyi ki sizi tanıdık. En zor anlarımızda sergilediğiniz profesyonellik, çaba, sabır ve şefkat bizim için paha biçilemez.",
    name: "Gül Y.",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "İlgili ve güleryüzlü hocalarımıza teşekkür ederiz. 7/24 açık olması büyük bir avantaj. Can dostlarınızı güvenle ellerine emanet edebilirsiniz.",
    name: "Özden Ece K.",
    rating: 5,
    source: "Google",
  },
];


