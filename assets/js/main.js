"use strict";

const init = () => {
  // console.clear();
  // gsap config
  ScrollTrigger.clearScrollMemory("manual");
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.refresh();
  if (window.innerWidth < 1024) {
    ScrollTrigger.config({
      // a comma-delimited list of events that trigger a refresh.
      // default: "visibilitychange,DOMContentLoaded,load,resize"
      // so remove the "resize" one:
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });
  }
  // app height
  appHeight();
  // init loader
  initLoader();
  // logo shrink
  scrollLogoShrink();
};

// ===== lenis =====
const lenis = new Lenis({
  lerp: 0.05,
  smoothWheel: true,
});
lenis.on("scroll", ScrollTrigger.update);
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== init loader =====
const initLoader = () => {
  lenis.stop();
  const preloader = gsap.timeline({
    onComplete: () => {
      lenis.start();
    },
  });

  preloader
    .to("[data-loading-logo]", {
      opacity: 1,
      duration: 1,
      delay: 1,
      ease: Power4.easeInOut,
    })
    .to("[data-loading-overlay]", {
      top: 0,
      duration: 1.8,
      ease: Power4.easeOut,
    })
    .to(
      "[data-logo-shrink]",
      {
        opacity: 1,
        duration: 1,
        ease: Power4.easeInOut,
      },
      "-=0.5"
    )
    .to("[data-header-logo], [data-scrolldown]", {
      opacity: 1,
      duration: 1,
      ease: Power4.easeInOut,
    })
    .to("[data-loading]", {
      zIndex: "-100",
    });
};

// ===== app height =====
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty(
    "--app-height",
    `${document.documentElement.clientHeight}px`
  );
};
window.addEventListener("resize", appHeight);

// ===== logo shirnk =====
const scrollLogoShrink = () => {
  // ==== create
  let mmg = gsap.matchMedia(),
    breakPoint = 1024;

  mmg.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isMobile } = context.conditions;

      ScrollTrigger.create({
        animation: gsap.from("[data-logo-shrink]", {
          height: "100%",
          width: "100%",
          duration: 1,
          ease: "power1.inOut",
        }),
        start: 100,
        trigger: "[data-offset-top]",
        start: "top+=50 top",
        end: "top top",
        toggleActions: "play none reverse none",
        markers: false,
        onEnter: () => {
          gsap.to("[data-header-logo], [data-scrolldown]", {
            opacity: 0,
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to("[data-header-logo], [data-scrolldown]", {
            opacity: 1,
            duration: 0.5,
            delay: 0.5,
          });
        },
      });
    }
  );
};

// DOMContentLoaded
window.addEventListener("DOMContentLoaded", init);
