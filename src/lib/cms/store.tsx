"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import {
  createSeed,
  stateSchema,
  type CMSState,
  type Settings,
  type Entry,
  type ContentType,
  publishedEntries,
} from "./model";
// Keep the previous browser-local snapshot recoverable while loading the
// refreshed real-project portfolio as the new default dataset.
const KEY = "davutoglu-cms-v2";
type Store = {
  state: CMSState;
  ready: boolean;
  error: string;
  update: (fn: (state: CMSState) => CMSState) => boolean;
  clearError: () => void;
};
const Context = createContext<Store | null>(null);
const PreviewContext = createContext<CMSState | null>(null);
export function CMSProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(createSeed);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const latest = useRef(state);
  latest.current = state;
  useEffect(() => {
    try {
      const value = localStorage.getItem(KEY);
      if (value) setState(stateSchema.parse(JSON.parse(value)));
    } catch {
      setError(
        "Yerel kayıt okunamadı. Mevcut kayıt korunuyor; yedeğinizi kontrol edin.",
      );
    }
    fetch("/api/cms", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error);
        return stateSchema.parse(payload);
      })
      .then((value) => {
        latest.current = value;
        setState(value);
      })
      .catch((cause) =>
        setError(
          cause instanceof Error ? cause.message : "İçerikler yüklenemedi.",
        ),
      )
      .finally(() => setReady(true));
    const listener = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          setState(stateSchema.parse(JSON.parse(e.newValue)));
        } catch {
          setError("Diğer sekmedeki kayıt okunamadı.");
        }
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);
  function update(fn: (state: CMSState) => CMSState) {
    try {
      const next = fn(latest.current);
      const raw = JSON.stringify(next);
      localStorage.setItem(KEY, raw);
      latest.current = next;
      setState(next);
      setError("");
      void fetch("/api/cms", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(next),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error((await response.json()).error);
        })
        .catch((cause) =>
          setError(
            cause instanceof Error
              ? cause.message
              : "Değişiklik kaydedilemedi.",
          ),
        );
      return true;
    } catch (e) {
      setError(
        e instanceof Error && !e.message.toLowerCase().includes("quota")
          ? e.message
          : "Tarayıcı depolaması dolu. Bazı görselleri kaldırın veya yedek alın. Değişiklik kaydedilmedi.",
      );
      return false;
    }
  }
  return (
    <Context.Provider
      value={{ state, ready, error, update, clearError: () => setError("") }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCMS() {
  const store = useContext(Context);
  if (!store) throw new Error("CMS provider missing");
  return store;
}
export function PreviewProvider({
  state,
  children,
}: {
  state: CMSState;
  children: ReactNode;
}) {
  return (
    <PreviewContext.Provider value={state}>{children}</PreviewContext.Provider>
  );
}
export function usePublicState() {
  const preview = useContext(PreviewContext);
  const { state } = useCMS();
  return preview || state;
}
export function usePublishedSettings(): Settings {
  return usePublicState().publishedSettings;
}
export function useEntries(type: ContentType): Entry[] {
  return publishedEntries(usePublicState(), type);
}
export function usePublicData() {
  const state = usePublicState();
  return {
    services: publishedEntries(state, "services").map((s) => ({
      ...s,
      faqs: [
        ...s.faqs,
        ...state.publishedSettings.faqs
          .filter((f) => f.active && f.serviceSlug === s.slug)
          .sort((a, b) => a.order - b.order),
      ].filter(
        (f, i, arr) => arr.findIndex((x) => x.question === f.question) === i,
      ),
    })),
    projects: publishedEntries(state, "projects"),
    articles: publishedEntries(state, "blog").map((a) => ({
      ...a,
      excerpt: a.description,
    })),
  };
}
export function useBusiness() {
  const s = usePublishedSettings();
  const b = s.business;
  const phoneHref = `tel:+${b.phone.replace(/\D/g, "").replace(/^0/, "90")}`;
  const whatsapp = (service?: string) =>
    `https://wa.me/${b.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(service ? `Merhaba, ${b.name} web sitenizdeki ${service} hizmetiniz hakkında fiyat teklifi almak istiyorum.` : b.whatsappMessage)}`;
  return {
    businessName: b.name,
    description: b.description,
    phone: b.phone,
    phoneHref,
    city: b.city,
    instagram:
      s.socials.find((l) => l.active && l.platform === "Instagram")?.url || "",
    whatsappUrl: whatsapp,
  };
}
