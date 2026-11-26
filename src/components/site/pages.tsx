"use client";
import { useHomeScroll } from "@/hooks/use-home-scroll";
import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  MessageCircle,
  Ruler,
  Hammer,
  Phone,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  images,
  type Service,
  type Project,
  type Article,
} from "@/data/content";
import {
  usePublicData,
  useBusiness,
  usePublishedSettings,
} from "@/lib/cms/store";
import { MediaImage } from "@/components/admin/media-image";
import { RichContent } from "@/components/admin/rich-text";
import type { Entry } from "@/lib/cms/model";
import { publicMediaUrl } from "@/lib/media-url";
import {
  SectionTitle,
  PageIntro,
  ServiceCard,
  ProjectCard,
  ArticleCard,
  FAQs,
} from "./content";
import { ContactBand, ContactButtons } from "./shell";

const marketingMessages = [
  { lead: "ELAZIĞ'DA", highlight: "ÜCRETSİZ KEŞİF" },
  { lead: "ÖZEL ÖLÇÜ", highlight: "DEMİR DOĞRAMA" },
  { lead: "BAHÇE KAPISI VE", highlight: "KORKULUK SİSTEMLERİ" },
  { lead: "ÇARDAK VE", highlight: "METAL ÇATI İŞLERİ" },
  { lead: "ATÖLYEDEN", highlight: "ÖZEL METAL İMALAT" },
  { lead: "ÖZENLİ İŞÇİLİK", highlight: "ZAMANINDA TESLİMAT" },
];

function MarketingTicker() {
  return (
    <section
      className="marketing-ticker"
      aria-label="Davutoğlu Demir Doğrama hizmetleri"
    >
      <h2 className="sr-only">
        Elazığ demir doğrama ve metal imalat hizmetleri
      </h2>
      <ul className="sr-only">
        {marketingMessages.map((message) => (
          <li key={`${message.lead}-${message.highlight}`}>
            {message.lead} {message.highlight}
          </li>
        ))}
      </ul>
      <div className="marketing-ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marketing-ticker-group" key={copy}>
            {marketingMessages.map((message) => (
              <span
                className="marketing-ticker-message"
                key={`${copy}-${message.lead}-${message.highlight}`}
              >
                <span>{message.lead}</span>
                <strong>{message.highlight}</strong>
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);
  const playShowcaseVideo = () => {
    const video = showcaseVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.scrollIntoView({ behavior: "smooth", block: "center" });
    void video.play();
  };
  const { services, projects, articles } = usePublicData();
  const businessConfig = useBusiness();
  const whatsappUrl = businessConfig.whatsappUrl;
  const settings = usePublishedSettings();
  const scrollRef = useHomeScroll(JSON.stringify(settings));
  const hero = settings.hero;
  const section = (id: string) => settings.sections.find((s) => s.id === id);
  const pick = <T extends { slug: string }>(items: T[], id: string) =>
    items.filter((item) => section(id)?.selected.includes(item.slug));
  const blocks: Record<string, React.ReactNode> = {
    hero: (
      <>
        <section className="home-hero">
          <div className="hero-photo">
            <img
              src={publicMediaUrl("/brand/davutoglu-hero-background.png")}
              alt=""
              aria-hidden="true"
            />
            <video
              className="hero-video hero-video-mobile"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source
                src="/videos/davutoglu-promo-mobile.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="container hero-content">
            <span className="hero-location">
              <MapPin size={14} />
              {hero.label}
            </span>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
            <div className="button-row">
              <Button size="lg" variant="secondary" onClick={playShowcaseVideo}>
                <PlayCircle />
                Tanıtım Filmini İzle
              </Button>
              <Button asChild size="lg" variant="hero">
                <a href={hero.secondaryHref}>
                  {hero.secondaryText}
                  <ArrowRight />
                </a>
              </Button>
            </div>
            <span className="hero-brand">
              <img
                src={publicMediaUrl("/brand/davutoglu-logo.png")}
                alt=""
                aria-hidden="true"
              />
              <span>DAVUTOĞLU DEMİR DOĞRAMA</span>
            </span>
          </div>
          <div className="hero-bottom">
            <span>İHTİYACA ÖZEL ÜRETİM. ÖZENLİ METAL İŞÇİLİĞİ.</span>
            <span>Temsilî tanıtım videosu</span>
          </div>
        </section>
        <MarketingTicker />
        <section className="showcase-section" aria-labelledby="showcase-title">
          <div className="container showcase-grid">
            <div className="showcase-media-column">
              <div className="showcase-video-stage">
                <div className="showcase-video-frame">
                  <video
                    ref={showcaseVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  >
                    <source
                      src="/videos/davutogludemir2.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
              <div className="showcase-actions">
                <button
                  type="button"
                  className="showcase-button showcase-button-primary"
                  onClick={playShowcaseVideo}
                >
                  <PlayCircle aria-hidden="true" />
                  Tanıtımı İzle
                </button>
                <Link
                  className="showcase-button showcase-button-secondary"
                  to="/iletisim"
                >
                  İletişime Geç
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="showcase-copy">
              <span className="showcase-kicker">
                METALDE USTALIK, TASARIMDA KARAKTER
              </span>
              <div className="showcase-logo-motion" aria-hidden="true">
                <img src={publicMediaUrl("/brand/davutoglu-logo.png")} alt="" />
              </div>
              <h2 id="showcase-title">
                Demiri hayalinizdeki <em>forma</em> dönüştürüyoruz.
              </h2>
              <p>
                Tasarımdan imalata, her ayrıntıda güçlü işçilik ve zamansız bir
                duruş.
              </p>
            </div>
          </div>
        </section>
      </>
    ),
    services: (
      <section className="section container">
        <SectionTitle
          eyebrow="HİZMETLERİMİZ"
          title={section("services")?.title || ""}
          description={section("services")?.description || ""}
        >
          <Link className="text-link" to="/hizmetler">
            Tüm Hizmetler
            <ArrowUpRight size={17} />
          </Link>
        </SectionTitle>
        <div className="service-grid">
          {pick(services, "services").map((item, i) => (
            <ServiceCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>
    ),
    projects: (
      <section className="section project-section">
        <div className="container">
          <SectionTitle
            eyebrow="PROJE SEÇKİSİ"
            title={section("projects")?.title || ""}
            description={section("projects")?.description || ""}
          >
            <Link className="text-link" to="/projeler">
              Tüm Projeleri Gör
              <ArrowUpRight size={17} />
            </Link>
          </SectionTitle>
          <p className="content-note">
            Davutoğlu Demir Doğrama'nın gerçek uygulama, atölye ve teknik
            projelendirme çalışmalarından seçkiler.
          </p>
          <div className="project-grid">
            {pick(projects, "projects").map((item) => (
              <ProjectCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    ),
    about: <AboutSection />,
    process: (
      <section className="section container process-section">
        <SectionTitle
          eyebrow="ÜRETİM YAKLAŞIMI"
          title={section("process")?.title || ""}
        />
        <div className="process-grid">
          {[
            {
              icon: MessageCircle,
              title: "İhtiyacınızı Paylaşın",
              text: "Fikrinizi, kullanım alanını ve beklentinizi konuşalım.",
            },
            {
              icon: Ruler,
              title: "Ölçü ve Tasarımı Belirleyelim",
              text: "Ölçüleri ve uygun tasarım seçeneklerini değerlendirelim.",
            },
            {
              icon: Hammer,
              title: "İmalat Sürecini Planlayalım",
              text: "Kapsamı ve uygulama koşullarını birlikte görüşelim.",
            },
          ].map((item, i) => (
            <div key={item.title}>
              <div className="process-top">
                <item.icon size={25} />
                <span>0{i + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <p className="content-note">
          Genel bir süreç taslağıdır. Kapsam ve uygulama koşulları görüşme
          sırasında netleştirilir.
        </p>
      </section>
    ),
    blog: (
      <section className="section blog-section">
        <div className="container">
          <SectionTitle
            eyebrow="BLOG & REHBER"
            title={section("blog")?.title || ""}
            description={section("blog")?.description || ""}
          >
            <Link className="text-link" to="/blog">
              Tüm Yazılar
              <ArrowUpRight size={17} />
            </Link>
          </SectionTitle>
          <div className="article-grid">
            {pick(articles, "blog").map((item) => (
              <ArticleCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    ),
    contact: <ContactBand />,
  };
  return (
    <main ref={scrollRef}>
      {settings.sections
        .filter(
          (s) =>
            s.active &&
            (s.id !== "blog" || settings.site.showBlog) &&
            (s.id !== "projects" || settings.site.showProjects),
        )
        .map((s) => (
          <div key={s.id}>{blocks[s.id]}</div>
        ))}
    </main>
  );
}
function AboutSection() {
  const settings = usePublishedSettings();
  const about = settings.sections.find((s) => s.id === "about");
  const aboutImage =
    !about?.image || about.image === "/projects/davutoglu/atolye-imalat.webp"
      ? images.workshop
      : about.image;
  return (
    <section className="section container about-section">
      <div className="about-image">
        <MediaImage
          src={aboutImage}
          alt="Davutoğlu Demir Doğrama atölyesinin dış cephe görünümü"
          width={1536}
          height={1024}
          loading="lazy"
        />
        <span className="image-label">Davutoğlu atölyesi</span>
      </div>
      <div>
        <span className="eyebrow">DAVUTOĞLU DEMİR DOĞRAMA</span>
        <h2>{about?.title || "İşimize özen, üretime değer katıyoruz."}</h2>
        <p>{about?.description}</p>
        <p>
          Kapıdan korkuluğa, merdivenden özel tasarıma; kullanım amacını, ölçüyü
          ve mekânın karakterini bir arada değerlendiriyoruz.
        </p>
        <Link className="text-link" to="/hakkimizda">
          Bizi Tanıyın
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export function ServicesPage() {
  const { services, projects, articles } = usePublicData();
  const businessConfig = useBusiness();
  const whatsappUrl = businessConfig.whatsappUrl;
  return (
    <main>
      <PageIntro
        eyebrow="HİZMETLERİMİZ"
        title="İhtiyacınıza göre şekillenen metal."
        description="Yaşam alanları ve işletmeler için demir doğrama, metal imalat ve özel tasarım çözümleri."
      />
      <section className="container section no-top">
        <div className="service-grid">
          {services.map((item, i) => (
            <ServiceCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
export function ProjectsPage() {
  const { services, projects, articles } = usePublicData();
  const businessConfig = useBusiness();
  const whatsappUrl = businessConfig.whatsappUrl;
  const [filter, setFilter] = useState("Tümü");
  const categories = [
    "Tümü",
    "Kapılar",
    "Merdivenler",
    "Korkuluklar",
    "Dış Mekân",
    "Endüstriyel",
    "Özel İmalat",
    "Teknik Çizimler",
  ];
  const selected = projects.filter(
    (p) => filter === "Tümü" || p.category === filter,
  );
  return (
    <main>
      <PageIntro
        eyebrow="PROJELERİMİZ"
        title="İşçiliği detaylarda keşfedin."
        description="Gerçek uygulama, atölye üretimi ve teknik projelendirme çalışmalarımızdan bir seçki."
      />
      <section className="container section no-top">
        <p className="content-note">
          Bu seçkide Davutoğlu Demir Doğrama'nın uygulama, atölye üretimi ve
          teknik çizim çalışmalarını inceleyebilirsiniz. Güncel çalışmalar için{" "}
          <a
            href={businessConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram hesabımızı da inceleyin.
          </a>
        </p>
        <div className="filters" aria-label="Proje kategorileri">
          {categories.map((c) => (
            <Button
              key={c}
              variant={filter === c ? "default" : "ghost"}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </Button>
          ))}
        </div>
        {selected.length ? (
          <div className="project-grid">
            {selected.map((item) => (
              <ProjectCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Ruler size={32} />
            <h2>Teknik çizimler henüz eklenmedi.</h2>
            <p>
              Projenize uygun çizim ve tasarım ihtiyacınızı bizimle
              görüşebilirsiniz.
            </p>
            <ContactButtons service="teknik çizim ve tasarım" />
          </div>
        )}
      </section>
      <ContactBand />
    </main>
  );
}
export function BlogPage() {
  const { services, projects, articles } = usePublicData();
  const businessConfig = useBusiness();
  const whatsappUrl = businessConfig.whatsappUrl;
  const [filter, setFilter] = useState("Tümü");
  const categories = ["Tümü", ...new Set(articles.map((a) => a.category))];
  return (
    <main>
      <PageIntro
        eyebrow="BLOG & REHBER"
        title="Malzemeyi tanıyın. Doğru karar verin."
        description="Demir doğrama, metal kapılar, korkuluklar ve özel imalat hakkında faydalı bilgiler."
      />
      <section className="section container no-top">
        <div className="filters">
          {categories.map((c) => (
            <Button
              key={c}
              variant={c === filter ? "default" : "ghost"}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="article-grid">
          {articles
            .filter((a) => filter === "Tümü" || a.category === filter)
            .map((item) => (
              <ArticleCard key={item.slug} item={item} />
            ))}
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
export function AboutPage() {
  const { services, projects, articles } = usePublicData();
  const businessConfig = useBusiness();
  const whatsappUrl = businessConfig.whatsappUrl;
  return (
    <main>
      <PageIntro
        eyebrow="HAKKIMIZDA"
        title="Özenle düşünülen, ihtiyaca göre üretilen."
        description="Davutoğlu Demir Doğrama · Elazığ Merkez"
      />
      <AboutSection />
      <section className="container section no-top prose">
        <h2>Metal imalatın farklı alanlarında</h2>
        <p>
          Demir ve bahçe kapıları, korkuluklar, metal merdivenler, çardak ve
          çatı metal işleri, endüstriyel ürünler ve özel metal imalat
          taleplerinizi görüşüyoruz. Mekâna ve kullanıma uygun seçenekleri
          birlikte değerlendirebiliriz.
        </p>
        <h2>İlk adım, ihtiyacınızı anlamak</h2>
        <p>
          Bir fotoğraf, yaklaşık ölçü veya basit bir fikirle başlayabilirsiniz.
          Kapsam, malzeme ve uygulama detayları görüşme sırasında netleşir.
          Güncel çalışmalarımızı Instagram hesabımızdan inceleyebilirsiniz.
        </p>
        <ContactButtons />
      </section>
      <ContactBand />
    </main>
  );
}
export function ContactPage() {
  const { services, projects, articles } = usePublicData();
  const businessConfig = useBusiness();
  const whatsappUrl = businessConfig.whatsappUrl;
  return (
    <main>
      <PageIntro
        eyebrow="İLETİŞİM"
        title="Bir fikirle başlayalım."
        description="İhtiyacınızı paylaşın. Metal imalat ve özel ölçü talepleriniz için görüşelim."
      />
      <section className="container section no-top contact-layout">
        <div className="contact-list">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle />
            <div>
              <span>WHATSAPP</span>
              <h2>Projenizi paylaşın</h2>
              <p>Fotoğraf, ölçü veya fikrinizi bize iletin.</p>
            </div>
            <ArrowUpRight />
          </a>
          <a href={businessConfig.phoneHref}>
            <Phone />
            <div>
              <span>TELEFON</span>
              <h2>{businessConfig.phone}</h2>
              <p>Doğrudan bizi arayın.</p>
            </div>
            <ArrowUpRight />
          </a>
          <a
            href={businessConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
            <div>
              <span>INSTAGRAM</span>
              <h2>@davutogludemir</h2>
              <p>Güncel çalışmalarımızı inceleyin.</p>
            </div>
            <ArrowUpRight />
          </a>
          <div className="contact-location">
            <MapPin />
            <div>
              <span>KONUM</span>
              <h2>Elazığ Merkez</h2>
              <p>
                Atölye konumu ve ziyaret bilgisi için lütfen iletişime geçin.
              </p>
            </div>
          </div>
        </div>
        <div className="contact-photo">
          <MediaImage
            src={images.workshop}
            alt="Davutoğlu Demir Doğrama atölyesinin dış cephe görünümü"
            width={1536}
            height={1024}
          />
          <span className="image-label">Atölyemiz</span>
        </div>
      </section>
    </main>
  );
}
export function ServiceDetail({ item }: { item: Service }) {
  const { projects } = usePublicData();
  const serviceGallery = [
    item.image,
    ...(item.gallery?.map((galleryItem) => galleryItem.url) || []),
  ];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  return (
    <main>
      <PageIntro
        eyebrow="HİZMETLERİMİZ"
        title={`Elazığ ${item.title}`}
        description={item.description}
      />
      <div className="container detail-layout">
        <div className="prose">
          <div className="detail-image">
            <MediaImage
              src={item.image}
              alt={`${item.title} hizmet görseli`}
              width={1536}
              height={1024}
            />
            <span className="image-label">Hizmet görseli</span>
          </div>
          <h2>Mekânınıza uygun çözümler</h2>
          <p>{item.content}</p>
          <h2>Kullanım alanları</h2>
          <ul>
            {item.uses.map((use) => (
              <li key={use}>{use}</li>
            ))}
          </ul>
          <FAQs items={item.faqs} />
        </div>
        <aside className="detail-aside">
          <span className="eyebrow">PROJENİZİ GÖRÜŞELİM</span>
          <h2>İhtiyacınızı bize anlatın.</h2>
          <p>
            Yaklaşık ölçü, fotoğraf ve beklentinizi paylaşarak
            başlayabilirsiniz.
          </p>
          <ContactButtons service={item.title.toLocaleLowerCase("tr")} />
          <Link className="text-link" to="/hizmetler">
            Tüm hizmetler
            <ArrowRight size={16} />
          </Link>
        </aside>
      </div>
      {(serviceGallery.length > 1 || item.video) && (
        <section className="section container service-media-section">
          <SectionTitle
            eyebrow="UYGULAMALAR"
            title={`${item.title} örnekleri`}
            description="Farklı kullanım alanları ve üretim seçeneklerinden örnekler."
          />
          {item.video && (
            <div className="service-video">
              <video
                controls
                playsInline
                preload="metadata"
                poster={item.image}
                aria-label={`${item.title} uygulama videosu`}
              >
                <source src={item.video} type="video/mp4" />
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
          )}
          <div className="service-gallery">
            {serviceGallery.map((image, index) => (
              <button
                type="button"
                className="service-gallery-item"
                key={image}
                onClick={() => setLightboxIndex(index)}
                aria-label={`${item.title} galeri görselini büyüt`}
              >
                <MediaImage
                  src={image}
                  alt={
                    index === 0
                      ? `${item.title} hizmet görseli`
                      : item.gallery?.[index - 1]?.alt ||
                        `${item.title} uygulama örneği`
                  }
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <span>Görseli büyüt</span>
              </button>
            ))}
          </div>
        </section>
      )}
      <section className="section container">
        <SectionTitle eyebrow="İLGİLİ SEÇKİ" title="Tasarım fikirleri" />
        <div className="project-grid">
          {projects
            .filter((p) => p.serviceSlug === item.slug)
            .map((p) => (
              <ProjectCard key={p.slug} item={p} />
            ))}
        </div>
      </section>
      <ContactBand />
      {lightboxIndex !== null && (
        <Lightbox
          gallery={serviceGallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </main>
  );
}
function Lightbox({
  gallery,
  index,
  onClose,
  onChange,
}: {
  gallery: string[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const [zoom, setZoom] = useState(false);
  const [start, setStart] = useState<number | null>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + gallery.length) % gallery.length);
      if (e.key === "Tab") {
        e.preventDefault();
        const controls = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button"),
        );
        const current = controls.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        controls[
          (current + (e.shiftKey ? controls.length - 1 : 1)) % controls.length
        ]?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    document.querySelector<HTMLButtonElement>(".lightbox-close")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handler);
    };
  }, [index, gallery.length, onClose, onChange]);
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Proje görselleri"
    >
      <div className="lightbox-toolbar">
        <span>
          Proje görseli · {index + 1} / {gallery.length}
        </span>
        <Button
          size="icon"
          variant="hero"
          aria-label={zoom ? "Küçült" : "Büyüt"}
          onClick={() => setZoom(!zoom)}
        >
          {zoom ? <ZoomOut /> : <ZoomIn />}
        </Button>
        <Button
          className="lightbox-close"
          size="icon"
          variant="hero"
          aria-label="Görseli kapat"
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
      <Button
        className="lightbox-prev"
        variant="hero"
        size="icon"
        aria-label="Önceki görsel"
        onClick={() => onChange((index - 1 + gallery.length) % gallery.length)}
      >
        <ChevronLeft />
      </Button>
      <div
        className={`lightbox-image ${zoom ? "zoomed" : ""}`}
        onTouchStart={(e) => setStart(e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          const end = e.changedTouches[0]?.clientX;
          if (start !== null && end !== undefined && Math.abs(end - start) > 45)
            onChange(
              (index + (end < start ? 1 : gallery.length - 1)) % gallery.length,
            );
        }}
      >
        <MediaImage src={gallery[index]} alt="Büyütülmüş proje görseli" />
      </div>
      <Button
        className="lightbox-next"
        variant="hero"
        size="icon"
        aria-label="Sonraki görsel"
        onClick={() => onChange((index + 1) % gallery.length)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
export function ProjectDetail({ item }: { item: Project }) {
  const { projects } = usePublicData();
  const [index, setIndex] = useState<number | null>(null);
  const local = item as Entry;
  const gallery = [item.image, ...(local.gallery?.map((g) => g.url) || [])];
  return (
    <main>
      <PageIntro
        eyebrow={`${item.category} · ${item.kind}`}
        title={item.title}
        description={item.description}
      />
      <section className="container section no-top">
        <Button
          className="gallery-main"
          variant="ghost"
          aria-label="Proje görselini büyüt"
          onClick={() => setIndex(0)}
        >
          <MediaImage
            src={item.image}
            alt={item.title}
            width={1536}
            height={1024}
          />
          <span>
            <ZoomIn size={20} />
            Görseli büyüt
          </span>
        </Button>
        <div className="project-info">
          <div className="prose">
            <h2>Tasarım hakkında</h2>
            <p>{(item as Entry).content || item.description}</p>
            {(item as Entry).material && (
              <p>Malzeme: {(item as Entry).material}</p>
            )}
            {(item as Entry).dimensions && (
              <p>Ölçüler: {(item as Entry).dimensions}</p>
            )}
            {(item as Entry).location && (
              <p>Konum: {(item as Entry).location}</p>
            )}
            <Link
              className="text-link"
              to="/hizmetler/$slug"
              params={{ slug: item.serviceSlug }}
            >
              İlgili hizmeti inceleyin
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <ContactButtons service={item.title.toLocaleLowerCase("tr")} />
        </div>
        {gallery[1] && (
          <div className="gallery-secondary">
            <Button
              variant="ghost"
              aria-label="Proje galeri görselini büyüt"
              onClick={() => setIndex(1)}
            >
              <MediaImage
                src={gallery[1]}
                alt="İlgili proje galeri görseli"
                width={1536}
                height={1024}
                loading="lazy"
              />
              <span>
                Proje galerisi
                <ZoomIn size={19} />
              </span>
            </Button>
          </div>
        )}
      </section>
      <section className="section container no-top">
        <SectionTitle
          eyebrow="DİĞER TASARIMLAR"
          title="Seçkiyi keşfetmeye devam edin."
        />
        <div className="project-grid">
          {projects
            .filter((p) => p.slug !== item.slug)
            .slice(0, 3)
            .map((p) => (
              <ProjectCard key={p.slug} item={p} />
            ))}
        </div>
      </section>
      <ContactBand />
      {index !== null && (
        <Lightbox
          gallery={gallery}
          index={index}
          onClose={() => setIndex(null)}
          onChange={setIndex}
        />
      )}
    </main>
  );
}
export function ArticleDetail({ item }: { item: Article & Partial<Entry> }) {
  const { services, articles } = usePublicData();
  return (
    <main>
      <PageIntro
        eyebrow={`${item.category} · METAL İŞLERİ REHBERİ`}
        title={item.title}
        description={item.excerpt}
      />
      <article className="container article-detail">
        <div className="detail-image">
          <MediaImage
            src={item.image}
            alt={`${item.category} — rehber görseli`}
            width={1536}
            height={1024}
          />
          <span className="image-label">Rehber görseli</span>
        </div>
        <div className="prose article-prose">
          <p className="article-lead">
            {item.excerpt} Bu rehber, seçenekleri daha bilinçli değerlendirmeniz
            için genel bilgiler sunar. Uygulamanıza özel kararlar için teknik
            değerlendirme gerekir.
          </p>
          <nav className="article-toc" aria-label="İçindekiler">
            <span className="eyebrow">BU YAZIDA</span>
            {item.sections.map((s, i) => (
              <a key={s.title} href={`#bolum-${i}`}>
                {s.title}
                <ArrowRight size={14} />
              </a>
            ))}
          </nav>
          {item.richContent ? (
            <RichContent node={item.richContent} />
          ) : (
            item.sections.map((s, i) => (
              <section key={s.title} id={`bolum-${i}`}>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </section>
            ))
          )}
          <FAQs items={item.faqs} />
          <p className="content-note">
            Genel bilgilendirme amaçlı başlangıç rehberidir. Yayın ve güncelleme
            tarihi henüz belirtilmemiştir; işletmenin teknik taahhüdü yerine
            geçmez.
          </p>
          <Link
            className="text-link"
            to="/hizmetler/$slug"
            params={{ slug: item.serviceSlug }}
          >
            İlgili hizmetimiz
            <ArrowUpRight size={18} />
          </Link>
          <h2>Bu konuda özel imalat ihtiyacınız mı var?</h2>
          <p>Davutoğlu Demir Doğrama ile iletişime geçin.</p>
          <ContactButtons
            service={services.find((s) => s.slug === item.serviceSlug)?.title}
          />
        </div>
      </article>
      <section className="section container">
        <SectionTitle eyebrow="OKUMAYA DEVAM EDİN" title="İlgili rehberler" />
        <div className="article-grid">
          {articles
            .filter((a) => a.slug !== item.slug)
            .slice(0, 3)
            .map((a) => (
              <ArticleCard key={a.slug} item={a} />
            ))}
        </div>
      </section>
    </main>
  );
}
