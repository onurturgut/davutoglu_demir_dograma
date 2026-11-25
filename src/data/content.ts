import stairsAsset from "@/assets/metal-stairs.jpg";
const assetPath = (asset: { src: string } | string) =>
  typeof asset === "string" ? asset : asset.src;
const gate = "/projects/davutoglu/surgulu-bahce-kapisi.webp";
const stairs = assetPath(stairsAsset);
const storage = "/projects/davutoglu/metal-odunluk.webp";
const workshop = "/projects/davutoglu/atolye-imalat.webp";
export const images = { gate, stairs, storage, workshop };
export type FAQ = { question: string; answer: string };
export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  content: string;
  uses: string[];
  faqs: FAQ[];
};
export const services: Service[] = [
  {
    slug: "bahce-kapisi",
    title: "Demir ve Bahçe Kapıları",
    description: "Mekânınıza uyum sağlayan, özel ölçülü kapı çözümleri.",
    image: gate,
    category: "Kapılar",
    content:
      "Bahçe, bina ve garaj girişleri için metal kapı seçeneklerini birlikte değerlendirebiliriz. Açılış yönü, net geçiş genişliği ve çevredeki mimari, tasarımın başlangıç noktalarıdır. Dış mekânda yüzey koruması ve suyun birikmesini önleyen detaylar önemlidir.",
    uses: [
      "Bahçe ve avlu girişleri",
      "Bina giriş kapıları",
      "Garaj ve işletme girişleri",
    ],
    faqs: [
      {
        question: "Kapı için teklif alırken hangi bilgiler gerekir?",
        answer:
          "Yaklaşık en ve yükseklik, mevcut girişin fotoğrafı, kullanım amacı ve tercih ettiğiniz model başlangıç için yeterlidir. Kesin ölçüler uygulamadan önce değerlendirilmelidir.",
      },
      {
        question: "Dış mekânda hangi yüzey seçilmeli?",
        answer:
          "Nem, yağış ve kullanım koşullarına uygun korozyon koruması değerlendirilmelidir. Boya veya kaplama seçimi malzemeye ve uygulama ortamına bağlıdır.",
      },
    ],
  },
  {
    slug: "metal-merdiven",
    title: "Metal Merdivenler",
    description:
      "İç ve dış mekânlar için işlevsel, dengeli merdiven tasarımları.",
    image: stairs,
    category: "Merdivenler",
    content:
      "Metal merdivenlerde kat yüksekliği, kullanılabilir alan ve geçiş düzeni birlikte ele alınır. Düz, dönüşlü veya farklı planlı seçenekler mekâna göre değerlendirilir. Taşıyıcı sistem, bağlantılar, kaymazlık ve korkuluk ihtiyacı teknik inceleme gerektirir; yangın merdivenleri ayrıca ilgili mevzuata uygun tasarlanmalıdır.",
    uses: [
      "Dış mekân kat bağlantıları",
      "İç mekân ve asma kat erişimi",
      "Yangın kaçış merdiveni talepleri",
    ],
    faqs: [
      {
        question: "Merdiven ölçüleri nasıl belirlenir?",
        answer:
          "Kat yüksekliği ve kullanılabilir yatay alan ölçülür. Basamak ve sahanlık düzeni, kullanım ve ilgili mevzuat dikkate alınarak uzman tarafından belirlenmelidir.",
      },
      {
        question: "Yangın merdiveni her yere uygulanabilir mi?",
        answer:
          "Kaçış güzergâhı ve yapı koşulları incelenmeden karar verilmemelidir. Gerekli proje, izin ve mevzuat koşulları yetkili uzmanlarla değerlendirilmelidir.",
      },
    ],
  },
  {
    slug: "korkuluk-sistemleri",
    title: "Korkuluk Sistemleri",
    description:
      "Balkon, merdiven ve teraslarda mimariyle bütünleşen detaylar.",
    image: stairs,
    category: "Korkuluklar",
    content:
      "Korkuluk tasarımında görünüm kadar bağlantı zemini ve kullanım güvenliği de önemlidir. Balkon, teras ve merdiven için dolgu aralıkları, yükseklik ve bağlantı yöntemi ayrı değerlendirilir. Çocukların kullanacağı alanlarda tırmanmayı kolaylaştıran yatay elemanlardan kaçınmak gerekebilir.",
    uses: [
      "Balkon ve teras kenarları",
      "Merdiven korkulukları",
      "Bahçe sınırları",
    ],
    faqs: [
      {
        question: "Korkuluk modelini nasıl seçmeliyim?",
        answer:
          "Mekânın mimarisi, kullanıcılar, bakım ihtiyacı ve güvenlik koşulları birlikte değerlendirilmelidir. Görsel beğeni tek başına yeterli bir seçim ölçütü değildir.",
      },
    ],
  },
  {
    slug: "metal-cati",
    title: "Çardak ve Metal Çatı İşleri",
    description:
      "Dış mekânlarınıza uygun metal taşıyıcı ve üst örtü çözümleri.",
    image: gate,
    category: "Dış Mekân",
    content:
      "Bahçe çardağı ve metal çatı işlerinde açıklık, zemin, yağış ve rüzgâr koşulları tasarımı etkiler. Taşıyıcı sistem ile üst örtü malzemesi birlikte düşünülmelidir. Yapısal hesap ve gerekli izinler uygulama öncesinde uzmanlarca değerlendirilmelidir.",
    uses: ["Bahçe çardakları", "Teras üst örtüleri", "Metal çatı taşıyıcıları"],
    faqs: [
      {
        question: "Çardak için zemin önemli mi?",
        answer:
          "Evet. Ankrajın güvenliği ve taşıyıcının davranışı zemin koşullarıyla ilişkilidir. Mevcut zeminin uygulamaya uygunluğu incelenmelidir.",
      },
    ],
  },
  {
    slug: "endustriyel-metal-urunler",
    title: "Endüstriyel Metal Ürünler",
    description: "Atölye ve işletmelere özel raf, tezgâh ve servis arabaları.",
    image: storage,
    category: "Endüstriyel",
    content:
      "Raf, çalışma tezgâhı ve metal servis arabası tasarımında kullanım yoğunluğu, yerleşim ve taşınacak yükler belirleyicidir. Bölme ölçüleri, tezgâh yüksekliği ve tekerlek ihtiyacı çalışma alanınıza göre değerlendirilir. Taşıma kapasitesi hesap veya doğrulama olmadan varsayılmamalıdır.",
    uses: [
      "Metal raf ve depolama sistemleri",
      "Çalışma tezgâhları",
      "Metal servis arabaları",
    ],
    faqs: [
      {
        question: "Bir rafın yük kapasitesi nasıl belirlenir?",
        answer:
          "Profil, açıklık, bağlantı ve zemin koşulları birlikte hesaplanmalıdır. Görselden kapasite çıkarılamaz; kullanım yükünüzü teklif talebinde paylaşın.",
      },
    ],
  },
  {
    slug: "ozel-metal-imalat",
    title: "Özel İmalat ve Kaynak",
    description: "Fikrinize ve ihtiyacınıza göre şekillenen metal üretimi.",
    image: workshop,
    category: "Özel İmalat",
    content:
      "Standart ürünlerin karşılamadığı ihtiyaçlar için özel ölçülü metal ürünler değerlendirilebilir. Bir eskiz, referans görsel veya kullanım senaryosu fikri somutlaştırmaya yardımcı olur. Kaynak ve onarım taleplerinde mevcut malzemenin türü, durumu ve kullanım amacı incelenmelidir.",
    uses: [
      "Özel metal odunluklar",
      "Dekoratif metal ürünler",
      "Kaynak ve onarım talepleri",
    ],
    faqs: [
      {
        question: "Çizim olmadan özel imalat talep edebilir miyim?",
        answer:
          "Evet. İhtiyacınızın fotoğrafı, yaklaşık ölçüler veya basit bir eskiz ile başlayabilirsiniz. Uygulanabilirlik ve teknik detaylar ayrıca görüşülmelidir.",
      },
    ],
  },
];
export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  serviceSlug: string;
  description: string;
  kind: string;
  gallery?: { url: string; alt: string }[];
  content?: string;
  location?: string;
  material?: string;
  dimensions?: string;
};
export const projects: Project[] = [
  {
    slug: "surgulu-bahce-kapisi",
    title: "Sürgülü Bahçe Kapısı",
    category: "Kapılar",
    image: gate,
    serviceSlug: "bahce-kapisi",
    kind: "Gerçek uygulama",
    description:
      "Yatay metal çizgilerle üretilen, yaya geçiş bölümü bulunan sürgülü bahçe kapısı uygulaması.",
    content:
      "Davutoğlu Demir Doğrama atölyesinde üretilen sürgülü kapı; geniş araç geçişi ile yaya kullanımını aynı tasarımda birleştiriyor.",
    location: "Elazığ",
    material: "Çelik kutu profil ve metal panel",
  },
  {
    slug: "metal-odunluk",
    title: "Özel Tasarım Metal Odunluk",
    category: "Özel İmalat",
    image: storage,
    serviceSlug: "ozel-metal-imalat",
    kind: "Gerçek uygulama",
    description:
      "Bahçe kullanımına uygun, koruyucu çatılı ve yan panelli metal odunluk uygulaması.",
    content:
      "Yakacak odunların düzenli ve hava alarak saklanması için üretilen dış mekân odunluğu, metal taşıyıcı karkas ve üst örtüden oluşuyor.",
    location: "Elazığ",
    material: "Çelik kutu profil ve metal çatı örtüsü",
  },
  {
    slug: "endustriyel-servis-arabalari",
    title: "Endüstriyel Servis Arabaları",
    category: "Endüstriyel",
    image: "/projects/davutoglu/servis-arabasi.webp",
    serviceSlug: "endustriyel-metal-urunler",
    kind: "Atölye üretimi",
    description:
      "İşletme kullanımına göre ölçülendirilmiş metal raf, tezgâh ve tekerlekli servis arabaları.",
    content:
      "Kutu profilden imal edilen ürünler, çalışma alanındaki depolama ve taşıma ihtiyacına göre farklı genişlik ve raf düzenleriyle üretildi.",
    location: "Davutoğlu Demir Doğrama Atölyesi",
    material: "Çelik kutu profil ve sac tabla",
    gallery: [
      {
        url: "/projects/davutoglu/atolye-imalat.webp",
        alt: "Davutoğlu Demir Doğrama atölyesinde metal imalat süreci",
      },
      {
        url: "/projects/davutoglu/atolye-urunler.webp",
        alt: "Atölyede üretilen metal raf ve servis arabaları",
      },
      {
        url: "/projects/davutoglu/atolye-raflar-1.webp",
        alt: "Özel ölçülü metal rafların atölye görünümü",
      },
      {
        url: "/projects/davutoglu/atolye-raflar-2.webp",
        alt: "Metal raf ve çalışma tezgâhı imalatları",
      },
      {
        url: "/projects/davutoglu/atolye-raflar-3.webp",
        alt: "Üretim aşamasındaki endüstriyel metal ürünler",
      },
    ],
  },
  {
    slug: "kablo-tavasi-uygulamasi",
    title: "Endüstriyel Kablo Tavası Uygulaması",
    category: "Endüstriyel",
    image: "/projects/davutoglu/kablo-tavasi-detay.webp",
    serviceSlug: "endustriyel-metal-urunler",
    kind: "Gerçek uygulama",
    description:
      "Duvar ve kolon hatlarına uygun biçimde gerçekleştirilen metal kablo tavası montajı.",
    content:
      "Endüstriyel alandaki kablo güzergâhı, duvar ve betonarme kolonlara sabitlenen konsollarla oluşturuldu.",
    location: "Elazığ",
    material: "Galvaniz kablo tavası ve metal konsollar",
  },
  {
    slug: "celik-cati-projelendirme",
    title: "Çelik Çatı Projelendirme",
    category: "Teknik Çizimler",
    image: "/projects/davutoglu/celik-cati-teknik-proje.webp",
    serviceSlug: "metal-cati",
    kind: "Teknik proje",
    description:
      "Çelik çatı taşıyıcı sisteminin ölçülendirme, üç boyutlu modelleme ve imalat çizimleri.",
    content:
      "Çatı geometrisi, kolon yerleşimi, makaslar ve aşıklar üretim öncesinde SolidWorks ortamında modellenerek teknik paftalara aktarıldı.",
    material: "Çelik kutu profil",
    gallery: [
      {
        url: "/projects/davutoglu/celik-cati-3d-model.webp",
        alt: "SolidWorks ortamında çelik çatı üç boyutlu modeli",
      },
      {
        url: "/projects/davutoglu/celik-cati-cizim-1.webp",
        alt: "Çelik çatı ölçülü teknik çizim paftası",
      },
      {
        url: "/projects/davutoglu/celik-cati-cizim-2.webp",
        alt: "Çelik çatı farklı görünüşlerini gösteren imalat çizimi",
      },
    ],
  },
  {
    slug: "metal-kabin-tasarimi",
    title: "Özel Ölçülü Metal Kabin Tasarımı",
    category: "Teknik Çizimler",
    image: "/projects/davutoglu/metal-kabin-teknik.webp",
    serviceSlug: "ozel-metal-imalat",
    kind: "Ölçülü tasarım",
    description:
      "Kapı, pencere ve sandviç panel çatı detayları ölçülendirilmiş özel metal kabin çalışması.",
    content:
      "Üretim öncesi ölçülendirme çalışmasında kabinin toplam genişlik, derinlik ve yüksekliği ile kapı ve pencere boşlukları tanımlandı.",
    material: "Çelik kutu profil ve sandviç panel",
    dimensions: "150 × 186 × 240 cm",
  },
];
export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  serviceSlug: string;
  sections: { title: string; text: string }[];
  faqs: FAQ[];
};
export const articles: Article[] = [
  {
    slug: "demir-bahce-kapisi-secimi",
    title: "Demir Bahçe Kapısı Seçerken Nelere Dikkat Edilmeli?",
    category: "Demir Kapılar",
    excerpt:
      "Ölçü, kullanım, malzeme ve tasarım: doğru kapı seçiminin temel noktaları.",
    image: gate,
    serviceSlug: "bahce-kapisi",
    sections: [
      {
        title: "Önce kullanım ihtiyacınızı belirleyin",
        text: "Yaya geçişi ile araç girişinin gereksinimleri farklıdır. Giriş genişliği, günlük açılma sıklığı ve açılacak kanatların kaplayacağı alanı değerlendirin. Eğimli zemin ve dar girişlerde açılış yönü ayrıca önem kazanır.",
      },
      {
        title: "Ölçü ve bağlantı noktalarını birlikte düşünün",
        text: "Yalnızca açıklığın en ve boy ölçüsü yeterli değildir. Yan duvarların durumu, taşıyıcı direkler ve zemin bağlantıları da kontrol edilmelidir. Teklif için fotoğraf ve yaklaşık ölçü paylaşılabilir; üretim ölçüleri uygulama öncesinde netleştirilmelidir.",
      },
      {
        title: "Yüzey koruması ve bakım",
        text: "Dış mekân metalleri nem ve yağışa maruz kalır. Malzemeye uygun boya veya kaplama seçimi, su biriken detaylardan kaçınma ve düzenli bakım ömrü etkiler. Kaplama hasarları erken fark edilmeli, uygun yöntemle giderilmelidir.",
      },
    ],
    faqs: [
      {
        question: "Elazığ’da özel ölçülü demir kapı için ne hazırlamalıyım?",
        answer:
          "Giriş fotoğrafı, yaklaşık genişlik ve yükseklik, yaya veya araç kullanım bilgisi ve beğendiğiniz model teklif görüşmesini kolaylaştırır.",
      },
    ],
  },
  {
    slug: "metal-merdiven-modelleri",
    title: "Metal Merdiven Modelleri ve Kullanım Alanları",
    category: "Metal Merdivenler",
    excerpt:
      "İç ve dış mekân için merdiven planını belirlerken düşünmeniz gerekenler.",
    image: stairs,
    serviceSlug: "metal-merdiven",
    sections: [
      {
        title: "Düz, dönüşlü ve spiral seçenekler",
        text: "Düz merdivenler doğrudan bir güzergâh sağlar; dönüşlü merdivenler sahanlıklarla yerleşime uyarlanabilir. Spiral modeller sınırlı alanda kullanılabilse de eşya taşıma ve kullanım kolaylığı bakımından farklı gereksinimler doğurur.",
      },
      {
        title: "Güvenlik tasarımın bir parçasıdır",
        text: "Basamak geometrisi, kaymazlık, korkuluk ve aydınlatma birlikte ele alınmalıdır. Taşıyıcı hesapları ve bağlantılar uzman tarafından değerlendirilmelidir. Yangın kaçış merdivenleri genel bir model seçimiyle değil, ilgili mevzuat ve yapı koşullarıyla belirlenir.",
      },
      {
        title: "Dış mekânda malzeme koruması",
        text: "Yağışa açık basamaklarda su tahliyesi ve yüzey tutuşu önemlidir. Korozyona karşı koruma, malzemeye ve çevresel koşullara uygun seçilmeli; bağlantılar düzenli kontrol edilmelidir.",
      },
    ],
    faqs: [
      {
        question: "En az alan kaplayan merdiven her zaman doğru seçim mi?",
        answer:
          "Hayır. Erişim amacı, kullanıcı ihtiyaçları ve güvenlik şartları, yalnızca yer tasarrufundan daha önemlidir.",
      },
    ],
  },
  {
    slug: "demir-celik-korkuluk-farklari",
    title: "Demir Korkuluk ile Çelik Korkuluk Arasındaki Farklar",
    category: "Korkuluklar",
    excerpt:
      "Malzeme adlandırmaları, yüzey seçenekleri ve kullanım koşulları üzerine.",
    image: stairs,
    serviceSlug: "korkuluk-sistemleri",
    sections: [
      {
        title: "Günlük dilde demir ve çelik",
        text: "Piyasada “demir korkuluk” olarak anılan pek çok ürün aslında karbon çeliği profillerden üretilir. Çelik, demir esaslı bir alaşımdır. Dolayısıyla yalnızca ürün adına bakarak kesin malzeme farkı çıkarmak doğru değildir.",
      },
      {
        title: "Karbon çeliği ve paslanmaz çelik",
        text: "Karbon çeliği çoğunlukla uygun yüzey korumasına ihtiyaç duyar. Paslanmaz çeliğin korozyon davranışı ise alaşım sınıfına ve ortama bağlıdır; tüm paslanmaz ürünler her ortamda bakım gerektirmez denemez.",
      },
      {
        title: "Seçimde güvenlik ve bakım",
        text: "Malzeme türü kadar yükseklik, dolgu aralıkları ve bağlantı yöntemi önem taşır. İmalatçıdan malzeme bilgisi ve bakım önerilerini isteyin; farklı teklifleri aynı teknik özellikler üzerinden karşılaştırın.",
      },
    ],
    faqs: [
      {
        question: "Paslanmaz çelik hiç paslanmaz mı?",
        answer:
          "Yanlış malzeme sınıfı, yüzey kirlenmesi veya agresif ortamlar korozyona neden olabilir. Uygun sınıf ve bakım önemlidir.",
      },
    ],
  },
  {
    slug: "ozel-olculu-metal-imalat",
    title: "Özel Ölçülü Metal İmalat Süreci Nasıl İşler?",
    category: "Metal İmalat",
    excerpt:
      "Fikrinizi üretilebilir bir talebe dönüştürmek için pratik bir rehber.",
    image: workshop,
    serviceSlug: "ozel-metal-imalat",
    sections: [
      {
        title: "İhtiyacı tarif etmek",
        text: "Ürünün nerede kullanılacağı, ne taşıyacağı ve mevcut alana nasıl yerleşeceği açıkça belirtilmelidir. Referans fotoğraf veya eskiz, beklentiyi anlatmayı kolaylaştırır. Aynı görsel farklı ölçülerde farklı teknik çözümler gerektirebilir.",
      },
      {
        title: "Ölçü ve teknik değerlendirme",
        text: "Yaklaşık ölçüler başlangıçta faydalıdır; kesin ölçüler, bağlantı detayları ve malzeme seçimi daha sonra değerlendirilir. Taşıyıcı ürünlerde hesap ihtiyacı göz ardı edilmemelidir.",
      },
      {
        title: "Teklifin kapsamını netleştirmek",
        text: "Malzeme, yüzey işlemi, taşıma ve montajın teklife dahil olup olmadığını sorun. Termin ve uygulama koşulları karşılıklı görüşmeyle belirlenmelidir. Bu rehber genel bir süreç taslağıdır; işletmeye ait kesin iş akışı vaadi değildir.",
      },
    ],
    faqs: [
      {
        question: "Basit bir çizim yeterli mi?",
        answer:
          "İlk görüşme için yeterli olabilir. Üretim kararı teknik uygunluk ve netleştirilmiş ölçülere bağlıdır.",
      },
    ],
  },
  {
    slug: "dis-mekan-metal-bakimi",
    title: "Dış Mekân Metal Ürünlerinin Bakımı Nasıl Yapılır?",
    category: "Bakım ve Kullanım",
    excerpt:
      "Düzenli temizlik ve yüzey kontrolüyle metal ürünlerinizi koruyun.",
    image: gate,
    serviceSlug: "bahce-kapisi",
    sections: [
      {
        title: "Nazik ve düzenli temizlik",
        text: "Yüzeye uygun yumuşak bez ve hafif temizlik ürünleri kullanın. Aşındırıcı süngerler ve güçlü kimyasallar koruyucu kaplamayı zedeleyebilir. Temizlikten sonra su biriken bölgeleri kurulayın.",
      },
      {
        title: "Yüzey hasarlarını erken fark edin",
        text: "Boya kabarması, çizikler ve pas izleri düzenli olarak kontrol edilmelidir. Onarım yöntemi kaplamaya göre değişir. Geniş korozyon veya bağlantı gevşemesi varsa uzman değerlendirmesi alın.",
      },
      {
        title: "Hareketli parçalar ve bağlantılar",
        text: "Kapı menteşeleri, kilitler ve hareketli mekanizmalar üreticinin bakım önerilerine göre kontrol edilmelidir. Ağır kanatları veya taşıyıcı bağlantıları güvenlik önlemleri olmadan sökmeyin.",
      },
    ],
    faqs: [
      {
        question: "Paslı yüzeyi doğrudan boyamak yeterli mi?",
        answer:
          "Genellikle hayır. Gevşek pas ve hasarlı kaplama uygun şekilde giderilmeli, yüzey hazırlanmalı ve uyumlu koruyucu sistem uygulanmalıdır.",
      },
    ],
  },
  {
    slug: "endustriyel-raf-tezgah-secimi",
    title: "Endüstriyel Raf ve Metal Çalışma Tezgâhı Seçimi",
    category: "Teknik Bilgiler",
    excerpt: "Yük, ergonomi ve çalışma düzenini birlikte değerlendirin.",
    image: storage,
    serviceSlug: "endustriyel-metal-urunler",
    sections: [
      {
        title: "Yük ihtiyacını somutlaştırın",
        text: "Raflarda toplam yük ile raf başına yük ayrı belirtilmelidir. Noktasal yükler, açıklıklar ve bağlantılar kapasiteyi etkiler. Kapasiteyi yalnızca profil kalınlığı veya fotoğraf üzerinden değerlendirmeyin.",
      },
      {
        title: "Çalışma tezgâhında ergonomi",
        text: "Tezgâh yüksekliği yapılan işe ve kullanıcının duruşuna göre seçilmelidir. Hassas montaj ile ağır işlerin çalışma ihtiyaçları farklıdır. Sık kullanılan araçları erişilebilir konumda tutmak gereksiz hareketleri azaltır.",
      },
      {
        title: "Yerleşim ve hareket alanı",
        text: "Koridorlar, acil geçişler ve malzeme taşıma yolları açık kalmalıdır. Servis arabalarında tekerlek seçimi, fren ve denge kullanım zeminiyle birlikte değerlendirilmelidir.",
      },
    ],
    faqs: [
      {
        question: "Özel ölçülü raf için hangi bilgiler gerekir?",
        answer:
          "Alan ölçüleri, raf başına taşınacak yük, ürün boyutları ve kullanım ortamı paylaşılmalıdır.",
      },
    ],
  },
];
