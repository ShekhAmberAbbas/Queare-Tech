/* =========================================================
   PAGES.JS
   Shared richer animation layer for the 7 leadership pages.
   first.js still runs first (preloader, navbar scroll,
   counters, marquee, contact form) — this file ADDS the
   extra motion requested for these specific pages, it does
   not replace anything in first.js.
========================================================= */

/* =========================================================
   CURSOR-FOLLOW GLOW (desktop only)
========================================================= */

(function initCursorGlow() {

  if (window.matchMedia("(hover: none)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();

})();

/* =========================================================
   RICH HERO — SPLIT TITLE INTO WORDS FIRST
   (must run before the entrance timeline below, since that
   timeline animates .rich-hero-title .word spans)
========================================================= */

document.querySelectorAll(".rich-hero-title").forEach(el => {
  if (el.dataset.split) return;
  el.dataset.split = "true";
  const text = el.textContent.trim();
  el.innerHTML = text
    .split(" ")
    .map(w => `<span class="word" style="display:inline-block;">${w}</span>`)
    .join(" ");
});

/* =========================================================
   RICH HERO — PARALLAX ORBS + ENTRANCE SEQUENCE
========================================================= */

if (document.querySelector(".rich-hero")) {

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    gsap.to(".orb-a", { x: x * 60, y: y * 50, duration: 1.6, ease: "power2.out" });
    gsap.to(".orb-b", { x: -x * 50, y: -y * 40, duration: 1.6, ease: "power2.out" });
  });

  gsap.timeline()
    .from(".rich-hero-breadcrumb", { y: -20, opacity: 0, duration: .6 })
    .from(".rich-hero-eyebrow", { y: -20, opacity: 0, duration: .6, clearProps: "opacity" }, "-=0.3")
    .from(".rich-hero-title .word", {
        y: 60, opacity: 0, duration: .8, stagger: .06, ease: "power3.out"
      }, "-=0.2")
    .from(".rich-hero-sub", { y: 30, opacity: 0, duration: .7 }, "-=0.4")
    .from(".rich-hero .hero-buttons, .rich-hero-cta", { y: 30, opacity: 0, duration: .7 }, "-=0.3");

}

/* =========================================================
   MAGNETIC TILT CARDS
   (expert-card-short, partner-profile-card, cert-badge-card,
   method-step-card, related-page-card — lightweight 3D tilt
   on mousemove, distinct from VanillaTilt's glare effect so
   it can run on cards that don't use .tilt-card)
========================================================= */

document.querySelectorAll(
  ".expert-card-short, .partner-profile-card, .cert-badge-card, .method-step-card"
).forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: px * 8,
      rotateX: -py * 8,
      duration: .4,
      ease: "power2.out",
      transformPerspective: 800
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: .6, ease: "power3.out" });
  });

});

/* =========================================================
   STAGGERED SCROLL REVEALS FOR PAGE-SPECIFIC GRIDS
========================================================= */

gsap.utils.toArray(
  ".expert-card-short, .deep-profile-card, .partner-profile-card, .cert-badge-card, .method-step-card, .related-page-card"
).forEach((item, i) => {

  gsap.from(item, {
    opacity: 0,
    y: 70,
    duration: 0.75,
    delay: (i % 4) * 0.06,
    ease: "power3.out",
    scrollTrigger: { trigger: item, start: "top 88%" }
  });

});

/* =========================================================
   PULL-QUOTE + LETTER PARAGRAPH REVEAL
========================================================= */

gsap.utils.toArray(".pull-quote-block").forEach(block => {
  gsap.from(block, {
    opacity: 0,
    x: -40,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: { trigger: block, start: "top 85%" }
  });
});

gsap.utils.toArray(".letter-body p, .deep-profile-quote").forEach(p => {
  gsap.from(p, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    scrollTrigger: { trigger: p, start: "top 92%" }
  });
});

gsap.utils.toArray(".letter-portrait-card").forEach(card => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 80%" }
  });
});

/* =========================================================
   CERTIFICATION TIMELINE STRIP — DRAW-IN CONNECTOR
========================================================= */

gsap.utils.toArray(".cert-year-node").forEach((node, i) => {
  gsap.from(node, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: i * 0.1,
    scrollTrigger: { trigger: ".cert-timeline-strip", start: "top 85%" }
  });
});

gsap.utils.toArray(".cert-year-connector").forEach(line => {
  gsap.from(line, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 0.6,
    scrollTrigger: { trigger: ".cert-timeline-strip", start: "top 85%" }
  });
});

/* =========================================================
   SECTION TAG / TITLE SOFT-RISE ON EVERY NEW SECTION TYPE
========================================================= */

gsap.utils.toArray(
  ".letter-section .section-tag, .expert-grid-section .section-tag, .partner-section .section-tag, .cert-section .section-tag, .method-steps-section .section-tag, .deep-profile-section .section-tag"
).forEach(tag => {
  gsap.from(tag, {
    opacity: 0,
    y: 16,
    duration: 0.5,
    scrollTrigger: { trigger: tag, start: "top 90%" }
  });
});

console.log(
  "%cQuaere Pages Animation Layer Loaded ✨",
  "color:#06b6d4;font-size:14px;font-weight:bold;"
);

