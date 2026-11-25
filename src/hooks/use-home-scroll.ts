import { useEffect, useRef } from "react";
export function useHomeScroll(revision: string) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || root.closest(".public-preview")) return;
    let cancelled = false;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const context = gsap.context(() => {
            const hero = root.querySelector(".home-hero");
            if (hero) {
              gsap.from(".hero-content > *", {
                y: 24,
                opacity: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: "power2.out",
              });
              gsap.to(".hero-photo img", {
                yPercent: 8,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1,
                },
              });
            }
            root
              .querySelectorAll(
                ".section-heading,.about-section>div:last-child,.contact-band-inner>div",
              )
              .forEach((element) =>
                gsap.from(element, {
                  y: 32,
                  opacity: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    once: true,
                  },
                }),
              );
            root
              .querySelectorAll(
                ".service-grid,.project-grid,.article-grid,.process-grid",
              )
              .forEach((grid) =>
                gsap.from(grid.children, {
                  y: 38,
                  opacity: 0,
                  duration: 0.7,
                  stagger: 0.1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: grid,
                    start: "top 90%",
                    once: true,
                  },
                }),
              );
            root.querySelectorAll(".about-image img").forEach((image) =>
              gsap.fromTo(
                image,
                { scale: 1.06 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                },
              ),
            );
          }, root);
          const refresh = () => ScrollTrigger.refresh();
          root
            .querySelectorAll("img")
            .forEach((image) => image.addEventListener("load", refresh));
          document.fonts.ready.then(refresh);
          return () => {
            root
              .querySelectorAll("img")
              .forEach((image) => image.removeEventListener("load", refresh));
            context.revert();
          };
        });
        cleanup = () => media.revert();
      },
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [revision]);
  return ref;
}
