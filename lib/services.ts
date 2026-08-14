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
import type { FAQ } from "@/lib/posts";

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
  /** Blog slugs — every one verified to exist in lib/posts/*.json. */
  relatedPosts: string[];
};

export const services: Service[] = [
  {
    slug: "genel-muayene-check-up",
    icon: Stethoscope,
    title: "Genel Muayene & Check-up",
    desc: "Düzenli kontrollerle dostlarınızın sağlığını korur, sorunları erken yakalarız.",
    h1: "Genel Muayene ve Check-up",
    metaTitle: "Genel Muayene & Check-up · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpekler için genel muayene ve check-up. Kontrolde nelere bakılır, ne sıklıkla yapılır ve randevuya nasıl hazırlanırsınız.",
    keywords: [
      "veteriner genel muayene Çankaya",
      "kedi köpek check up Ankara",
      "evcil hayvan sağlık kontrolü",
      "Öveçler veteriner muayene",
    ],
    intro:
      "Genel muayene, dostunuzun o anki sağlık durumunu baştan aşağı gözden geçirdiğimiz temel kontroldür. Birçok rahatsızlık, ev ortamında fark edilir bir belirti vermeden önce fizik muayenede ya da rutin tahlillerde iz bırakır. Düzenli check-up'ın amacı bu izleri erkenden görmek ve dostunuzun kendi normalini kayıt altına almaktır.",
    covers: [
      "Baştan ayağa fizik muayene: göz, kulak, ağız, deri ve tüy örtüsü",
      "Kalp ve akciğerlerin dinlenmesi, nabız ve solunum değerlendirmesi",
      "Karın bölgesinin elle muayenesi ve lenf düğümlerinin kontrolü",
      "Vücut ağırlığı, vücut kondisyon skoru ve kilo seyrinin takibi",
      "Aşı ve parazit koruma takviminin gözden geçirilmesi",
      "Gerekli görülürse kan, idrar tahlili veya görüntüleme önerisi",
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
        a: "Genel yaklaşım, sağlıklı yetişkin dostlar için yılda bir kez tam kontroldür. Yavrularda aşı dönemi boyunca daha sık, yaşlı dostlarda ve kronik hastalığı olanlarda ise daha yakın aralıklarla görüşmek gerekebilir. Uygun sıklığı dostunuzun yaşı, ırkı ve mevcut bulguları belirler; bunu muayenede birlikte netleştiririz.",
      },
      {
        q: "Hiçbir şikâyetim yokken check-up gerçekten gerekli mi?",
        a: "Kediler ve köpekler rahatsızlıklarını uzun süre saklayabilir; özellikle kediler ağrıyı ve halsizliği gizlemekte oldukça başarılıdır. Check-up'ın değeri, bir sorun aramaktan çok dostunuzun normal değerlerini kayıt altına almaktır. İlerideki bir kontrolde bu kayıtlar, küçük bir değişikliği fark etmemizi kolaylaştırır.",
      },
      {
        q: "Muayene ne kadar sürer?",
        a: "Rutin bir genel muayene çoğunlukla 20-30 dakika sürer. Öykü karmaşıksa, birden fazla şikâyet varsa ya da aynı seansta tahlil alınacaksa süre uzayabilir. Randevu alırken şikâyetinizi kısaca aktarırsanız size uygun uzunlukta bir slot ayırabiliriz.",
      },
      {
        q: "Check-up'ta mutlaka kan tahlili yapılır mı?",
        a: "Hayır, tahlil otomatik bir adım değildir. Fizik muayene bulguları, dostunuzun yaşı ve öyküsü tahlile ihtiyaç olup olmadığını belirler. Yaşlı dostlarda ve anestezi planlanan durumlarda tahlil çok daha sık gündeme gelir. Önerdiğimizde gerekçesini açıklarız, karar her zaman sizindir.",
      },
      {
        q: "Kedim veteriner ziyaretinde çok stres oluyor, ne yapabilirim?",
        a: "Taşıma çantasını ziyaretten günler önce evin sakin bir köşesine açık bırakmak, içine tanıdık kokulu bir örtü koymak ve çantayı üstü örtülü taşımak stresi belirgin şekilde azaltır. Klinikte de kedilerin kendi hızına saygı gösteren, sessiz bir yaklaşım benimseriz. Ziyaretin zor geçtiğini önceden bildirirseniz buna göre planlama yaparız.",
      },
      {
        q: "Muayenede konuşulanları not almalı mıyım?",
        a: "Faydalı olur, ancak zorunlu değil. Muayene sonunda bulguları ve planı özetleriz; aklınıza sonradan gelen soruları telefonla ya da WhatsApp üzerinden de iletebilirsiniz. Bir yakınınızla birlikte gelmek de bilgilerin akılda kalmasını kolaylaştırır.",
      },
    ],
    relatedPosts: [
      "evcil-hayvan-check-up-neleri-kapsar",
      "yasli-kedi-kopek-bakimi",
      "kedilerde-kronik-bobrek-hastaligi",
      "kopegim-cok-su-iciyor",
      "veteriner-ucretlerini-ne-belirler",
    
      "yasli-kedide-yillik-kontrol-hangi-testler",
      "veteriner-fiyatlari-neden-farkli",
    ],
  },
  {
    slug: "asilama-mikrocip",
    icon: Syringe,
    title: "Aşılama & Mikroçip",
    desc: "Koruyucu aşı takvimi ve yasal mikroçip ile kalıcı kimliklendirme.",
    h1: "Aşılama ve Mikroçip Uygulaması",
    metaTitle: "Aşılama & Mikroçip · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpek aşı takvimi ile yasal mikroçip uygulaması. Aşı öncesi kontrol, PETVET kaydı ve randevu hazırlığı hakkında bilgi.",
    keywords: [
      "kedi köpek aşı Çankaya",
      "mikroçip Ankara veteriner",
      "aşı takvimi Öveçler",
      "PETVET kaydı Çankaya",
    ],
    intro:
      "Aşılama, bulaşıcı hastalıklara karşı korunmanın en köklü yoludur; mikroçip ise dostunuzun kaybolduğunda size geri dönmesini sağlayan kalıcı kimliğidir. Türkiye'de kedi ve köpeklerin mikroçip ile kimliklendirilmesi ve resmî kayıt sistemine işlenmesi yasal bir yükümlülüktür. Her iki uygulamayı da muayene sonrası, dostunuzun o günkü durumu uygunsa yaparız.",
    covers: [
      "Yaşa ve yaşam tarzına göre planlanan çekirdek ve ek aşı takvimi",
      "Aşı öncesi kısa sağlık kontrolü ve ateş ölçümü",
      "Kuduz aşısı uygulaması ve kayıt altına alınması",
      "Mikroçip yerleştirme ve okuyucu ile doğrulama",
      "Resmî kayıt sistemine işlenmesi ve kimlik belgesinin düzenlenmesi",
      "Aşı karnesinin güncellenmesi, sonraki doz tarihinin planlanması",
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
        text: "Aşı ve varsa mikroçip, dostunuz sakinken hızlıca uygulanır. Mikroçip genellikle ense bölgesine yerleştirilir ve okuyucuyla hemen doğrulanır.",
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
        a: "Yavrularda aşılama genellikle birkaç haftalık dönemde başlar ve belirli aralıklarla tekrarlanan bir seri hâlinde sürer. Başlangıç zamanı; yavrunun yaşı, annesinden aldığı bağışıklık ve yaşam koşullarına göre değişir. Kesin takvimi ilk muayenede dostunuza özel olarak çıkarırız.",
      },
      {
        q: "Mikroçip taktırmak zorunlu mu?",
        a: "Evet. Türkiye'de kedi ve köpeklerin mikroçip ile kimliklendirilip resmî kayıt sistemine işlenmesi yasal bir yükümlülüktür ve uyulmaması idari yaptırıma konu olabilir. Güncel süre ve yükümlülükler değişebildiği için, kliniğe geldiğinizde durumunuzu birlikte gözden geçirmenizi öneririz.",
      },
      {
        q: "Mikroçip takılması dostuma acı verir mi?",
        a: "Mikroçip, biraz kalınca bir iğneyle deri altına yerleştirilir. Çoğu kedi ve köpek bunu kısa bir aşı gibi karşılar ve işlem birkaç saniye sürer. Anestezi gerektirmez; zaten kısırlaştırma gibi bir operasyon planlanıyorsa aynı seansta da yapılabilir.",
      },
      {
        q: "Aşıdan sonra dostumda ne gibi tepkiler görebilirim?",
        a: "Aşı sonrası ilk gün hafif yorgunluk, iştahta geçici azalma ya da aşı yerinde küçük bir hassasiyet görülebilir; bunlar genellikle kısa sürede geçer. Yüzde şişlik, kusma, kaşıntı ya da solunum güçlüğü gibi belirtiler nadirdir ama beklenmez; böyle bir durumda vakit kaybetmeden bizi arayın.",
      },
      {
        q: "Evden hiç çıkmayan kedimin aşıya ihtiyacı var mı?",
        a: "Ev kedilerinde bile bazı etkenler ayakkabı, kıyafet ya da eve gelen başka bir hayvan aracılığıyla taşınabilir. Ayrıca kuduz aşısı yasal ve halk sağlığıyla ilgili bir konudur. Hangi aşıların sizin kedinizin yaşam tarzı için anlamlı olduğunu muayenede birlikte belirleriz.",
      },
      {
        q: "Aşı tarihini kaçırdım, baştan mı başlamak gerekir?",
        a: "Her gecikme baştan başlamayı gerektirmez; ne kadar gecikildiği, hangi aşının atlandığı ve dostunuzun yaşı belirleyicidir. Karnenizi getirin, mevcut durumdan devam edilebilecek en makul planı çıkaralım.",
      },
    ],
    relatedPosts: [
      "kedi-asi-takvimi",
      "kopek-asi-takvimi",
      "mikrocip-ve-yasal-sorumluluklar",
      "mikrocip-cezasi-ve-petvet-2026",
      "pet-pasaportu-favn-testi-ankara",
    
      "kene-cikardim-simdi-ne-olacak",
    ],
  },
  {
    slug: "kisirlastirma-cerrahi",
    icon: Scissors,
    title: "Kısırlaştırma & Cerrahi",
    desc: "Steril ortamda, anestezi takibiyle güvenli ve titiz operasyonlar.",
    h1: "Kısırlaştırma ve Cerrahi Operasyonlar",
    metaTitle: "Kısırlaştırma & Cerrahi · Çankaya Veteriner",
    metaDescription:
      "Çankaya Öveçler'de kedi ve köpek kısırlaştırma ile cerrahi operasyonlar. Ameliyat öncesi hazırlık, anestezi takibi ve sonrası bakım süreci.",
    keywords: [
      "Çankaya kısırlaştırma",
      "kedi kısırlaştırma Ankara",
      "köpek kısırlaştırma Öveçler",
      "veteriner cerrahi Çankaya",
    ],
    intro:
      "Kısırlaştırma, hem istenmeyen yavruların önüne geçen hem de bazı üreme sistemi hastalıklarının riskini azaltan planlı bir operasyondur. Her cerrahi girişim gibi kısırlaştırma da ameliyat öncesi değerlendirme, anestezi süresince kesintisiz takip ve sonrasında düzenli kontrol gerektirir. Bu sayfada süreci baştan sona nasıl yürüttüğümüzü anlatıyoruz.",
    covers: [
      "Ameliyat öncesi fizik muayene ve risk değerlendirmesi",
      "Gerekli görülen durumlarda anestezi öncesi kan tahlili",
      "Dişilerde ve erkeklerde kısırlaştırma operasyonları",
      "Steril ortamda gerçekleştirilen diğer yumuşak doku cerrahileri",
      "Anestezi boyunca solunum, kalp ritmi ve vücut ısısı takibi",
      "Uyanma sürecinde gözlem ve ağrı yönetiminin planlanması",
      "Dikiş kontrolü, yara bakımı ve taburculuk sonrası takip randevusu",
    ],
    visit: [
      {
        step: "Ön görüşme ve değerlendirme",
        text: "Operasyon öncesi dostunuzu muayene eder, yaşını, kilosunu ve varsa kronik sorunlarını değerlendiririz. Gerekiyorsa anestezi öncesi tahlil planlarız.",
      },
      {
        step: "Ameliyat günü hazırlık",
        text: "Aç gelme talimatını sizinle netleştiririz. Kliniğe geldiğinizde son bir kontrol yapar, sürecin nasıl işleyeceğini ve ne zaman haber vereceğimizi anlatırız.",
      },
      {
        step: "Operasyon ve anestezi takibi",
        text: "Operasyon steril koşullarda yapılır. Anestezi süresince yaşamsal değerler kesintisiz izlenir; ekip anestezi ve cerrahi için ayrı ayrı görevlidir.",
      },
      {
        step: "Uyanma ve taburculuk",
        text: "Dostunuz sakin bir bölümde gözlem altında uyanır. Taburcu ederken yara bakımını, kısıtlanması gereken hareketleri ve kontrol tarihini yazılı olarak paylaşırız.",
      },
    ],
    prepare: [
      "Aç kalma süresini randevu sırasında mutlaka teyit edin; su konusunda ayrı talimat veririz",
      "Aşı karnesi ve varsa önceki tahlil sonuçlarınızı getirin",
      "Kullanılan tüm ilaç ve takviyeleri, kutularıyla birlikte bildirin",
      "Evde dostunuzun sakin ve sıcak dinlenebileceği bir alan hazırlayın",
      "Operasyon sonrası ilk gün evde birinin bulunabileceği bir tarih seçin",
      "Yara yalamayı engelleyen yaka veya vücut örtüsü için bize önceden danışın",
    ],
    faqs: [
      {
        q: "Kısırlaştırma için uygun yaş nedir?",
        a: "Uygun zamanlama tek bir sayıya indirgenemez; türe, ırka, beklenen erişkin boyuta ve dostunuzun genel sağlığına göre değişir. Özellikle büyük ırk köpeklerde zamanlama daha dikkatli planlanır. Muayenede dostunuza özel bir zaman aralığı öneririz.",
      },
      {
        q: "Anestezi riskli mi?",
        a: "Her anestezinin bir riski vardır ve bunu sıfırlamak mümkün değildir. Riski azaltmak için ameliyat öncesi muayene yapar, gerektiğinde kan tahlili isteriz ve anestezi süresince yaşamsal değerleri kesintisiz izleriz. Dostunuzun yaşı veya mevcut bir hastalığı riski etkiliyorsa bunu operasyondan önce açıkça konuşuruz.",
      },
      {
        q: "Ameliyat öncesi kan tahlili şart mı?",
        a: "Her vakada zorunlu değildir, ancak özellikle yaşlı dostlarda, kronik hastalığı olanlarda ve öyküsü bilinmeyen hayvanlarda güçlü şekilde öneririz. Bu tahlil, anestezi planını dostunuza göre ayarlamamıza yardımcı olur. Kararı birlikte veririz.",
      },
      {
        q: "Operasyondan sonra iyileşme ne kadar sürer?",
        a: "Çoğu kedi ve köpek ilk günlerde belirgin şekilde toparlanır, dikişlerin kontrolü ise birkaç hafta içinde tamamlanır. Bu süre operasyonun türüne, dostunuzun yaşına ve evde hareketinin ne kadar kısıtlanabildiğine göre değişir. Taburculukta size net bir takip takvimi veririz.",
      },
      {
        q: "Kısırlaştırma dostumu kilo aldırır mı?",
        a: "Kısırlaştırma sonrası enerji ihtiyacı düşebilir, dolayısıyla eski porsiyon devam ederse kilo artışı görülebilir. Bu, kaçınılmaz bir sonuç değil, beslenmenin gözden geçirilmesi gereken bir dönemdir. Operasyon sonrası kontrolde porsiyon ve mama planını birlikte güncelleriz.",
      },
      {
        q: "Ameliyattan sonra dostumda hangi belirtiler beni aramaya yönlendirmeli?",
        a: "Dikiş yerinde açılma, artan kızarıklık veya akıntı, inatçı kusma, hiç yememe, aşırı halsizlik ya da geçmeyen ağrı belirtileri bekleyecek durumlar değildir. Böyle bir durumda kontrol tarihini beklemeden bizi arayın; 7/24 ulaşabilirsiniz.",
      },
    ],
    relatedPosts: [
      "kisirlastirma-rehberi",
      "ameliyat-oncesi-kan-tahlili",
      "evcil-hayvanlarda-obezite",
      "kopeklerde-mide-burulmasi-gdv",
      "veteriner-ucretlerini-ne-belirler",
    
      "kedim-ameliyat-olacak-anestezi-guvenli-mi",
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
    desc: "Cilt ve iç hastalıklarında uzman teşhis ve tedavi yaklaşımı.",
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
    h1: "7/24 Acil Müdahale",
    metaTitle: "7/24 Acil Veteriner · Çankaya, Ankara",
    metaDescription:
      "Çankaya Öveçler'de 7/24 acil veteriner hizmeti. Hangi durumlar acildir, kliniğe gelmeden önce ne yapmalı ve bize nasıl ulaşırsınız.",
    keywords: [
      "acil veteriner Çankaya",
      "7/24 veteriner Ankara",
      "gece açık veteriner Çankaya",
      "Öveçler acil veteriner kliniği",
    ],
    intro:
      "Acil durumlar plan yapmaya izin vermez. Bu nedenle kliniğimiz kesintisiz açıktır ve telefonla her saat ulaşabilirsiniz. Bu sayfanın amacı, hangi belirtilerin beklemeye gelmediğini tanımanıza ve yola çıkmadan önce hangi bilgileri hazırlayacağınızı bilmenize yardımcı olmaktır. Tereddüt ettiğiniz her durumda aramak doğru olandır.",
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
        q: "Gece de açık mısınız?",
        a: "Evet, kliniğimiz kesintisiz hizmet vermektedir ve acil durumlarda gece saatlerinde de telefonla ulaşabilirsiniz. Gelmeden önce aramanız, hem yönlendirme almanızı hem de biz hazırlanırken zaman kazanmanızı sağlar.",
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
    relatedPosts: [
      "veteriner-acil-hangi-durumlar",
      "evcil-hayvanlarda-zehirlenme",
      "kedilerde-idrar-tikanikligi-flutd",
      "kopeklerde-mide-burulmasi-gdv",
      "kedilerde-nefes-darligi",
    
      "kopekte-nobet-havale-ne-yapmali",
      "kedi-kum-kabina-girip-cikiyor-idrar-yapamiyor",
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
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
