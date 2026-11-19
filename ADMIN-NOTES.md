# Yönetim paneli — yerel frontend prototipi

## Tamamlanan alanlar
- `/admin`: yerel içerik sayıları, yayın/taslak durumu, son düzenlenen içerikler.
- `/admin/homepage`: başlık, görsel ve buton alanları; mevcut bölümlerin aktifliği, sırası, öne çıkan içerik seçimi ve önizleme.
- `/admin/services`, `/admin/projects`, `/admin/blog`: arama, kategori/durum filtreleri, oluşturma, düzenleme, çoğaltma, onaylı silme, taslak kaydı, önizleme, yerel yayın ve yayından kaldırma.
- Blog editörü: H2/H3, paragraf, kalın/italik, listeler, bağlantı, görsel, alıntı, geri al/yinele. İçerik React öğeleriyle güvenli olarak görüntülenir.
- Proje galerisi: görsel seçme, sıra değiştirme, kapak belirleme ve alternatif metin.
- `/admin/contact-social`, `/admin/faqs`, `/admin/seo-geo`, `/admin/media`, `/admin/settings`: iletişim, sosyal bağlantılar, SSS, içerik kontrolleri, medya ve güvenli görünüm ayarları.
- `/admin/preview`: kaydedilmiş taslakların site görünümü.
- Ana sayfa: GSAP ScrollTrigger ile başlık/kart geçişleri ve kaydırmaya bağlı hafif görsel hareketi; azaltılmış hareket tercihi desteklenir.

## Saklama ve sınırlar
Yönetim alanı önce e-posta/şifre giriş tasarımını gösterir. Giriş yap butonu yalnızca demo panelini açar; e-posta ve şifre doğrulanmaz, kaydedilmez veya gönderilmez. Bilgi girmeden demo paneli de açılabilir. Çıkış ve sayfa yenileme giriş tasarımına döner. Bu ekran erişim kontrolü veya gerçek oturum sağlamaz.

İçerikler ve ayarlar `localStorage` içinde, yüklenen görseller `IndexedDB` içinde saklanır. Aynı tarayıcı ve site adresindeki sekmeler arasında yerel yayınlar paylaşılır. Başka cihazlara veya herkese açık sunucuya gönderilmez. Tarayıcı verileri silinirse kayıtlar kaybolur.

JSON dışa aktarma içerik ve ayarları kapsar; yüklenen görsel dosyalarını kapsamaz. İçe aktarma şema doğrulaması ve üzerine yazma onayı ister. Görseller JPEG/PNG/WebP/GIF ve en fazla 8 MB olabilir. Depolama/yükleme hataları arayüzde gösterilir.

Yerel SEO düzenlemeleri sunucuya veya arama motorlarına yayınlanmaz. Gerçek alan adı sağlanmadan kalıcı canonical veya sitemap adresi oluşturulmaz. Başlangıç içerikleri SSR ile sunulur; tarayıcıya özel yayınlar yükleme sonrası görünür.

## Üretim aşamasında gerekenler
Gerçek yönetici girişi ve yetkilendirme, merkezi veritabanı, güvenli medya depolama, sunucu tarafı doğrulama, gerçek yayınlama ve audit log gerekir. Bu panel güvenli bir üretim yönetici alanı olarak değerlendirilmemelidir. Bu aşamada bunlar eklenmemiştir.