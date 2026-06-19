/* =========================================================
   QUAERETECH — SERVICES PAGES SHARED JS
   Reveal animations for: highlight cards, curriculum rows,
   eligibility cards, outcome pills, related cards.
   Relies on GSAP + ScrollTrigger already loaded by first.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  if (typeof gsap === "undefined") return;

  gsap.utils.toArray(
    ".highlight-card-pro, .eligibility-card, .outcome-pill, .related-card"
  ).forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 60,
      duration: 0.7,
      delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: item, start: "top 88%" }
    });
  });

  gsap.utils.toArray(".curriculum-row").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: -40,
      duration: 0.6,
      delay: i * 0.06,
      scrollTrigger: { trigger: item, start: "top 90%" }
    });
  });

  gsap.from(".service-hero-image", {
    opacity: 0,
    x: 60,
    duration: 1,
    ease: "power3.out",
    delay: 0.3
  });

  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }

});