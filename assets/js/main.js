"use strict";

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory("manual");
  // app height
  appHeight();
  // init loader
  initLoader();
  // scroll trigger logo shrink
  let logo = document.querySelector(".jslogo"),
    header = document.querySelector(".c-header_center"),
    state = Flip.getState(logo); // record the state
  header.insertBefore(logo, header.firstChild); // put the logo into the header (re-parent it)

  let move = Flip.to(state, { duration: 1, ease: "power1.inOut" });
  move.progress(1);
  ScrollTrigger.create({
    start: 100,
    trigger: "#jsLogoShrink",
    start: "top+=50 top",
    end: "top top",
    onEnter: () => {
      move.reverse();
      gsap.to("[data-header-logo], [data-scrolldown]", {
        opacity: 0,
        duration: 0.5,
      });
    },
    onEnterBack: () => {
      move.play();
      gsap.to("[data-header-logo], [data-scrolldown]", {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
      });
    },
    markers: false,
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

// ===== lenis =====
const lenis = new Lenis({
  lerp: 0.05,
  smoothWheel: true,
});
lenis.on("scroll", (e) => {});
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
      delay: 0.5,
      ease: Power4.easeInOut,
    })
    .to("[data-loading-overlay]", {
      top: 0,
      duration: 1.5,
      ease: Power4.easeOut,
    })
    .to(
      "[data-heading] .jslogo",
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
      top: "-100%",
    });
};

window.addEventListener("DOMContentLoaded", init);
