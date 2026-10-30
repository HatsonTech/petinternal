// ── Service pages: single source of truth ────────────────────────────
// Titles, descriptions and ordering mirror components/services.tsx exactly.
// Icons are re-exported here so both the homepage section and the service
// pages render the same lucide glyph without duplicating the mapping.
//
// Editorial rules for this file (owner education, not clinical instruction):
//   • no dosages, no drug names presented as recommendations
//   • no treatment promises, outcome guarantees or diagnostic claims
//   • no prices; every page defers to an in-person examination

import {
  Bath,
  Bird,
  HeartPulse,
  Microscope,
  Salad,
  Scissors,
  Siren,
  Sparkles,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import type { FAQ, Source } from "@/lib/posts";
import { site } from "@/lib/site";

/** Internal link shown inside a section (blog post, service or /veteriner page). */
export type ServiceLink = { href: string; label: string };

/** Optional long-form block rendered right after the intro. */
export type ServiceSection = {
  h2: string;
  paragraphs?: string[];
  /** Bullet list; an item may carry one internal link shown after its text. */
  list?: { text: string; link?: ServiceLink }[];
  /** Warning-style bullets (e.g. "Hangi durumlar beklemez?"). */
  alert?: boolean;
  /** Paragraph after the list. */
  after?: string;
  /** "İlgili rehber" links under the section. */
  links?: ServiceLink[];
};

/** /veteriner/ pages every expanded service links to. */
const accessLinks: ServiceLink[] = [
  { href: "/veteriner/cankaya-veteriner/", label: "Çankaya veteriner kliniği" },
  { href: "/veteriner/ovecler-veteriner/", label: "Öveçler veteriner" },
  { href: "/veteriner/ankara-7-24-acik-veteriner/", label: "Ankara'da 7/24 açık veteriner" },
];

export type Service = {
  slug: string;
  icon: LucideIcon;
  /** Card title — must match components/services.tsx verbatim. */
  title: string;
  /** Card description — must match components/services.tsx verbatim. */
  desc: string;
  /** H1 on the detail page. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  /** "Bu hizmet neleri kapsar" bullet list. */
  covers: string[];
  /** "Muayene nasıl ilerler" ordered steps. */
  visit: { step: string; text: string }[];
  /** "Gelmeden önce" preparation bullets. */
  prepare: string[];
  faqs: FAQ[];
  /** Blog slugs — every one verified to exist in lib/posts/*.json (drafts are skipped until published). */
  relatedPosts: string[];
  /** Emergency layout: call + directions buttons right under the H1 and the
   *  named reviewers' Google quotes near the top. Names must match
   *  `testimonials` in lib/site.ts; quotes are rendered verbatim from there. */
  urgent?: { reviewers: string[] };
  /** Long-form sections rendered after the intro (answers the page's main queries). */
  sections?: ServiceSection[];
  /** "Çankaya ve Ankara'dan ulaşım" block: short text + /veteriner/ links. */
  access?: { text: string; links: ServiceLink[] };
  /** Opened-and-checked references, shown under "Kaynaklar". */
  sources?: Source[];
};

export const services: Service[] = [
  {
    slug: "genel-muayene-check-up",
    icon: Stethoscope,
    title: "Genel Muayene & Check-up",
    desc: "Düzenli kontrollerle dostlarınızın sağlığını korur, sorunları erken yakalarız.",
    h1: "Kedi ve Köpekte Genel Muayene ve Yıllık Check-up",
    metaTitle: "Kedi ve Köpek Check-up, Genel Muayene · Çankaya Ankara",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpek check-up: yıllık kontrol, yaşlı dostlarda tahliller, yavru kedinin ilk veteriner ziyareti ve muayenede bakılanlar.",
    keywords: [
      "kedi köpek check up Ankara",
      "yıllık check-up veteriner Çankaya",
      "yaşlı kedi check-up",
      "yaşlı köpek check-up Ankara",
      "yavru kedi ilk veteriner ziyareti",
      "veteriner genel muayene Çankaya",
      "Öveçler veteriner muayene",
    ],
    intro:
      "Kedi ve köpekler için genel muayene ve check-up'ı Çankaya Öveçler'deki kliniğimizde yapıyoruz; kliniğimiz 7/24 açık olduğu için iş çıkışı ya da hafta sonu da gelebilirsiniz. Genel muayene, dostunuzun sağlık durumunu baştan aşağı gözden geçirdiğimiz temel kontroldür. Birçok rahatsızlık, evde fark edilen bir belirti vermeden önce fizik muayenede ya da rutin tahlillerde iz bırakır. Düzenli check-up'ın amacı bu izleri erken görmek ve dostunuzun kendi normalini kayıt altına almaktır.",
    sections: [
      {
        h2: "Yıllık check-up ne sıklıkla yapılmalı?",
        paragraphs: [
          "AAHA ve Amerikan Kedi Hekimleri Derneği'nin (AAFP) 2021 kedi yaşam dönemi rehberi, sağlıklı görünen her kedi için en az yılda bir muayeneyi; yaşlı kediler için en az altı ayda bir kontrolü, kronik hastalığı olanlar için daha sık görüşmeyi önerir. Rehber kedinin yaşamını yavru (1 yaşa kadar), genç erişkin (1–6 yaş), olgun erişkin (7–10 yaş) ve yaşlı (10 yaş üstü) dönemlere ayırır.",
          "Köpeklerde AAHA'nın 2019 rehberi yaşlılığı ırkın beklenen ömrünün son dörtte biri olarak tanımlar; bu yüzden iri ırk bir köpek daha erken yaşta “yaşlı” sayılır.",
        ],
      },
      {
        h2: "Check-up'a hangi tahliller eklenebilir?",
        paragraphs: [
          "Tahlil otomatik bir adım değildir; fizik muayene bulgularına, yaşa ve öyküye göre karar verilir. Gündeme gelebilecek başlıca tetkikler şunlardır:",
        ],
        list: [
          {
            text: "Tam kan sayımı ve biyokimya: kansızlık, enfeksiyon, böbrek ve karaciğer değerleri için temel tablo.",
            link: { href: "/blog/kan-tahlili-sonucu-nasil-okunur/", label: "Kan tahlili sonucu nasıl okunur?" },
          },
          { text: "Tam idrar tahlili: böbrek fonksiyonu, idrar yolu sorunları ve şeker için tamamlayıcı bilgi." },
          { text: "Dışkı incelemesi: özellikle yavrularda ve yeni sahiplenilen dostlarda parazit taraması." },
          { text: "Röntgen veya ultrason: muayenede kalp, akciğer ya da karın içiyle ilgili bir bulgu varsa." },
          { text: "Özel testler: gerektiğinde dış laboratuvara gönderilir; sonucun ne zaman çıkacağını önceden söyleriz." },
        ],
      },
      {
        h2: "Yaşlı kedi ve köpekte check-up",
        paragraphs: [
          "Yaşlanan kedi ve köpeklerde böbrek hastalığı, tiroid sorunları, diş hastalığı, eklem ağrısı ve kalp hastalıkları daha sık görülür; çoğu da sinsi başlar. AAFP'nin 2021 yaşlı kedi rehberi, yaş ilerledikçe tetkik sıklığının artırılmasını önerir. Tahlilleri bir önceki sonuçla karşılaştırarak yorumlarız.",
          "Su tüketiminde artış, kilo kaybı, tuvalet alışkanlığında değişiklik, merdivenden kaçınma ya da gece huzursuzluğu gibi gözlemleriniz bu dönemde muayenenin en değerli parçasıdır.",
        ],
        links: [
          { href: "/blog/yasli-kedide-yillik-kontrol-hangi-testler/", label: "Yaşlı kedide yıllık kontrol" },
          { href: "/blog/yasli-kedi-kopek-bakimi/", label: "Yaşlı kedi ve köpek bakımı" },
        ],
      },
      {
        h2: "Yavru kedi ve köpeğin ilk veteriner ziyareti",
        paragraphs: [
          "Yeni bir yavru sahiplendiyseniz ilk ziyareti ilk günlerde planlamanızı öneririz. Bu ziyarette baştan ayağa muayene, kilo ve beslenme değerlendirmesi, iç ve dış parazit kontrolü ile aşı takviminin başlangıcını konuşuruz. Yavru kedilerde FeLV ve FIV testinin gerekip gerekmediğini, kısırlaştırma zamanlamasını ve mikroçip kaydını da aynı görüşmede planlarız.",
          "AAHA/AAFP rehberi, ilk ziyaretin yavru için korkutucu olmamasına dikkat çeker; bu yüzden ilk muayeneyi acele etmeden yürütürüz.",
        ],
        links: [
          { href: "/hizmetler/asilama-mikrocip/", label: "Aşılama ve mikroçip" },
          { href: "/blog/kedilerde-felv-fiv-testi-ne-zaman/", label: "FeLV ve FIV testi ne zaman?" },
          { href: "/blog/yavru-kopek-bakim-rehberi/", label: "Yavru köpek bakım rehberi" },
        ],
      },
    ],
    covers: [
      "Baştan ayağa fizik muayene: göz, kulak, ağız, deri ve tüy örtüsü",
      "Kalp ve akciğerlerin dinlenmesi, nabız ve solunum değerlendirmesi",
      "Karın bölgesinin elle muayenesi ve lenf düğümlerinin kontrolü",
      "Vücut ağırlığı, vücut kondisyon skoru ve kilo seyrinin takibi",
      "Aşı ve parazit koruma takviminin gözden geçirilmesi",
      "Yaşa ve yaşam tarzına göre kişiselleştirilmiş kontrol planı",
    ],
    visit: [
      {
        step: "Öykü alma",
        text: "İştah, su tüketimi, tuvalet alışkanlıkları, enerji düzeyi ve evde fark ettiğiniz değişiklikleri konuşarak başlarız. Bu bilgiler muayenenin yönünü belirler.",
      },
      {
        step: "Fizik muayene",
        text: "Hekimimiz dostunuzu sakin bir tempoda, sistem sistem değerlendirir. Kedilerde stresi azaltmak için taşıma çantasından kendi hızında çıkmasına izin veririz.",
      },
      {
        step: "Bulguların paylaşılması",
        text: "Muayenede gördüklerimizi sade bir dille anlatırız. Ek tetkik gerekiyorsa neden gerektiğini ve neyi ayırt etmeye çalıştığımızı açıklarız.",
      },
      {
        step: "Plan ve takip",
        text: "Aşı, parazit koruması, beslenme veya bir sonraki kontrol için birlikte bir takvim çıkarırız. Sorularınızı yanıtlamadan görüşmeyi bitirmeyiz.",
      },
    ],
    prepare: [
      "Varsa aşı karnesi, önceki tahlil sonuçları ve kullanılan ürünlerin kutuları",
      "Kullanılan mamanın adı ve günlük verilen miktar",
      "Kedileri kapalı taşıma çantasıyla, köpekleri kısa tasmayla getirin",
      "Evde çektiğiniz kısa videolar (topallama, öksürük, nöbet benzeri durumlar) çok yardımcı olur",
      "Tahlil ihtimali varsa aç gelmeniz gerekip gerekmediğini randevu sırasında bize sorun",
    ],
    faqs: [
      {
        q: "Sağlıklı görünen bir kediyi veya köpeği ne sıklıkla kontrole getirmeliyim?",
        a: "Genel yaklaşım, sağlıklı yetişkin dostlar için yılda en az bir kez tam kontroldür. Yavrularda aşı dönemi boyunca daha sık, yaşlı dostlarda ve kronik hastalığı olanlarda ise daha yakın aralıklarla görüşmek gerekir. Uygun sıklığı dostunuzun yaşı, ırkı ve mevcut bulguları belirler; bunu muayenede birlikte netleştiririz.",
      },
      {
        q: "Yaşlı kedim veya köpeğim için check-up ne zaman sıklaşmalı?",
        a: "Kedilerde AAHA/AAFP rehberi 10 yaş üstünü yaşlı dönem kabul eder ve bu dönemde en az altı ayda bir kontrol önerir. Köpeklerde yaşlılık ırkın beklenen ömrüne göre değişir; iri ırklarda daha erken başlar. Kronik bir hastalık varsa aralığı hastalığın seyrine göre birlikte belirleriz.",
      },
      {
        q: "Yavru kedimi ilk kez ne zaman veterinere getirmeliyim?",
        a: "Sahiplendikten sonraki ilk günlerde getirmenizi öneririz; evde başka kedi varsa onlarla tanıştırmadan önce. İlk muayenede genel sağlık, parazit durumu ve aşı planı çıkarılır. Yavrunun iştahsızlık, ishal, kusma ya da halsizlik gibi bir belirtisi varsa randevu beklemeden gelin; kliniğimiz 7/24 açık.",
      },
      {
        q: "Hiçbir şikâyetim yokken check-up gerçekten gerekli mi?",
        a: "Kediler ve köpekler, özellikle kediler, ağrıyı ve halsizliği uzun süre saklayabilir. Check-up dostunuzun normal değerlerini kayıt altına alır; ilerideki bir kontrolde küçük bir değişikliği fark etmeyi kolaylaştırır.",
      },
      {
        q: "Muayene ne kadar sürer?",
        a: "Rutin bir genel muayene çoğunlukla 20-30 dakika sürer. Öykü karmaşıksa, birden fazla şikâyet varsa ya da aynı seansta tahlil alınacaksa süre uzayabilir. Randevu alırken şikâyetinizi kısaca aktarırsanız size uygun uzunlukta bir zaman ayırabiliriz.",
      },
      {
        q: "Check-up'ta mutlaka kan tahlili yapılır mı?",
        a: "Hayır, tahlil otomatik bir adım değildir. Fizik muayene bulguları, dostunuzun yaşı ve öyküsü tahlile ihtiyaç olup olmadığını belirler. Yaşlı dostlarda ve anestezi planlanan durumlarda tahlil çok daha sık gündeme gelir. Önerdiğimizde gerekçesini açıklarız, karar her zaman sizindir.",
      },
      {
        q: "Kedim veteriner ziyaretinde çok stres oluyor, ne yapabilirim?",
        a: "Taşıma çantasını ziyaretten günler önce evde açık bırakmak, içine tanıdık kokulu bir örtü koymak ve çantayı üstü örtülü taşımak stresi azaltır. Ziyaretin zor geçtiğini önceden bildirirseniz buna göre planlama yaparız.",
      },
    ],
    access: {
      text: `Kliniğimiz tek adreste, ${site.address.full} adresindedir. Çankaya'nın tüm semtlerinden ve Ankara'nın diğer ilçelerinden check-up için 7/24 gelebilirsiniz.`,
      links: accessLinks,
    },
    sources: [
      {
        title: "2021 AAHA/AAFP Feline Life Stage Guidelines",
        publisher: "American Animal Hospital Association / American Association of Feline Practitioners",
        url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/feline-life-stage-2021/2021-aaha-aafp-feline-life-stage-guidelines.pdf",
      },
      {
        title: "2019 AAHA Canine Life Stage Guidelines",
        publisher: "American Animal Hospital Association",
        url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/canine-life-stage-2019/2019-aaha-canine-life-stage-guidelines-final.pdf",
      },
      {
        title: "2021 AAFP Feline Senior Care Guidelines",
        publisher: "Journal of Feline Medicine and Surgery",
        url: "https://pubmed.ncbi.nlm.nih.gov/34167339/",
      },
    ],
    relatedPosts: [
      "evcil-hayvan-check-up-neleri-kapsar",
      "yasli-kedide-yillik-kontrol-hangi-testler",
      "yasli-kedi-kopek-bakimi",
      "kan-tahlili-sonucu-nasil-okunur",
      "kedilerde-felv-fiv-testi-ne-zaman",
      "yavru-kopek-bakim-rehberi",
    ],
  },
  {
    slug: "asilama-mikrocip",
    icon: Syringe,
    title: "Aşılama & Mikroçip",
    desc: "Koruyucu aşı takvimi ve yasal mikroçip ile kalıcı kimliklendirme.",
    h1: "Kedi ve Köpek Aşı Takvimi, Kuduz Aşısı ve Mikroçip",
    metaTitle: "Kedi ve Köpek Aşı Takvimi, Mikroçip · Çankaya Ankara",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpek aşı takvimi, kuduz aşısı ve mikroçip. Hangi aşılar zorunlu, PETVET kaydı nasıl yapılır? Ankara'da 7/24 açık klinik.",
    keywords: [
      "kedi aşı takvimi",
      "köpek aşı takvimi",
      "kuduz aşısı zorunlu mu",
      "mikroçip zorunlu mu",
      "PETVET kaydı Ankara",
      "kedi köpek aşı Çankaya",
      "mikroçip Ankara veteriner",
    ],
    intro:
      "Kedi ve köpek aşılarını ve mikroçip uygulamasını Çankaya Öveçler'deki kliniğimizde, kısa bir muayenenin ardından yapıyoruz; kliniğimiz 7/24 açık olduğu için hafta sonu da gelebilirsiniz. Aşılama bulaşıcı hastalıklara karşı korunmanın temel yoludur; mikroçip ise dostunuz kaybolduğunda size geri dönmesini sağlayan kalıcı kimliğidir. Türkiye'de kedi ve köpeklerin mikroçiple kimliklendirilip resmî sisteme kaydedilmesi ve kuduza karşı aşılanması yasal yükümlülüktür.",
    sections: [
      {
        h2: "Kedi ve köpek aşı takvimi nasıl kurulur?",
        paragraphs: [
          "Dünya Küçük Hayvan Veteriner Hekimleri Birliği'nin (WSAVA) 2024 aşı rehberi aşıları üç gruba ayırır: her kedi ve köpeğin alması gereken çekirdek aşılar, yaşam tarzına ve bölgeye göre önerilen çekirdek dışı aşılar ve önerilmeyenler. Köpeklerde çekirdek aşılar gençlik hastalığı (distemper), adenovirüs ve parvovirüse; kedilerde panlökopeni, calicivirüs ve herpesvirüse karşı koruma sağlar. Kuduzun görüldüğü ülkelerde kuduz aşısı her iki tür için de çekirdek kabul edilir.",
          "Yavrularda aşılama birkaç haftalık yaşta başlar ve birkaç hafta arayla tekrarlanan bir seri hâlinde ilerler; WSAVA, yavru serisinin son dozunun 16 haftalık ya da daha büyük yaşta yapılmasını önerir. Seriyi bir pekiştirme dozu izler. Sonraki yıllarda hangi aşının hangi aralıkla tekrarlanacağı aşının türüne göre değişir: rehbere göre bazı çekirdek aşılar her yıl değil daha uzun aralıklarla, çekirdek dışı aşılar ise çoğunlukla yıllık yapılır.",
          "Çekirdek dışı aşılarda karar yaşam tarzına bağlıdır; dışarı çıkan bir kedi ile hiç dışarı çıkmayan tek bir kedi aynı riski taşımaz. Kesin takvimi ilk muayenede çıkarırız.",
        ],
        links: [
          { href: "/blog/kedi-asi-takvimi/", label: "Kedi aşı takvimi" },
          { href: "/blog/kopek-asi-takvimi/", label: "Köpek aşı takvimi" },
        ],
      },
      {
        h2: "Kuduz aşısı zorunlu mu?",
        paragraphs: [
          "Evet. Kuduz Hastalığından Korunma ve Kuduz Hastalığı ile Mücadele Yönetmeliği'ne göre üç aydan büyük kedi ve köpeklerin sahipleri, hayvanlarını yılda bir kez kuduza karşı aşılatmakla yükümlüdür ve aşı kayıtlarının tutulması zorunludur. Bu yükümlülük evden hiç çıkmayan kediler için de geçerlidir. Kuduz insanlara da bulaşabildiği için aşı ailenizi de korur. Yurt dışı seyahatinde ise kuduz aşısına ek olarak gidilecek ülkeye göre kuduz antikor testi istenebilir.",
        ],
        links: [{ href: "/blog/pet-pasaportu-favn-testi-ankara/", label: "Pet pasaportu ve FAVN testi" }],
      },
      {
        h2: "Mikroçip zorunlu mu? PETVET kaydı nasıl yapılır?",
        paragraphs: [
          "Evet. 5199 sayılı Hayvanları Koruma Kanunu'na göre kedi ve köpek sahipleri, hayvanlarını dijital kimliklendirme yöntemleriyle kayıt altına aldırmakla yükümlüdür; kanunun geçici maddesiyle tanınan süre 31 Aralık 2025'te doldu. Kayıtlar, Tarım ve Orman Bakanlığı'nın Ev Hayvanı Kayıt Sistemi PETVET üzerinden tutulur.",
          "Kedi, Köpek ve Gelinciklerin Kimliklendirilmesi ve Kayıt Altına Alınmasına Dair Yönetmelik'e göre yeni doğan bir hayvanın sahibi, doğumdan itibaren en geç altı ay içinde başvuru yapmakla yükümlüdür. Mikroçip uygulanan hayvana pasaport düzenlenir ve kayıt on beş gün içinde yetkili veteriner hekim tarafından veri tabanına işlenir. Çipin takılmış olması tek başına yetmez; belirleyici olan kaydın sisteme işlenmesidir.",
        ],
        after:
          "Kayıt için kimlik bilginizi, güncel adres ve telefonunuzu, varsa önceki çip numarasını ve aşı karnesini getirin. Taşındığınızda kaydı güncel tutmak sahibin sorumluluğundadır.",
        links: [
          { href: "/blog/mikrocip-cezasi-ve-petvet-2026/", label: "Mikroçip cezası ve PETVET kaydı" },
          { href: "/blog/mikrocip-ve-yasal-sorumluluklar/", label: "Mikroçip ve yasal sorumluluklar" },
        ],
      },
    ],
    covers: [
      "Yaşa ve yaşam tarzına göre planlanan çekirdek ve ek aşı takvimi",
      "Kuduz aşısı uygulaması ve kayıt altına alınması",
      "Mikroçip yerleştirme ve okuyucu ile doğrulama",
      "Resmî kayıt sistemine işlenmesi ve kimlik belgesinin düzenlenmesi",
      "Yurt dışı seyahat planı varsa gereken belgelerin önceden konuşulması",
    ],
    visit: [
      {
        step: "Aşı öncesi kontrol",
        text: "Aşı yapılmadan önce kısa bir muayene yaparız. Ateş, iştahsızlık ya da aktif bir enfeksiyon varsa aşıyı ertelemek daha doğru olur; bunu birlikte değerlendiririz.",
      },
      {
        step: "Takvimin gözden geçirilmesi",
        text: "Aşı karnesine bakarak hangi dozların yapıldığını, hangilerinin zamanı geldiğini çıkarırız. Karne yoksa öyküye göre uygun bir başlangıç planı kurarız.",
      },
      {
        step: "Uygulama",
        text: "Aşı ve varsa mikroçip uygulanır; mikroçip ense bölgesine yerleştirilir ve okuyucuyla hemen doğrulanır.",
      },
      {
        step: "Kayıt ve gözlem önerisi",
        text: "Karneyi güncelleriz, mikroçip numarasını kayıt sistemine işleriz. Uygulama sonrası ilk saatlerde nelere dikkat etmeniz gerektiğini anlatırız.",
      },
    ],
    prepare: [
      "Aşı karnesi ya da varsa önceki kliniğin kayıtları",
      "Mikroçip daha önce takıldıysa numarasını gösteren belge",
      "Dostunuzun son günlerdeki iştah ve genel durumu hakkında kısa bilgi",
      "Yurt dışı seyahat planınız varsa tarihini önceden bildirin; bazı işlemler aylar öncesinden başlar",
      "Aşı sonrası dostunuzun sakin bir ortamda dinlenebileceği bir gün planlayın",
    ],
    faqs: [
      {
        q: "Yavru kedi ve köpeklerde aşılara ne zaman başlanır?",
        a: "Yavrularda aşılama birkaç haftalık yaşta başlar ve aralıklarla tekrarlanan bir seri hâlinde sürer; WSAVA rehberine göre son doz 16 haftalık ya da daha büyük yaşta yapılır. Kesin takvimi ilk muayenede çıkarırız.",
      },
      {
        q: "Kuduz aşısı yaptırmak zorunlu mu?",
        a: "Evet. Üç aydan büyük kedi ve köpekler yılda bir kez kuduza karşı aşılanmalı ve aşı kaydı tutulmalıdır; evden çıkmayan kediler de buna dâhildir.",
      },
      {
        q: "Mikroçip taktırmak zorunlu mu?",
        a: "Evet. 5199 sayılı Kanun'a göre kedi ve köpeklerin kayıt altına alınması zorunludur ve tanınan süre 31 Aralık 2025'te doldu. Kayıt yaptırılmaması idari yaptırıma konu olabilir; süreyi kaçırdıysanız kaydı bir an önce tamamlatın.",
      },
      {
        q: "Çipi var ama PETVET kaydı olup olmadığını bilmiyorum, ne yapmalıyım?",
        a: "Dostunuzu kliniğe getirin; çipi okuyucuyla okutur, numaranın sistemde kayıtlı olup olmadığını kontrol ederiz. Çip takılı olup kayıt yoksa hayvan sistem açısından kayıtsız sayılır; eksik adımı aynı ziyarette tamamlayabiliriz.",
      },
      {
        q: "Mikroçip takılması dostuma acı verir mi?",
        a: "Mikroçip, biraz kalınca bir iğneyle deri altına yerleştirilir; çoğu kedi ve köpek bunu kısa bir aşı gibi karşılar. Anestezi gerektirmez; kısırlaştırma planlanıyorsa aynı seansta da yapılabilir.",
      },
      {
        q: "Aşıdan sonra dostumda ne gibi tepkiler görebilirim?",
        a: "Aşı sonrası ilk gün hafif yorgunluk, iştahta geçici azalma ya da aşı yerinde küçük bir hassasiyet görülebilir; bunlar genellikle kısa sürede geçer. Yüzde şişlik, kusma, kaşıntı ya da solunum güçlüğü nadirdir ama beklenmez; böyle bir durumda vakit kaybetmeden bizi arayın.",
      },
      {
        q: "Evden hiç çıkmayan kedimin aşıya ihtiyacı var mı?",
        a: "Evet. Bazı etkenler ayakkabı ya da kıyafetle eve taşınabilir ve kuduz aşısı yasal bir yükümlülüktür. Diğer aşıları kedinizin yaşam tarzına göre birlikte belirleriz.",
      },
      {
        q: "Aşı tarihini kaçırdım, baştan mı başlamak gerekir?",
        a: "Her gecikme baştan başlamayı gerektirmez; ne kadar gecikildiği, hangi aşının atlandığı ve dostunuzun yaşı belirleyicidir. Karnenizi getirin, mevcut durumdan devam edilebilecek en makul planı çıkaralım.",
      },
    ],
    access: {
      text: `Kliniğimiz ${site.address.full} adresindedir; Çankaya'nın tüm semtlerinden ve Ankara'nın diğer ilçelerinden aşı ve mikroçip için hafta sonu dâhil gelebilirsiniz.`,
      links: accessLinks,
    },
    sources: [
      {
        title: "2024 guidelines for the vaccination of dogs and cats",
        publisher: "WSAVA Vaccination Guidelines Group (Journal of Small Animal Practice)",
        url: "https://wsava.org/wp-content/uploads/2024/04/WSAVA-Vaccination-guidelines-2024.pdf",
      },
      {
        title: "5199 sayılı Hayvanları Koruma Kanunu",
        publisher: "Mevzuat Bilgi Sistemi",
        url: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5199.pdf",
      },
      {
        title: "Kedi, Köpek ve Gelinciklerin Kimliklendirilmesi ve Kayıt Altına Alınmasına Dair Yönetmelik",
        publisher: "Mevzuat Bilgi Sistemi",
        url: "https://www.mevzuat.gov.tr/MevzuatMetin/yonetmelik/7.5.24414.pdf",
      },
      {
        title: "Kuduz Hastalığından Korunma ve Kuduz Hastalığı ile Mücadele Yönetmeliği",
        publisher: "Resmî Gazete (18 Ocak 2012)",
        url: "https://resmigazete.gov.tr/eskiler/2012/01/20120118-3.htm",
      },
      {
        title: "Ev Hayvanlarının Kayıt Altına Alınması Çalışmaları Devam Ediyor (PETVET)",
        publisher: "T.C. Tarım ve Orman Bakanlığı",
        url: "https://www.tarimorman.gov.tr/Haber/5642/Ev-Hayvanlarinin-Kayit-Altina-Alinmasi-Calismalari-Devam-Ediyor",
      },
    ],
    relatedPosts: [
      "kedi-asi-takvimi",
      "kopek-asi-takvimi",
      "asi-sonrasi-yan-etkiler-ne-normal",
      "mikrocip-cezasi-ve-petvet-2026",
      "mikrocip-ve-yasal-sorumluluklar",
      "pet-pasaportu-favn-testi-ankara",
    ],
  },
  {
    slug: "kisirlastirma-cerrahi",
    icon: Scissors,
    title: "Kısırlaştırma & Cerrahi",
    desc: "Steril ortamda, anestezi takibiyle güvenli ve titiz operasyonlar.",
    h1: "Çankaya'da Kedi ve Köpek Kısırlaştırma ve Cerrahi",
    metaTitle: "Kedi ve Köpek Kısırlaştırma · Çankaya Öveçler, Ankara",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpek kısırlaştırma: ne zaman yapılır, ameliyat öncesi açlık, ameliyat günü, dikiş, yaka ve iyileşme. 7/24 açık klinik.",
    keywords: [
      "kedi kısırlaştırma Ankara",
      "kedi kısırlaştırma Çankaya",
      "köpek kısırlaştırma Ankara",
      "kısırlaştırma ne zaman yapılır",
      "ameliyat öncesi açlık kedi köpek",
      "dişi kedi kısırlaştırma sonrası bakım",
      "veteriner cerrahi Çankaya",
    ],
    intro:
      "Kedi ve köpek kısırlaştırmasını Çankaya Öveçler'deki kliniğimizde, önceden planlanan bir randevuyla yapıyoruz; kliniğimiz 7/24 açık olduğu için ameliyattan sonraki gece de telefonla bize ulaşabilirsiniz. Kısırlaştırma, istenmeyen yavruların önüne geçen ve bazı üreme sistemi hastalıklarının riskini azaltan planlı bir operasyondur.",
    sections: [
      {
        h2: "Kısırlaştırma ne zaman yapılır?",
        paragraphs: [
          "Tek bir doğru yaş yoktur; zamanlama türe, ırka, beklenen erişkin boyuta ve sağlık durumuna göre belirlenir. Kedi refahı kuruluşu International Cat Care, kedilerin cinsel olgunluğa ulaşmadan, rutin olarak dört ay civarında kısırlaştırılmasını önerir. Dişi kediler erken yaşta kızgınlığa girebildiği için yavru kedi sahiplendiyseniz konuyu aşı ziyaretlerinde konuşmak pratik bir yoldur.",
          "Köpeklerde Amerikan Hayvan Hastaneleri Birliği'nin (AAHA) 2019 yaşam dönemi rehberi, erişkinde yaklaşık 20 kilonun altında kalması beklenen köpekler için genellikle 5–6 aylık dönemi işaret eder. Bundan iri olması beklenen erkek köpeklerde ise büyümenin tamamlanmasını, çoğunlukla 9–15 ay arasını önerir. İri ırk dişilerde karar; kızgınlık, meme tümörü riski ve eklem sağlığı birlikte tartılarak bireysel verilir. Kızgınlıktaki ya da yeni doğum yapmış bir dişide zamanlamayı ayrıca değerlendiririz.",
        ],
        links: [{ href: "/blog/kisirlastirma-rehberi/", label: "Kısırlaştırma hakkında bilmeniz gerekenler" }],
      },
      {
        h2: "Ameliyattan önce nasıl hazırlanılır?",
        paragraphs: [
          "Operasyondan önce dostunuzu muayene eder, kilosunu alır ve yaşa ve öyküye göre anestezi öncesi kan tahlili öneririz. Kullandığı ilaç ve takviyeleri bu görüşmede mutlaka belirtin.",
          "Ameliyat öncesi açlıkta eski “bütün gece aç bırakın” alışkanlığı değişti. AAHA'nın 2020 anestezi rehberi, sağlıklı yetişkinlerde önerilen açlık süresinin kısaldığını belirtir; rehberin açlık tablosunda sağlıklı yetişkin kedi ve köpekler için birkaç saatlik (yaklaşık 4–6 saat) mama kesintisi yer alır ve su genellikle kesilmez. Çok küçük yavrularda ve şeker hastalarında açlık daha da kısa tutulur. Size özel saati randevuda veririz; dostunuz yanlışlıkla yemek yediyse saklamadan söyleyin.",
        ],
        links: [
          { href: "/blog/anestezi-oncesi-ac-kalma-suresi/", label: "Anestezi öncesi aç kalma süresi" },
          { href: "/blog/ameliyat-oncesi-kan-tahlili/", label: "Ameliyat öncesi kan tahlili" },
        ],
      },
      {
        h2: "Ameliyat günü",
        paragraphs: [
          "Kliniğe geldiğinizde son bir kontrol yapar, sürecin nasıl işleyeceğini ve size ne zaman haber vereceğimizi anlatırız. Operasyon steril koşullarda yapılır; anestezi boyunca solunum, kalp ritmi ve vücut ısısı kesintisiz izlenir. Dostunuz sakin bir bölümde, gözlem altında uyanır; ağrı yönetimini önceden planlarız.",
        ],
      },
      {
        h2: "Eve dönüş: dikiş, yaka ve iyileşme",
        list: [
          { text: "İlk gece uyuşukluk ve hafif dengesizlik beklenebilir; sakin, sıcak ve kaygan olmayan bir alan hazırlayın." },
          { text: "İlk öğünü ve suyu taburculukta söylediğimiz şekilde verin; iştah çoğu zaman ertesi gün toparlanır." },
          { text: "Dikiş yerini yalamak en sık sorun nedenidir; koruyucu yaka ya da vücut örtüsünü kontrol gününe kadar çıkarmayın." },
          { text: "Koşma, zıplama ve merdiveni kontrol gününe kadar kısıtlayın; köpekleri yalnızca kısa, tasmalı yürüyüşe çıkarın." },
          { text: "Dikiş yerine günde bir iki kez bakın; banyo yaptırmayın, yaraya krem veya sprey sürmeyin." },
          {
            text: "İlaçları yalnızca verdiğimiz şekilde kullanın; insan ilaçları kedi ve köpekler için tehlikeli olabilir.",
            link: { href: "/blog/ameliyat-sonrasi-evde-bakim/", label: "Ameliyat sonrası evde bakım" },
          },
        ],
        after:
          "Dişi kedi kısırlaştırma sonrası bakımda en sık sorulan konu yakadır: kediler esnek olduğu için yakayı çıkarmaya ya da örtünün altından yaraya ulaşmaya çalışabilir. International Cat Care, dişi kedilerde dikişlerin gerekirse 7–10 gün sonra alınabileceğini belirtir; kullanılan dikiş tekniğine göre bu adım bazen gerekmez.",
      },
      {
        h2: "Kontrol randevusu",
        paragraphs: [
          "Taburculukta kontrol tarihini yazılı olarak veririz. Kontrolde dikiş hattına ve yara iyileşmesine bakar, gerekiyorsa dikişleri alırız. Dikiş yerinde açılma, akıntı, inatçı kusma ya da belirgin halsizlik görürseniz kontrol gününü beklemeyin; gece de olsa arayın.",
        ],
      },
    ],
    covers: [
      "Ameliyat öncesi fizik muayene ve risk değerlendirmesi",
      "Dişilerde ve erkeklerde kısırlaştırma operasyonları",
      "Steril ortamda gerçekleştirilen diğer yumuşak doku cerrahileri",
      "Anestezi boyunca solunum, kalp ritmi ve vücut ısısı takibi",
      "Dikiş kontrolü, yara bakımı ve taburculuk sonrası takip randevusu",
    ],
    visit: [
      {
        step: "Ön görüşme ve değerlendirme",
        text: "Dostunuzu muayene eder, yaşını, kilosunu ve varsa kronik sorunlarını değerlendiririz. Gerekiyorsa anestezi öncesi tahlil planlarız.",
      },
      {
        step: "Kliniğe geliş",
        text: "Açlık talimatına uyarak gelirsiniz; son kontrolün ardından dostunuzu teslim alırız.",
      },
      {
        step: "Operasyon ve anestezi takibi",
        text: "Operasyon steril koşullarda yapılır; ekip anestezi ve cerrahi için ayrı ayrı görevlidir.",
      },
      {
        step: "Uyanma ve taburculuk",
        text: "Yara bakımını, kısıtlanması gereken hareketleri ve kontrol tarihini yazılı olarak paylaşırız.",
      },
    ],
    prepare: [
      "Aç kalma süresini randevu sırasında mutlaka teyit edin; su konusunda ayrı talimat veririz",
      "Aşı karnesi ve varsa önceki tahlil sonuçlarınızı getirin",
      "Kullanılan tüm ilaç ve takviyeleri, kutularıyla birlikte bildirin",
      "Operasyon sonrası ilk gün evde birinin bulunabileceği bir tarih seçin",
    ],
    faqs: [
      {
        q: "Kısırlaştırma için uygun yaş nedir?",
        a: "Tek bir sayı yoktur. Kedilerde dört ay civarı önerilir; köpeklerde zamanlama beklenen erişkin boyuta göre değişir. Muayenede dostunuza özel bir zaman aralığı öneririz.",
      },
      {
        q: "Ameliyattan önce kaç saat aç kalmalı, su verilir mi?",
        a: "Sağlıklı yetişkinlerde AAHA rehberi yaklaşık 4–6 saatlik açlık çerçevesi sunar ve su genellikle kesilmez. Yavrularda ve şeker hastalarında plan değişir; kesin saati randevuda veririz.",
      },
      {
        q: "Anestezi riskli mi?",
        a: "Her anestezinin bir riski vardır ve sıfırlanamaz. Riski azaltmak için ameliyat öncesi muayene yapar, gerektiğinde kan tahlili ister ve anestezi süresince yaşamsal değerleri izleriz. Yaş veya mevcut bir hastalık riski etkiliyorsa bunu önceden açıkça konuşuruz.",
      },
      {
        q: "Erkek ve dişi kısırlaştırma arasında fark var mı?",
        a: "Evet. Erkeklerde operasyon karın boşluğu açılmadan yapılır ve iyileşme genellikle daha hızlıdır. Dişilerde operasyon karın içinden yapıldığı için hareket kısıtlaması ve yara takibi daha önemlidir. Testisi karın içinde kalmış erkeklerde operasyon farklılaşır; bunu ön muayenede kontrol ederiz.",
      },
      {
        q: "Kısırlaştırma sonrası yaka ne kadar takılı kalmalı?",
        a: "Yaka ya da vücut örtüsü, dikiş hattı iyileşip kontrolde onay verene kadar takılı kalmalıdır. Kısa süreli gözetimsiz yalama bile dikişi açabilir. Dostunuz yakayla yiyip içemiyorsa çıkarmak yerine bizi arayın.",
      },
      {
        q: "Operasyondan sonra iyileşme ne kadar sürer?",
        a: "Çoğu kedi ve köpek ilk günlerde belirgin şekilde toparlanır; dikiş hattının iyileşmesi ise operasyonun türüne, yaşa ve hareketin ne kadar kısıtlanabildiğine göre değişir. Taburculukta net bir takip takvimi veririz.",
      },
      {
        q: "Kısırlaştırma dostumu kilo aldırır mı?",
        a: "Kısırlaştırma sonrası enerji ihtiyacı düşebilir; eski porsiyon devam ederse kilo artışı görülebilir. Kontrolde porsiyon ve mama planını birlikte güncelleriz.",
      },
      {
        q: "Ameliyattan sonra hangi belirtiler beni aramaya yönlendirmeli?",
        a: "Dikiş yerinde açılma, artan kızarıklık veya akıntı, inatçı kusma, hiç yememe, aşırı halsizlik ya da geçmeyen ağrı belirtileri bekleyecek durumlar değildir. Böyle bir durumda kontrol tarihini beklemeden bizi arayın; 7/24 ulaşabilirsiniz.",
      },
    ],
    access: {
      text: `Ameliyat ve kontrol randevuları için kliniğimiz ${site.address.full} adresindedir. Çankaya'nın tüm semtlerinden ve Ankara'nın diğer ilçelerinden gelen dostlarımızı kabul ediyoruz; ameliyat sonrasında da 7/24 telefonla ulaşabilirsiniz.`,
      links: accessLinks,
    },
    sources: [
      {
        title: "Neutering your cat",
        publisher: "International Cat Care",
        url: "https://icatcare.org/advice/neutering-your-cat/",
      },
      {
        title: "2019 AAHA Canine Life Stage Guidelines",
        publisher: "American Animal Hospital Association",
        url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/canine-life-stage-2019/2019-aaha-canine-life-stage-guidelines-final.pdf",
      },
      {
        title: "2020 AAHA Anesthesia and Monitoring Guidelines for Dogs and Cats",
        publisher: "American Animal Hospital Association",
        url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/anesthesia_and_monitoring_guidelines_final.pdf",
      },
      {
        title: "Fasting and Treatment Recommendations for Dogs and Cats Prior to Anesthesia",
        publisher: "American Animal Hospital Association",
        url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2020-anesthesia/aahaanesthesiaguidelines_fastingandtreatmentrecommendations.pdf",
      },
    ],
    relatedPosts: [
      "kisirlastirma-rehberi",
      "anestezi-oncesi-ac-kalma-suresi",
      "ameliyat-oncesi-kan-tahlili",
      "ameliyat-sonrasi-evde-bakim",
      "kedim-ameliyat-olacak-anestezi-guvenli-mi",
      "kopeklerde-kizginlik-donemi-ve-yalanci-gebelik",
    ],
  },
  {
    slug: "dis-sagligi",
    icon: Sparkles,
    title: "Diş Sağlığı",
    desc: "Diş taşı temizliği, ağız bakımı ve düzenli diş kontrolleri.",
    h1: "Diş Sağlığı ve Ağız Bakımı",
    metaTitle: "Diş Sağlığı & Diş Taşı Temizliği · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpeklerde diş taşı temizliği, ağız muayenesi ve evde diş bakımı. Diş hastalıklarının belirtileri ve kontrol süreci.",
    keywords: [
      "kedi köpek diş taşı temizliği Çankaya",
      "veteriner diş Ankara",
      "evcil hayvan ağız sağlığı",
      "Öveçler veteriner diş bakımı",
    ],
    intro:
      "Ağız sağlığı, evcil hayvanlarda en sık gözden kaçan alanlardan biridir. Diş eti iltihabı ve diş taşı birikimi yavaş ilerler; dostunuz genellikle yemeye devam ettiği için sorun uzun süre fark edilmez. Düzenli ağız muayenesi, hem rahatsızlığı erken yakalamayı hem de evde uygulanabilir bir bakım rutini kurmayı mümkün kılar.",
    covers: [
      "Diş etleri, diş yüzeyleri ve ağız içi dokuların muayenesi",
      "Diş taşı ve plak birikiminin değerlendirilmesi",
      "Anestezi altında diş taşı temizliği ve yüzey parlatma",
      "Gerekli görülen durumlarda ağız içi röntgen değerlendirmesi",
      "Kırık, sallanan veya sorunlu dişlerin ele alınması",
      "Kedilerde diş eti ve ağız içi iltihaplarının değerlendirilmesi",
      "Evde diş fırçalama ve bakım rutininin birlikte planlanması",
    ],
    visit: [
      {
        step: "Ağız muayenesi",
        text: "Uyanık muayenede görülebilen kadarını değerlendiririz: diş eti rengi, tartar birikimi, kırık diş, koku ve hassasiyet. Bu ilk bakış, sonraki adımın gerekip gerekmediğini gösterir.",
      },
      {
        step: "Planın konuşulması",
        text: "Detaylı temizlik ve diş yüzeylerinin diş eti altındaki kısmının değerlendirilmesi anestezi gerektirir. Neden gerektiğini, süreci ve alternatifleri açıklarız.",
      },
      {
        step: "İşlem günü",
        text: "Anestezi öncesi kontrolün ardından temizlik yapılır, gerekiyorsa görüntüleme ile diş kökleri değerlendirilir. Yaşamsal değerler işlem boyunca izlenir.",
      },
      {
        step: "Sonrası ve ev bakımı",
        text: "İşlem sonrası ağız içinde neler yapıldığını anlatır, evde sürdürülebilir bir bakım rutini kurarız. Bir sonraki kontrol için tarih belirleriz.",
      },
    ],
    prepare: [
      "Ağız kokusu, yemek yerken duraklama veya tek taraflı çiğneme gibi gözlemlerinizi not edin",
      "Evde diş fırçalama denediyseniz nasıl karşılandığını aktarın",
      "Kullandığınız diş bakım ürünlerini ya da çiğneme ürünlerini bildirin",
      "İşlem anestezi gerektirecekse aç kalma talimatını randevuda netleştirin",
      "Yaşlı dostlarda önceki tahlil sonuçlarını yanınızda getirin",
    ],
    faqs: [
      {
        q: "Diş temizliği neden anestezi gerektiriyor?",
        a: "Diş taşının asıl sorun yaratan kısmı diş eti çizgisinin altında birikendir ve bu bölge ancak hareketsiz bir ağızda güvenle temizlenip değerlendirilebilir. Uyanık hayvanda yapılan yüzeysel kazıma dişi görsel olarak temizler ama alttaki sorunu bırakır, üstelik stresli ve riskli bir işlemdir.",
      },
      {
        q: "Dostumun diş sorunu olduğunu nasıl anlarım?",
        a: "Belirgin ağız kokusu, diş etlerinde kızarıklık, yemek yerken duraksama, tek taraflı çiğneme, salya artışı, ağzına dokundurtmama ya da sert mamayı bırakıp yumuşağa yönelme dikkat edilmesi gereken işaretlerdir. Bu belirtiler tanı koydurmaz; ne olduğunu ağız muayenesi gösterir.",
      },
      {
        q: "Kedimin dişlerini fırçalayabilir miyim?",
        a: "Birçok kedi, sabırlı ve kademeli bir alıştırma ile diş fırçalamayı kabul edebilir. Önemli olan aceleye getirmemek: önce parmakla ağız çevresine dokunma, sonra tada alıştırma, en son kısa süreli fırçalama. İnsanlar için üretilmiş diş macunları evcil hayvanlarda kullanılmaz.",
      },
      {
        q: "Diş temizliği ne sıklıkla gerekir?",
        a: "Sıklık dostunuzun ırkına, diş yapısına, beslenmesine ve evdeki bakım rutinine göre çok değişir. Bazı dostlarda yıllar geçebilirken, küçük ırk köpeklerde ve bazı kedilerde daha sık gerekebilir. Kontrollerde ağzı değerlendirip size gerçekçi bir aralık öneririz.",
      },
      {
        q: "Kuru mama dişleri temizler mi?",
        a: "Kuru mamanın tek başına diş taşını önlediği yönündeki yaygın inanış abartılıdır; çoğu kuru mama tanesi diş yüzeyine belirgin bir mekanik temizlik sağlamaz. Diş sağlığı için asıl fark yaratan, düzenli fırçalama ve periyodik ağız muayenesidir.",
      },
      {
        q: "Yaşlı bir kedi veya köpeğe diş işlemi yapılabilir mi?",
        a: "Yaş tek başına engel değildir; belirleyici olan dostunuzun genel sağlığı ve anesteziye uygunluğudur. Bu nedenle yaşlı dostlarda işlem öncesi değerlendirmeyi daha kapsamlı tutarız. Ağızdaki sorunun yarattığı rahatsızlık ile işlemin riskini birlikte tartıp karar veririz.",
      },
    ],
    relatedPosts: [
      "dis-tasi-ve-agiz-sagligi",
      "kedilerde-gingivostomatit-kok-hucre",
      "kedim-yemek-yemiyor",
      "yasli-kedi-kopek-bakimi",
      "ameliyat-oncesi-kan-tahlili",
    ],
  },
  {
    slug: "laboratuvar-goruntuleme",
    icon: Microscope,
    title: "Laboratuvar & Görüntüleme",
    desc: "Yerinde kan tahlili, dijital röntgen ve ultrason ile hızlı teşhis.",
    h1: "Laboratuvar ve Görüntüleme",
    metaTitle: "Laboratuvar & Görüntüleme · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de veteriner kan tahlili, dijital röntgen ve ultrason. Hangi tetkik ne zaman gerekir, sonuçlar ne kadar sürede çıkar.",
    keywords: [
      "Ankara veteriner ultrason",
      "veteriner röntgen Çankaya",
      "kedi köpek kan tahlili Ankara",
      "Öveçler veteriner laboratuvar",
    ],
    intro:
      "Fizik muayene çoğu zaman yön gösterir, ancak bazı soruların yanıtı ancak tahlil ve görüntüleme ile netleşir. Kliniğimizde kan tahlili, dijital röntgen ve ultrason ile değerlendirmeyi aynı ziyaret içinde yapabiliyoruz. Bu sayfada hangi tetkikin hangi soruyu yanıtladığını ve sürecin nasıl ilerlediğini anlatıyoruz.",
    covers: [
      "Yerinde kan sayımı ve biyokimya paneli çalışması",
      "Tam idrar tahlili ve gerekli görülen ek idrar incelemeleri",
      "Dışkı incelemesi ve parazit taraması",
      "Dijital röntgen ile kemik, akciğer ve karın değerlendirmesi",
      "Ultrason ile karın içi organların ayrıntılı incelenmesi",
      "Gebelik takibi ve organ boyutlarının izlenmesi",
      "Sonuçların muayene bulgularıyla birlikte yorumlanması",
    ],
    visit: [
      {
        step: "Tetkikin gerekçesi",
        text: "Hangi tetkiki neden istediğimizi, neyi ayırt etmeye çalıştığımızı açıklayarak başlarız. Gereksiz test istemekten kaçınırız; her tetkik bir soruyu yanıtlamalıdır.",
      },
      {
        step: "Örnek alma veya görüntüleme",
        text: "Kan alma kısa sürer. Röntgen ve ultrasonda dostunuzun sakin durması gerekir; çoğu durumda sedasyon gerekmez, gerekirse önce sizinle konuşuruz.",
      },
      {
        step: "Sonuçların değerlendirilmesi",
        text: "Yerinde çalışılan tahlillerin sonucu genellikle aynı ziyaret içinde çıkar. Sonuçları tek başına değil, muayene bulguları ve öykü ile birlikte yorumlarız.",
      },
      {
        step: "Planın kurulması",
        text: "Sonuçlar netleştikçe izleyeceğimiz yolu anlatırız: takip tahlili, ek görüntüleme ya da tedavi planı. Sonuç belgelerinizi sizinle paylaşırız.",
      },
    ],
    prepare: [
      "Kan tahlili planlanıyorsa aç gelme gerekip gerekmediğini randevuda sorun",
      "Ultrason için karın bölgesinde tıraş gerekebileceğini bilin",
      "Önceki tahlil ve görüntüleme sonuçlarını getirin; karşılaştırma çok değerlidir",
      "İdrar veya dışkı örneği istendiyse nasıl toplanacağını önceden bize danışın",
      "Kullanılan tüm ilaçları bildirin; bazıları tahlil sonuçlarını etkileyebilir",
    ],
    faqs: [
      {
        q: "Tahlil sonuçları ne kadar sürede çıkar?",
        a: "Kliniğimizde çalışılan kan sayımı ve biyokimya gibi temel tahlillerin sonucu çoğunlukla aynı ziyaret içinde alınabilir. Dış laboratuvara gönderilmesi gereken özel testlerde süre birkaç güne uzayabilir. Randevu sırasında hangi testin ne kadar süreceğini size söyleriz.",
      },
      {
        q: "Röntgen mi ultrason mu gerekli, nasıl karar veriliyor?",
        a: "İkisi farklı sorulara yanıt verir. Röntgen kemikleri, akciğer alanlarını ve organların genel yerleşimini göstermekte güçlüdür; ultrason ise organların iç yapısını ve karın içi sıvıyı değerlendirmede üstündür. Şikâyete göre biri, bazen de ikisi birlikte gerekir.",
      },
      {
        q: "Görüntüleme için dostuma anestezi verilecek mi?",
        a: "Çoğu röntgen ve ultrason, sakin bir hayvanda anestezi olmadan yapılabilir. Ağrı nedeniyle pozisyon verilemiyorsa, dostunuz aşırı stresliyse ya da net görüntü alınamıyorsa hafif sedasyon gündeme gelebilir. Böyle bir ihtiyaç doğarsa önce sizinle konuşur, onayınızı alırız.",
      },
      {
        q: "Tahlil sonuçlarında referans dışı bir değer çıkması hastalık anlamına gelir mi?",
        a: "Hayır. Referans aralığının biraz dışına çıkan tek bir değer, açlık durumu, stres, kısa süreli bir etki ya da laboratuvar değişkenliğinden kaynaklanabilir. Bu yüzden sonuçları muayene bulguları ve dostunuzun öyküsüyle birlikte okuruz, gerektiğinde tahlili tekrarlarız.",
      },
      {
        q: "Başka bir klinikte yapılan tahlilleri getirebilir miyim?",
        a: "Kesinlikle getirin. Önceki sonuçlar, bugünkü değerlerin dostunuz için normal mi yoksa değişim mi olduğunu anlamamızı sağlar. Tarihli ve okunabilir bir çıktı ya da fotoğraf yeterlidir.",
      },
      {
        q: "Ultrason için tıraş gerekli mi?",
        a: "Karın ultrasonunda net görüntü alabilmek için ilgili bölgenin tıraş edilmesi çoğunlukla gerekir; tüy, ses dalgalarının cilde ulaşmasını engeller. Tıraş edilen alan zamanla yeniden uzar. İşlemden önce size bilgi verir, onayınızı alırız.",
      },
    ],
    relatedPosts: [
      "evcil-hayvan-check-up-neleri-kapsar",
      "ameliyat-oncesi-kan-tahlili",
      "kedilerde-kronik-bobrek-hastaligi",
      "veterinerlikte-yapay-zeka-teshis",
      "kanserde-erken-tani-sivi-biyopsi",
    
      "kan-tahlili-sonucu-nasil-okunur",
      "kedi-ultrason-ne-zaman-gerekir-ankara",
    ],
  },
  {
    slug: "dermatoloji-dahiliye",
    icon: HeartPulse,
    title: "Dermatoloji & Dahiliye",
    desc: "Cilt ve iç hastalıklarında teşhis ve tedavi.",
    h1: "Dermatoloji ve Dahiliye",
    metaTitle: "Dermatoloji & Dahiliye · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpeklerde kaşıntı, deri sorunları ve iç hastalıkları. Kronik şikâyetlerde izlenen değerlendirme ve takip süreci.",
    keywords: [
      "köpeklerde kaşıntı Çankaya",
      "veteriner dermatoloji Ankara",
      "veteriner dahiliye Çankaya",
      "kedi köpek cilt hastalıkları Öveçler",
    ],
    intro:
      "Deri sorunları ve iç hastalıkları çoğu zaman yavaş ilerleyen, tek bir ziyarette çözülmeyen konulardır. Kaşıntının, tüy dökülmesinin ya da uzun süren bir iştahsızlığın ardında birbirinden çok farklı nedenler olabilir. Bu alanda yaklaşımımız, aceleci bir etiket koymak yerine olasılıkları sırayla eleyerek ilerlemektir.",
    covers: [
      "Kaşıntı, kızarıklık, tüy dökülmesi ve deri lezyonlarının değerlendirilmesi",
      "Tekrarlayan kulak sorunlarının incelenmesi",
      "Deri kazıntısı ve mikroskobik inceleme gibi yerinde testler",
      "Alerji şüphesinde beslenme denemesi ve çevresel etkenlerin gözden geçirilmesi",
      "Böbrek, karaciğer, tiroid ve şeker metabolizmasıyla ilgili şikâyetlerin takibi",
      "Kronik kusma, ishal ve kilo kaybı gibi iç hastalık bulgularının araştırılması",
      "Uzun soluklu hastalıklarda düzenli takip ve tedavi planının güncellenmesi",
    ],
    visit: [
      {
        step: "Ayrıntılı öykü",
        text: "Şikâyetin ne zaman başladığı, mevsimle ilişkisi, beslenme değişiklikleri ve daha önce denenenler bu alanda tanının yarısıdır. Bu bölüm normal muayeneden uzun sürer.",
      },
      {
        step: "Muayene ve yerinde testler",
        text: "Deri ve kulak sorunlarında mikroskobik inceleme gibi hızlı testler çoğu zaman ilk adımdır. Dahiliye şikâyetlerinde kan ve idrar tahlili öne çıkar.",
      },
      {
        step: "Aşamalı değerlendirme",
        text: "Olasılıkları en olası ve en kolay ayırt edilebilen olandan başlayarak eleriz. Her adımda ne beklediğimizi ve ne kadar süre gerektiğini açıklarız.",
      },
      {
        step: "Takip",
        text: "Kronik şikâyetlerde tedavi kadar takip de belirleyicidir. Kontrol aralıklarını netleştirir, evde neyi gözlemleyeceğinizi tarif ederiz.",
      },
    ],
    prepare: [
      "Şikâyetin başlangıç tarihini ve seyrini kısaca yazıp getirin",
      "Kaşıntının yoğunlaştığı bölgelerin ve lezyonların fotoğrafları çok yardımcı olur",
      "Kullandığınız tüm mama, ödül ve takviyelerin isimlerini not edin",
      "Daha önce kullanılan ürünleri ve verdiği yanıtı bildirin",
      "Şampuan veya dış parazit uygulaması yaptıysanız tarihini söyleyin; muayeneyi etkileyebilir",
      "Mümkünse muayeneden birkaç gün önce yıkamayın; deri örneklemesini zorlaştırır",
    ],
    faqs: [
      {
        q: "Köpeğimin kaşıntısının nedeni tek bir muayenede bulunur mu?",
        a: "Bazen evet, çoğu zaman hayır. Parazit kaynaklı ya da belirgin bir deri enfeksiyonu ilk muayenede ayırt edilebilir. Alerjik zeminli kaşıntıda ise tanı, diğer nedenlerin sırayla elenmesiyle konur ve bu haftalar sürebilir. Süreci baştan gerçekçi biçimde anlatmayı tercih ederiz.",
      },
      {
        q: "Besin alerjisi testi yaptırsam yeterli olmaz mı?",
        a: "Kan ya da tükürük üzerinden yapılan besin alerjisi testlerinin güvenilirliği sınırlıdır ve tek başına yön göstermez. Besin kaynaklı bir tepkiyi değerlendirmenin kabul gören yolu, belirli bir süre kontrollü beslenme denemesidir. Bu denemeyi birlikte planlar ve takip ederiz.",
      },
      {
        q: "Kedimde tüy dökülmesi normal mi?",
        a: "Mevsimsel tüy değişimi normaldir. Ancak bölgesel dazlaklar, simetrik dökülme, deride kızarıklık ya da aşırı yalanmaya bağlı tüy kaybı değerlendirilmelidir. Kedilerde aşırı yalama bazen kaşıntının, bazen de ağrının ya da stresin işareti olabilir.",
      },
      {
        q: "Dostumun kulak iltihabı sürekli tekrarlıyor, neden?",
        a: "Tekrarlayan kulak sorunu genellikle bir sonuçtur; altta yatan alerjik zemin, kulak yapısı, nem ya da ele alınmamış bir etken bulunabilir. Sadece damla kullanıp geçirmek, tablonun tekrarlamasını engellemez. Bu yüzden tekrarlayan olgularda alt nedeni araştırmayı öneririz.",
      },
      {
        q: "Kronik bir hastalıkta ne sıklıkla kontrole gelmeliyim?",
        a: "Takip aralığı hastalığın türüne, evresine ve dostunuzun tedaviye verdiği yanıta göre belirlenir. Başlangıçta aralıklar daha sık olur, durum dengelendikçe açılır. Her kontrolde bir sonraki randevunun ne zaman olacağını birlikte kararlaştırırız.",
      },
      {
        q: "İnternette okuduğum bir ürünü kendim deneyebilir miyim?",
        a: "Deri ve iç hastalıklarında kendi başına başlanan ürünler tabloyu değiştirip tanıyı zorlaştırabilir; bazıları kedilerde ciddi zarar verebilir. Aklınıza yatan bir ürün varsa uygulamadan önce bize sorun, birlikte değerlendirelim.",
      },
    ],
    relatedPosts: [
      "kopeklerde-kasinti-atopik-dermatit",
      "kopeklerde-cushing-sendromu",
      "kedilerde-hipertiroidi",
      "kedilerde-kronik-bobrek-hastaligi",
      "kopeklerde-kronik-ishal-mikrobiyota-nakli",
    
      "kedimde-ic-hastalik-belirtileri-ayirici-tani",
      "kopegim-cok-zayifladi-istahi-yerinde",
    ],
  },
  {
    slug: "acil-mudahale",
    icon: Siren,
    title: "Acil Müdahale",
    desc: "Beklenmedik durumlarda 7/24 hızlı, sakin ve etkin destek.",
    h1: "Çankaya'da 7/24 Acil ve Nöbetçi Veteriner",
    metaTitle: "Acil Veteriner Ankara · Çankaya'da 7/24 Nöbetçi Veteriner",
    metaDescription: `Ankara Çankaya'da gece, hafta sonu ve bayramda açık acil veteriner: ${site.address.full}. Yola çıkmadan arayın: ${site.phoneDisplay}.`,
    urgent: { reviewers: [] },
    keywords: [
      "acil veteriner Ankara",
      "acil veteriner Çankaya",
      "nöbetçi veteriner Ankara",
      "nöbetçi veteriner Çankaya",
      "gece açık veteriner Ankara",
      "7/24 veteriner Ankara",
      "Öveçler acil veteriner kliniği",
    ],
    intro: `Pet Internal Veteriner Kliniği, Çankaya Öveçler'de gece, hafta sonu ve resmî tatiller dâhil 7/24 açık bir veteriner kliniğidir ve acil hastaları randevusuz kabul eder. Ankara'nın neresinden gelirseniz gelin, yola çıkmadan önce ${site.phoneDisplay} numarasını aramanız, siz yoldayken hazırlık yapmamızı sağlar. Bu sayfa, hangi belirtilerin beklemeye gelmediğini tanımanıza ve yola çıkmadan önce neleri hazırlayacağınızı bilmenize yardımcı olmak için hazırlandı. Tereddüt ettiğiniz her durumda aramak doğru olandır.`,
    sections: [
      {
        h2: "Hangi durumlar beklemez?",
        paragraphs: [
          "Aşağıdaki belirtilerden biri varsa sabahı ya da randevu saatini beklemeyin; arayın ve yola çıkın. Bu liste tanı koydurmaz, yalnızca aciliyeti tanımanıza yardım eder.",
        ],
        alert: true,
        list: [
          {
            text: "Nefes almakta zorlanma, kedide ağzı açık soluma, morarmış dil veya diş eti.",
            link: { href: "/blog/kedilerde-nefes-darligi/", label: "Kedilerde nefes darlığı" },
          },
          {
            text: "Erkek kedinin kum kabına sık girip çıkması, ıkınıp idrar yapamaması; Cornell Kedi Sağlığı Merkezi tam tıkanıklıkta ölüme kadar geçen sürenin 24–48 saatten kısa olabileceğini belirtir.",
            link: { href: "/blog/kedi-kum-kabina-girip-cikiyor-idrar-yapamiyor/", label: "Kedi idrar yapamıyor" },
          },
          {
            text: "Köpekte karnın hızla şişmesi, öğürüp kusamama, huzursuzluk ve salya; mide burulması hayatı tehdit eden bir acildir.",
            link: { href: "/blog/kopeklerde-mide-burulmasi-gdv/", label: "Köpeklerde mide burulması" },
          },
          {
            text: "Zehirlenme şüphesi: insan ilacı, fare zehiri, çikolata, zambak, antifriz ya da bilinmeyen bir madde.",
            link: { href: "/blog/evcil-hayvanlarda-zehirlenme/", label: "Evde zehirlenme riski" },
          },
          {
            text: "Birkaç dakikadan uzun süren ya da arka arkaya gelen nöbet.",
            link: { href: "/blog/kopekte-nobet-havale-ne-yapmali/", label: "Köpekte nöbet" },
          },
          {
            text: "Kedide aniden arka bacakları kullanamama, ağrı ve soğuk patiler.",
            link: { href: "/blog/kedilerde-pihti-atmasi-arka-bacak-felci/", label: "Kedilerde pıhtı atması" },
          },
          {
            text: "Kanlı ya da durmayan kusma ve ishal, özellikle yavrularda ve yaşlılarda.",
            link: { href: "/blog/kopeklerde-ishal-ne-zaman-acil/", label: "İshal ne zaman acil?" },
          },
          {
            text: "Doğumda ilerlemeyen ıkınma ya da yavru çıkmadan uzayan sancı.",
            link: { href: "/blog/kopeklerde-gebelik-ve-dogum/", label: "Gebelik ve doğumda acil işaretler" },
          },
          {
            text: "Tavşanda yemeyi bırakma ya da 12 saatten uzun dışkı yapmama.",
            link: { href: "/blog/tavsanlarda-bagirsak-durmasi/", label: "Tavşanlarda bağırsak durması" },
          },
          { text: "Trafik kazası, yüksekten düşme, köpek ısırığı veya durmayan kanama; dışarıdan iyi görünse bile." },
          { text: "Bilinç bulanıklığı, ayağa kalkamama ya da çok soluk diş eti." },
        ],
        after:
          "Gece yarısı, pazar ya da bayram fark etmez; bu saatlerde de açığız. Telefonda türü, yaşı, şikâyetin ne zaman başladığını ve varsa yutulan maddeyi söylemeniz yeterlidir.",
        links: [
          { href: "/blog/veteriner-acil-hangi-durumlar/", label: "Beklemeden gitmeniz gereken 14 belirti" },
          { href: "/blog/ankara-acil-veteriner-nereye-gidilir/", label: "Ankara'da acil veteriner: gece nereye gidilir?" },
        ],
      },
    ],
    covers: [
      "Solunum güçlüğü, bilinç kaybı ve nöbet gibi hayati durumlarda ilk değerlendirme",
      "Travma, düşme ve trafik kazası sonrası acil bakım",
      "Zehirlenme şüphesinde hızlı müdahale",
      "Erkek kedilerde idrar yapamama gibi zaman kritik tablolar",
      "Şiddetli kusma, ishal ve karın şişliği durumlarının değerlendirilmesi",
      "Doğum güçlüğü ve ani kötüleşen kronik hastalıklarda destek",
      "Gerekli durumlarda gözlem altında tutma ve destek tedavisi",
    ],
    visit: [
      {
        step: "Önce telefon",
        text: "Yola çıkmadan bizi arayın. Durumu kısaca aktarın; hem sizi yönlendirebilir hem de siz yoldayken hazırlığımızı yapabiliriz. Bu birkaç dakika çoğu zaman fark yaratır.",
      },
      {
        step: "Geldiğinizde ilk değerlendirme",
        text: "Acil vakalarda sıra değil aciliyet belirleyicidir. Solunum, dolaşım ve bilinç durumu hızlıca değerlendirilir; ilk stabilizasyon adımları hemen başlar.",
      },
      {
        step: "Bilgilendirme",
        text: "Durum netleştikçe sizi bilgilendiririz. Belirsizliğin sürdüğü anlarda da ne bildiğimizi ve ne beklediğimizi açıkça söyleriz; boş güvence vermeyiz.",
      },
      {
        step: "Takip kararı",
        text: "Dostunuzun gözlem altında kalması gerekip gerekmediğini, evde nelere dikkat edileceğini ve kontrol zamanını netleştiririz.",
      },
    ],
    prepare: [
      "Yola çıkmadan önce arayın: " +
        "durumu anlatmanız hazırlık yapmamızı sağlar",
      "Zehirlenme şüphesinde maddenin kutusunu, etiketini ya da bitkinin bir parçasını getirin",
      "Kullanılan tüm ilaçların isimlerini ve son verilme saatini not edin",
      "Kediyi kapalı taşıma çantasına, köpeği kısa tasmaya alın; ağrılı hayvan ısırabilir",
      "Kanama varsa temiz bir bezle bastırın; müdahaleyi yolda denemeyin",
      "Kusma varsa bir örneğini ya da fotoğrafını yanınızda getirin",
    ],
    faqs: [
      {
        q: "Hangi durumlar gerçekten acil sayılır?",
        a: "Solunum güçlüğü, bilinç kaybı, durmayan nöbet, kontrolsüz kanama, ciddi travma, karnın hızla şişmesi, öğürüp kusamama, zehirlenme şüphesi ve erkek kedilerde idrar yapamama bekleyemeyecek durumlardır. Emin olmadığınızda karar vermeye çalışmak yerine telefonla bize danışın.",
      },
      {
        q: "Gece açık veteriner arıyorum, şu an açık mısınız?",
        a: "Evet. Kliniğimiz gece dâhil 7/24 açıktır ve acil hastaları randevusuz kabul eder. Gelmeden önce aramanız, hem yönlendirme almanızı hem de biz hazırlanırken zaman kazanmanızı sağlar.",
      },
      {
        q: "Nöbetçi veteriner aramalı mıyım?",
        a: `Ankara'da eczanelerdeki gibi resmî bir nöbetçi veteriner çizelgesi yoktur; Ankara Veteriner Hekimleri Odası da nöbet listesi yayımlamaz. Bu yüzden liste aramak yerine o saatte açık olan bir kliniği doğrudan aramak en hızlı yoldur. Kliniğimiz Öveçler'de 7/24 açıktır; yola çıkmadan önce ${site.phoneDisplay} numarasını arayıp durumu kısaca anlatmanız, siz gelene kadar hazırlık yapmamızı sağlar.`,
      },
      {
        q: "Pazar ve bayramda açık mısınız?",
        a: "Evet. Kliniğimiz 7/24 açıktır; pazar dâhil hafta sonlarında ve bayramlar gibi resmî tatillerde de acil başvuruları kabul ediyoruz. Acil durumda randevu gerekmez; yola çıkarken aramanız yeterlidir.",
      },
      {
        q: "Yola çıkmadan önce evde ilk yardım uygulamalı mıyım?",
        a: "Çoğu durumda en doğrusu vakit kaybetmeden yola çıkmaktır. Kanamada temiz bir bezle bastırmak dışında evde müdahale denemesi genellikle zaman kaybettirir, bazen zarar verir. Özellikle kusturmayı kendi başınıza denemeyin; bazı maddelerde bu tabloyu ağırlaştırır.",
      },
      {
        q: "Köpeğim çikolata ya da bilmediğim bir şey yedi, bekleyeyim mi?",
        a: "Beklemeyin, hemen arayın. Etkinin ortaya çıkması saatler alabilir ve belirti çıkmasını beklemek müdahale penceresini daraltır. Maddenin ne olduğunu, tahmini miktarı ve ne zaman alındığını söylemeniz değerlendirmeyi hızlandırır.",
      },
      {
        q: "Erkek kedim kum kabına girip çıkıyor ama idrar yapamıyor, bu acil mi?",
        a: "Evet, bu erkek kedilerde en zaman kritik acil tablolardan biridir ve saatler önem taşır. Kum kabına sık girip çıkma, ıkınma, huzursuzluk ve karın hassasiyeti varsa vakit kaybetmeden bize ulaşın.",
      },
      {
        q: "Acil gelirken randevu gerekli mi?",
        a: "Acil durumlarda randevu beklemenize gerek yoktur; ancak yola çıkarken aramanızı önemle rica ederiz. Bu, geldiğinizde sizi hazır karşılamamızı ve gerekiyorsa yolda yapmanız gerekenleri anlatmamızı sağlar.",
      },
    ],
    access: {
      text: `Tek adresimiz Öveçler'de: ${site.address.full}. Çankaya'nın tüm semtlerinden ve Ankara'nın diğer ilçelerinden gelen acil hastaları gece ve gündüz kabul ediyoruz; yola çıkarken arayın, siz gelmeden hazırlanalım.`,
      links: accessLinks,
    },
    sources: [
      {
        title: "Feline Lower Urinary Tract Disease",
        publisher: "Cornell Feline Health Center",
        url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-lower-urinary-tract-disease",
      },
      {
        title: "Disorders of the Stomach and Intestines in Dogs (Bloat)",
        publisher: "Merck Veterinary Manual",
        url: "https://www.merckvetmanual.com/dog-owners/digestive-disorders-of-dogs/disorders-of-the-stomach-and-intestines-in-dogs",
      },
      {
        title: "Illness of Rabbits",
        publisher: "Merck Veterinary Manual",
        url: "https://www.merckvetmanual.com/all-other-pets/rabbits/disorders-and-diseases-of-rabbits",
      },
    ],
    relatedPosts: [
      "veteriner-acil-hangi-durumlar",
      "ankara-acil-veteriner-nereye-gidilir",
      "evcil-hayvanlarda-zehirlenme",
      "kedi-kum-kabina-girip-cikiyor-idrar-yapamiyor",
      "kedilerde-idrar-tikanikligi-flutd",
      "kopeklerde-mide-burulmasi-gdv",
      "kedilerde-nefes-darligi",
      "kopekte-nobet-havale-ne-yapmali",
    ],
  },
  {
    slug: "pet-kuafor-bakim",
    icon: Bath,
    title: "Pet Kuaför & Bakım",
    desc: "Tıraş, banyo, tırnak ve kulak bakımıyla bütünsel hijyen.",
    h1: "Pet Kuaför ve Bakım",
    metaTitle: "Pet Kuaför & Bakım · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpekler için tıraş, banyo, tırnak ve kulak bakımı. Veteriner kliniği içinde, sakin ve hijyenik bir ortamda.",
    keywords: [
      "pet kuaför Çankaya",
      "köpek tıraşı Öveçler",
      "kedi bakım Ankara",
      "pet kuaför Ankara veteriner kliniği",
    ],
    intro:
      "Bakım, yalnızca görünüşle ilgili değildir. Düzenli tarama, tırnak kesimi ve kulak temizliği; deri sorunlarını, kulak rahatsızlıklarını ve yürüyüşü etkileyen tırnak sorunlarını erken fark etmenin de en pratik yoludur. Bakım hizmetini bir veteriner kliniği içinde sunmamızın nedeni de budur: bir şey fark edildiğinde hekim aynı çatı altındadır.",
    covers: [
      "Irk ve tüy yapısına uygun tıraş ve şekillendirme",
      "Banyo, kurutma ve tüy açma işlemleri",
      "Keçeleşmiş tüylerin dikkatli şekilde açılması ya da alınması",
      "Tırnak kesimi ve pati çevresi bakımı",
      "Kulak temizliği ve kulak kanalının gözden geçirilmesi",
      "Bakım sırasında fark edilen deri bulgularının hekime iletilmesi",
      "Stresli dostlar için kısa ve bölünmüş bakım planlaması",
    ],
    visit: [
      {
        step: "Ön görüşme",
        text: "Nasıl bir bakım istediğinizi, dostunuzun daha önceki bakım deneyimlerini ve hassas olduğu noktaları konuşuruz. Beklentiyi baştan netleştirmek işi kolaylaştırır.",
      },
      {
        step: "Kısa kontrol",
        text: "Bakım öncesi deri, kulak ve tırnakları gözden geçiririz. Bakımı zorlaştıracak ya da hekim değerlendirmesi gerektirecek bir bulgu varsa size söyleriz.",
      },
      {
        step: "Bakım",
        text: "İşlemi dostunuzun toleransına göre yürütürüz. Aşırı zorlanan dostlarda işlemi bölmeyi ya da başka bir güne bırakmayı zorlamaya tercih ederiz.",
      },
      {
        step: "Teslim ve öneriler",
        text: "Bakım sırasında fark ettiklerimizi aktarır, evde tarama sıklığı ve kullanabileceğiniz aletler konusunda pratik öneriler veririz.",
      },
    ],
    prepare: [
      "Dostunuzun bakım sırasında zorlandığı noktaları önceden bildirin",
      "Aşı durumunun güncel olması bakım randevusu için gereklidir",
      "Ciltte kızarıklık, yara ya da kaşıntı varsa bakımdan önce mutlaka söyleyin",
      "Keçeleşme çok ilerlediyse kısa tıraş gerekebileceğini göz önünde bulundurun",
      "Bakım öncesi kısa bir yürüyüş, köpeklerin daha sakin olmasına yardımcı olur",
      "Randevu saatinden birkaç saat önce büyük bir öğün vermeyin",
    ],
    faqs: [
      {
        q: "Kedimi de kuaföre getirebilir miyim?",
        a: "Evet, ancak kedilerde yaklaşım köpeklerden farklıdır: işlem daha kısa tutulur ve dostunuzun toleransı belirleyicidir. Bazı kediler taramayı ve tırnak kesimini kabul ederken, bazıları kısa bir bakımı bile zor karşılar. İlk randevuda ne kadarının yapılabileceğini birlikte görürüz.",
      },
      {
        q: "Keçeleşen tüyler taranarak açılabilir mi?",
        a: "Hafif keçeler dikkatli çalışmayla açılabilir. Ancak yaygın ve deriye yapışmış keçelerde zorlayarak tarama ciddi acı verir ve deriyi yaralayabilir; bu durumda kısa tıraş hem daha güvenli hem de daha insanidir. Kararı size açıklayarak veririz.",
      },
      {
        q: "Bakım sırasında sakinleştirici kullanıyor musunuz?",
        a: "Rutin bakımda sakinleştirici kullanmayız. Çok stresli olan ya da bakım sırasında kendine zarar verme riski taşıyan dostlarda konuyu hekimimizle ve sizinle ayrıca değerlendiririz. Böyle bir ihtiyaç varsa bu, bakım randevusu değil ayrı bir planlama gerektirir.",
      },
      {
        q: "Ne sıklıkla bakım gerekir?",
        a: "Sıklık ırka, tüy yapısına ve evdeki bakım rutinine göre değişir. Uzun tüylü dostlarda düzenli tarama arası açıldığında keçeleşme hızla ilerler. Bakım sonrası dostunuza uygun bir aralık öneririz.",
      },
      {
        q: "Tırnak kesimini evde yapabilir miyim?",
        a: "Birçok sahip, uygun bir makasla ve kademeli alıştırmayla tırnak kesimini evde yapabilir. Önemli olan tırnağın canlı kısmına girmemektir; koyu tırnaklarda bu sınır zor görülür, bu yüzden az ve sık kesmek daha güvenlidir. Nasıl yapılacağını randevuda gösterebiliriz.",
      },
      {
        q: "Bakım sırasında bir sağlık sorunu fark edilirse ne oluyor?",
        a: "Bakımı yapan ekip, deri, kulak veya tırnaklarda dikkat çeken bir bulgu gördüğünde bunu hekimimize iletir ve size aktarır. Aynı çatı altında olmanın avantajı budur. Tanı ya da tedavi kararı, elbette hekim muayenesiyle verilir.",
      },
    ],
    relatedPosts: [
      "kopeklerde-kasinti-atopik-dermatit",
      "kene-ve-pire-korunma",
      "yaz-sicaginda-pati-bakimi",
      "kis-aylarinda-pati-bakimi",
      "dis-tasi-ve-agiz-sagligi",
    ],
  },
  {
    slug: "beslenme-danismanligi",
    icon: Salad,
    title: "Beslenme Danışmanlığı",
    desc: "Yaşa, ırka ve sağlık durumuna özel kişiselleştirilmiş beslenme planları.",
    h1: "Beslenme Danışmanlığı",
    metaTitle: "Beslenme Danışmanlığı · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpekler için beslenme danışmanlığı. Kilo yönetimi, yaşam dönemine uygun mama seçimi ve porsiyon planlaması.",
    keywords: [
      "evcil hayvan beslenme danışmanlığı Çankaya",
      "kedi köpek mama seçimi Ankara",
      "köpek kilo verme Öveçler",
      "veteriner beslenme Ankara",
    ],
    intro:
      "Beslenme, sağlığı en çok etkileyen ve en çok yanlış bilgi dolaşan alanlardan biridir. Doğru plan; dostunuzun yaşına, kilosuna, aktivite düzeyine ve varsa hastalıklarına göre değişir. Amacımız moda diyetler önermek değil, evde gerçekten sürdürebileceğiniz ve dostunuza uyan bir düzen kurmanıza yardımcı olmaktır.",
    covers: [
      "Vücut kondisyon skoru ve ideal kilo aralığının belirlenmesi",
      "Günlük enerji ihtiyacına göre porsiyon planlaması",
      "Yaşam dönemine uygun mama seçiminde yol gösterme",
      "Kilo verme ya da kilo alma sürecinin kademeli planlanması",
      "Kronik hastalığı olan dostlarda beslenmenin gözden geçirilmesi",
      "Ödül ve ara öğünlerin günlük hesaba dâhil edilmesi",
      "Mama değişiminin kademeli olarak nasıl yapılacağı",
    ],
    visit: [
      {
        step: "Mevcut düzenin çıkarılması",
        text: "Ne verildiğini, ne kadar ve kaç öğünde verildiğini, ödüller dâhil olmak üzere ayrıntılı konuşuruz. Çoğu zaman gözden kaçan kalori kaynağı ödüllerdir.",
      },
      {
        step: "Değerlendirme",
        text: "Tartı, vücut kondisyon skoru ve muayene bulguları ile başlangıç noktasını netleştiririz. Gerekirse temel tahlillerle birlikte değerlendiririz.",
      },
      {
        step: "Planın kurulması",
        text: "Günlük miktarı, öğün sayısını ve hedef aralığı yazılı olarak veririz. Kilo değişimi hedefleri kademelidir; hızlı değişim özellikle kedilerde risklidir.",
      },
      {
        step: "Takip",
        text: "Belirli aralıklarla tartı kontrolü yaparız. Plan işlemiyorsa suçlayıcı değil, çözüm arayan bir yaklaşımla birlikte revize ederiz.",
      },
    ],
    prepare: [
      "Kullandığınız mamanın paketini ya da etiketinin fotoğrafını getirin",
      "Günde kaç ölçek/gram verdiğinizi ve öğün sayısını not edin",
      "Verilen tüm ödülleri, insan yiyeceklerini ve takviyeleri listeleyin",
      "Evde birden fazla hayvan varsa kimin ne yediğini nasıl ayırdığınızı anlatın",
      "Varsa son tartı kayıtlarını ve tahlil sonuçlarını yanınızda getirin",
      "Evde tartı imkânınız varsa kilo takibi çok kolaylaşır",
    ],
    faqs: [
      {
        q: "Dostumun fazla kilolu olup olmadığını nasıl anlarım?",
        a: "Tek başına tartı yeterli değildir; ırklar arasında büyük fark vardır. Pratik ölçüt vücut kondisyonudur: kaburgalar hafif bir dokunuşla hissedilebilmeli, yukarıdan bakıldığında bel çizgisi görülebilmeli, yandan bakıldığında karın hafif yukarı çekik olmalıdır. Muayenede bunu birlikte değerlendirir, size gösteririz.",
      },
      {
        q: "Kedimi hızlıca zayıflatabilir miyim?",
        a: "Hayır, kedilerde hızlı kilo kaybı ciddi karaciğer sorunlarına yol açabileceği için özellikle tehlikelidir. Kilo verme kedilerde yavaş ve kontrollü bir süreç olmalı, düzenli tartı takibiyle yürütülmelidir. Aç bırakma yöntemi kesinlikle uygun değildir.",
      },
      {
        q: "Tahılsız mama daha mı sağlıklı?",
        a: "Tahılsız olmak tek başına bir kalite göstergesi değildir; çoğu kedi ve köpek için tahıl bir sorun kaynağı da değildir. Mama seçiminde bakılması gereken, ürünün dostunuzun yaşam dönemine uygun ve dengeli bir bileşime sahip olmasıdır. Bu konuyu muayenede ayrıntılı konuşabiliriz.",
      },
      {
        q: "Ev yemeği ile besleyebilir miyim?",
        a: "Ev yapımı beslenme mümkündür ancak dengeli olması sanıldığından çok daha zordur; rastgele hazırlanan menülerde eksiklikler zamanla sağlık sorunlarına yol açabilir. Bu yolu tercih edecekseniz planı birlikte kurmamız ve düzenli takip etmemiz gerekir.",
      },
      {
        q: "Mamayı değiştirirken nelere dikkat etmeliyim?",
        a: "Ani mama değişimi sindirim sorunlarına yol açabilir. Genel yaklaşım, yeni mamayı eskisiyle karıştırarak birkaç gün içinde kademeli olarak artırmaktır. Hassas sindirimi olan dostlarda bu geçiş daha uzun tutulur. Değişimi düşünüyorsanız önce bize danışın.",
      },
      {
        q: "Ödüller planı gerçekten bozar mı?",
        a: "Evet, en sık karşılaştığımız durumlardan biri budur. Küçük bir dostta gün içinde verilen birkaç ödül, günlük enerji ihtiyacının kayda değer bir kısmını oluşturabilir. Ödülleri yasaklamak yerine günlük hesaba dâhil etmeyi ve daha düşük kalorili seçeneklere yönelmeyi öneririz.",
      },
    ],
    relatedPosts: [
      "evcil-hayvanlarda-obezite",
      "tahilsiz-mama-ve-kalp-hastaligi",
      "yavru-kedi-beslenmesi",
      "cig-mama-kus-gribi-riski",
      "evcil-hayvanlarda-kilo-ilaclari-glp1",
    ],
  },
  {
    slug: "kus-tavsan-kucuk-memeliler",
    icon: Bird,
    title: "Kuş, Tavşan & Küçük Dostlar",
    desc: "Muhabbet kuşu, papağan, tavşan, ginepig ve hamsterlar için muayene ve bakım.",
    h1: "Çankaya'da Kuş, Tavşan ve Küçük Memeli Veterineri",
    metaTitle: "Tavşan ve Kuş Veterineri Ankara · Çankaya Öveçler",
    metaDescription:
      "Ankara Çankaya'da tavşan, muhabbet kuşu, papağan, ginepig ve hamster muayenesi. Hastalık belirtileri, diş, tırnak ve gaga kontrolü. 7/24 açık klinik.",
    keywords: [
      "tavşan veterineri Ankara",
      "kuş veterineri Ankara",
      "egzotik hayvan veterineri Ankara",
      "tavşan veterineri Çankaya",
      "muhabbet kuşu veteriner Çankaya",
      "ginepig veteriner Ankara",
      "hamster veteriner Çankaya",
    ],
    intro:
      "Muhabbet kuşu, papağan, tavşan, ginepig ve hamster gibi küçük dostları Çankaya Öveçler'deki kliniğimizde muayene ediyoruz; kliniğimiz 7/24 açık olduğu için tavşanınız gece yemeyi bıraktığında ya da kuşunuz aniden kabardığında da bize ulaşabilirsiniz. Bu türler doğada av hayvanıdır ve hastalıklarını son ana kadar saklarlar; sahibin fark ettiği ilk belirti çoğu zaman sorunun bir süredir devam ettiği anlamına gelir. Bu yüzden düzenli kontrol, türe uygun beslenme ve erken başvuru, küçük dostlarda da sağlığı korumanın temelidir.",
    sections: [
      {
        h2: "Tavşanlarda en sık sorunlar ve acil belirtiler",
        paragraphs: [
          "Tavşanın sindirim sistemi sürekli çalışmak zorundadır. Merck Veteriner El Kitabı; 12 saatten uzun süren dışkısızlığı, iştah ve kilo kaybını, salya akmasını, nefes güçlüğünü ve normal zıplayamamayı hemen veteriner hekime başvurulması gereken belirtiler arasında sayar. Diş gıcırdatma ve kambur duruş da ağrının işareti olabilir.",
          "Tavşanların ön kesici dişleri de yanak dişleri de ömür boyu uzar. Ağırlıklı olarak pelet yiyen tavşanlarda dişler yeterince aşınmayabilir; bol kuru ot tüketimi dişlerin aşınmasına yardım eder. Uzun ön dişler, salya, yemek seçme ya da yanakta şişlik görürseniz diş muayenesi gerekir; yanak dişlerinde oluşan sivri uçlar dili ve yanağı yaralayabilir.",
        ],
        links: [
          { href: "/blog/tavsanlarda-bagirsak-durmasi/", label: "Tavşanlarda bağırsak durması" },
          { href: "/blog/tavsanlarda-dis-uzamasi/", label: "Tavşanlarda diş uzaması" },
        ],
      },
      {
        h2: "Muhabbet kuşu ve papağanlarda uyarı işaretleri",
        paragraphs: [
          "Kuşlar doğada zayıf görünmemek için hastalıklarını gizler. Merck Veteriner El Kitabı; kabarık tüylerle oturmayı, her nefeste kuyruğun inip kalkmasını, dışkıdaki değişiklikleri, kafes tabanında durmayı, daha az ötmeyi ve iştah değişikliğini başlıca uyarı işaretleri olarak sayar. Kuşunuzun normal davranışını iyi tanımanız, küçük değişiklikleri erken fark etmenizi sağlar; bu belirtilerden birini gördüğünüzde beklemek yerine aramanızı öneririz.",
          "Ev içi tehlikeler de kuşlar için önemlidir: yapışmaz kaplamalı tencere ve tavaların aşırı ısınmasıyla çıkan dumanlar, aerosol spreyler ve bazı bitkiler zehirlenmeye yol açabilir.",
        ],
        links: [
          { href: "/blog/muhabbet-kusu-hastalik-belirtileri/", label: "Muhabbet kuşu hastalık belirtileri" },
          { href: "/blog/muhabbet-kusu-usume-belirtileri/", label: "Muhabbet kuşu üşüme belirtileri" },
          { href: "/blog/kuslarda-ev-ici-zehirlenmeler/", label: "Kuşlarda ev içi zehirlenmeler" },
        ],
      },
      {
        h2: "Ginepig, hamster ve diğer küçük memeliler",
        paragraphs: [
          "Ginepigler C vitaminini kendileri üretemez, bu yüzden günlük beslenmeyle almaları gerekir; eksiklikte eklem ağrısı, diş eti sorunları ve halsizlik görülebilir. Ginepig ve hamsterlarda da dişler sürekli uzar ve iştahsızlık kısa sürede ciddileşebilir. Bu türlerde kilo kaybı çoğu zaman erken bir işarettir; evde mutfak tartısıyla haftalık tartı yapmanız değerli bir takip aracıdır.",
        ],
        links: [{ href: "/blog/ginepiglerde-c-vitamini-eksikligi/", label: "Ginepiglerde C vitamini eksikliği" }],
      },
    ],
    covers: [
      "Muhabbet kuşu, sultan papağanı ve diğer kafes kuşlarının genel muayenesi",
      "Tavşan, ginepig, hamster ve diğer küçük memelilerin genel muayenesi",
      "Tüy kabarması, iştahsızlık, dışkı değişikliği gibi hastalık belirtilerinin değerlendirilmesi",
      "Tırnak ve gaga kontrolü, uzamış tırnakların kesilmesi",
      "Tavşan ve kemirgenlerde diş kontrolü",
      "Dış parazit (akar, bit) kontrolü",
      "Türe uygun beslenme, kafes ve barınma düzeni danışmanlığı",
      "Yeni sahiplenilen küçük dostlar için ilk kontrol",
    ],
    visit: [
      {
        step: "Taşıma",
        text: "Kuşunuzu kendi kafesinde ya da küçük bir taşıma kutusunda, üstü hafifçe örtülü getirin. Tavşan ve ginepigler için içinde havlu olan sağlam bir taşıma kabı yeterlidir.",
      },
      {
        step: "Gözlem ve öykü",
        text: "Küçük dostlarda muayene, hayvana dokunmadan önce başlar: duruş, solunum, tüy ve hareket izlenir. Beslenme, barınma ve son günlerde fark ettiğiniz değişiklikleri konuşuruz.",
      },
      {
        step: "Muayene",
        text: "Stresi en aza indirmek için muayeneyi kısa ve sakin tutarız. Kilo takibi bu türlerde özellikle önemlidir; küçük bir düşüş bile anlamlıdır.",
      },
      {
        step: "Plan",
        text: "Bulgulara göre evde bakım önerilerini, gerekiyorsa tetkik ve tedavi planını ve kontrol zamanını birlikte belirleriz.",
      },
    ],
    prepare: [
      "Kuşlarda kafesin tabanındaki son dışkıları temizlemeden getirin; dışkı görünümü muayene için önemli bilgidir",
      "Kullandığınız yem ya da mamanın paketini veya fotoğrafını yanınızda bulundurun",
      "Tavşan ve ginepiglerde son 24 saatte yeme ve dışkılama durumunu not edin",
      "Soğuk havalarda taşıma kabını örterek hayvanın üşümesini önleyin",
      "Kafes ve yaşam alanının bir fotoğrafını çekmeniz değerlendirmeyi kolaylaştırır",
    ],
    faqs: [
      {
        q: "Muhabbet kuşumun hasta olduğunu nasıl anlarım?",
        a: "Gün boyu kabarık oturmak, gözlerini sık kapatmak, kafesin tabanında durmak, kuyruğun her nefeste inip kalkması, iştahsızlık ve dışkının renk ya da kıvamındaki değişiklik başlıca uyarı işaretleridir. Kuşlar hastalığı gizlediği için bu belirtilerden biri bile görüldüğünde beklemeden aramanızı öneririz.",
      },
      {
        q: "Tavşanım yemek yemiyor, bekleyebilir miyim?",
        a: "Hayır. Tavşanlarda iştahsızlık ve dışkının azalması ya da kesilmesi, sindirim sisteminin yavaşladığını gösterebilir ve kısa sürede ciddileşebilir. Tavşanınız birkaç saattir yemiyor ya da dışkı yapmıyorsa acil olarak başvurun.",
      },
      {
        q: "Yeni aldığım tavşanı veya kuşu ne zaman kontrole getirmeliyim?",
        a: "Sahiplendikten sonraki ilk günlerde bir kontrol öneririz. Bu muayenede genel durum, kilo, dişler, tüy ve deri ile dışkı görünümü değerlendirilir; beslenme ve kafes düzenini birlikte gözden geçiririz. Evde başka kuş ya da tavşan varsa yeni geleni bir süre ayrı tutmanın gerekip gerekmediğini de konuşuruz.",
      },
      {
        q: "Ginepigler neden C vitaminine ihtiyaç duyar?",
        a: "Ginepigler, insanlar gibi C vitaminini kendi vücutlarında üretemez; bu yüzden günlük olarak besinle almaları gerekir. Eksiklikte eklem ağrısı, diş eti sorunları ve halsizlik görülebilir. Uygun yem ve taze sebze seçimini muayenede birlikte planlayabiliriz.",
      },
      {
        q: "Kuşumun tırnak veya gagasını evde kesebilir miyim?",
        a: "Önermiyoruz. Tırnak ve gagada damar ve sinir bulunur; yanlış kesim kanamaya yol açabilir. Ayrıca aşırı uzayan gaga çoğu zaman altta yatan bir sorunun işaretidir ve muayene edilmesi gerekir.",
      },
      {
        q: "Tavşan ve ginepigler de kısırlaştırılabilir mi?",
        a: "Evet, bu türlerde de kısırlaştırma yapılabilir; ancak anestezi ve hazırlık kedi ve köpeklerden farklıdır. Örneğin tavşanlar ameliyat öncesi kedi ve köpekler gibi aç bırakılmaz, çünkü açlık sindirim sisteminin normal hareketini bozabilir. Uygunluğu ve zamanlamayı ön muayeneden sonra konuşuruz.",
      },
      {
        q: "Acil durumda gece gelebilir miyiz?",
        a: `Evet, kliniğimiz 7/24 açık. Kuşlarda nefes darlığı ya da kanama, tavşanlarda yemenin ve dışkılamanın durması acil kabul edilmelidir. Yola çıkmadan önce ${site.phoneDisplay} numarasını aramanız hazırlık yapmamızı sağlar.`,
      },
    ],
    access: {
      text: `Kliniğimiz ${site.address.full} adresindedir. Çankaya'nın yanı sıra Ankara'nın diğer ilçelerinden gelen kuş, tavşan ve küçük memeli hastaları da kabul ediyoruz; taşıma kabını örtülü tutarak gelebilir, yola çıkmadan önce arayabilirsiniz.`,
      links: accessLinks,
    },
    sources: [
      {
        title: "Illness of Rabbits",
        publisher: "Merck Veterinary Manual",
        url: "https://www.merckvetmanual.com/all-other-pets/rabbits/disorders-and-diseases-of-rabbits",
      },
      {
        title: "Dental Care of Rabbits",
        publisher: "Merck Veterinary Manual",
        url: "https://www.merckvetmanual.com/all-other-pets/rabbits/dental-care-of-rabbits",
      },
      {
        title: "Illness in Pet Birds",
        publisher: "Merck Veterinary Manual",
        url: "https://www.merckvetmanual.com/bird-owners/routine-care-and-safety-of-birds/illness-in-pet-birds",
      },
    ],
    relatedPosts: [
      "tavsanlarda-bagirsak-durmasi",
      "tavsanlarda-dis-uzamasi",
      "muhabbet-kusu-hastalik-belirtileri",
      "muhabbet-kusu-usume-belirtileri",
      "kuslarda-ev-ici-zehirlenmeler",
      "ginepiglerde-c-vitamini-eksikligi",
      "veteriner-acil-hangi-durumlar",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
