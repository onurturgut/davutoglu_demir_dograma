"use client";
import { useState, type FormEvent } from "react";
import { Link } from "@/components/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { images } from "@/data/content";
import { publicMediaUrl } from "@/lib/media-url";

export function AdminLogin({ onPreview }: { onPreview: () => void }) {
  const [visible, setVisible] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Presentation only: never validate, persist or transmit credentials.
    event.currentTarget.reset();
    onPreview();
  }

  return (
    <main className="admin-login">
      <section
        className="admin-login-visual"
        aria-label="Davutoğlu Demir Doğrama"
      >
        <img
          src={images.workshop}
          alt="Metal atölyesinin temsilî konsept görseli"
        />
        <div className="admin-login-brand">
          <img
            src={publicMediaUrl("/brand/davutoglu-logo.png")}
            alt=""
            aria-hidden="true"
          />
          <strong>
            DAVUTOĞLU<small>DEMİR DOĞRAMA</small>
          </strong>
        </div>
        <div className="admin-login-caption">
          <span>İÇERİK YÖNETİMİ</span>
          <h2>
            Atölyeden
            <br />
            dijitale.
          </h2>
          <p>Davutoğlu Demir Doğrama</p>
        </div>
        <span className="admin-login-image-note">Temsilî konsept görsel</span>
      </section>
      <section className="admin-login-panel">
        <Button variant="ghost" asChild className="admin-login-back">
          <Link to="/">
            <ArrowLeft />
            Siteye dön
          </Link>
        </Button>
        <div className="admin-login-form">
          <div className="admin-login-symbol">
            <LockKeyhole size={24} />
          </div>
          <span className="eyebrow">DAVUTOĞLU · YÖNETİM</span>
          <h1>Yönetici girişi</h1>
          <p className="admin-login-lead">İçerik yönetim paneli</p>
          <form onSubmit={submit}>
            <label htmlFor="admin-email">E-posta adresi</label>
            <div className="admin-login-input">
              <Mail size={18} />
              <Input
                id="admin-email"
                name="email"
                type="email"
                placeholder="E-posta adresiniz"
                autoComplete="off"
                required
              />
            </div>
            <label htmlFor="admin-password">Şifre</label>
            <div className="admin-login-input">
              <LockKeyhole size={18} />
              <Input
                id="admin-password"
                name="password"
                type={visible ? "text" : "password"}
                placeholder="Şifreniz"
                autoComplete="off"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title={visible ? "Şifreyi gizle" : "Şifreyi göster"}
                aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <Button type="submit" className="admin-login-submit">
              Giriş yap
              <ArrowRight />
            </Button>
          </form>
          <div className="admin-login-notice">
            <span className="demo-dot" />
            <p>
              <strong>Tasarım önizlemesi</strong>Gerçek giriş yapılmaz; bilgiler
              doğrulanmaz veya kaydedilmez.
            </p>
          </div>
          <Button
            variant="link"
            className="admin-login-preview"
            onClick={onPreview}
          >
            Bilgi girmeden demo panelini aç
            <ArrowRight />
          </Button>
        </div>
        <footer className="admin-login-footer">
          <span>Davutoğlu Demir Doğrama</span>
          <span>Yerel Demo Modu</span>
        </footer>
      </section>
    </main>
  );
}
