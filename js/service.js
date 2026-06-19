// /* =========================================================
//    QUAERETECH — SERVICES PAGES SHARED JS
//    Reveal animations for: highlight cards, curriculum rows,
//    eligibility cards, outcome pills, related cards.
//    Relies on GSAP + ScrollTrigger already loaded by first.js
// ========================================================= */

// document.addEventListener("DOMContentLoaded", () => {

//   if (typeof gsap === "undefined") return;

// //   gsap.utils.toArray(
// //     ".highlight-card-pro, .eligibility-card, .outcome-pill, .related-card"
// //   ).forEach((item, i) => {
// //     gsap.from(item, {
// //       opacity: 0,
// //       y: 60,
// //       duration: 0.7,
// //       delay: (i % 4) * 0.08,
// //       scrollTrigger: { trigger: item, start: "top 88%" }
// //     });
// //   });

//   gsap.utils.toArray(".curriculum-row").forEach((item, i) => {
//     gsap.from(item, {
//       opacity: 0,
//       x: -40,
//       duration: 0.6,
//       delay: i * 0.06,
//       scrollTrigger: { trigger: item, start: "top 90%" }
//     });
//   });

//   gsap.from(".service-hero-image", {
//     opacity: 0,
//     x: 60,
//     duration: 1,
//     ease: "power3.out",
//     delay: 0.3
//   });

//   if (typeof ScrollTrigger !== "undefined") {
//     ScrollTrigger.refresh();
//   }

// });





/* =========================================================
QUAERE TECHNOLOGIES
ENTERPRISE SERVICES JS V4

Features:
✓ GSAP Scroll Animations
✓ Swiper Testimonials
✓ Animated Counters
✓ Magnetic Buttons
✓ Floating Cards
✓ Parallax Images
✓ Progress Bar
✓ Reveal Animations
✓ Roadmap Effects
✓ Mouse Glow
✓ Tilt Cards
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
    GSAP CHECK
    ========================================= */

    if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
){
    gsap.registerPlugin(ScrollTrigger);


        /* =====================================
        HERO ANIMATION
        ===================================== */

       if(document.querySelector(".hero-content")){
    gsap.from(".hero-content > *",{
        opacity:0,
        y:50,
        duration:1,
        stagger:0.12
    });
}

        gsap.from(".service-hero-image", {
            opacity: 0,
            x: 100,
            duration: 1.2,
            ease: "power3.out"
        });

        /* =====================================
        SECTION TITLES
        ===================================== */

        gsap.utils.toArray(
            ".section-title, .section-subtitle"
        ).forEach(item => {

            gsap.from(item, {

                opacity: 0,
                y: 40,
                duration: 0.8,

                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }

            });

        });

        /* =====================================
        CARDS REVEAL
        ===================================== */

        gsap.utils.toArray(
            `
            .domain-card,
            .track-card,
            .highlight-card-pro,
            .eligibility-card,
            .skill-card,
            .project-card-pro,
            .testimonial-card-pro,
            .batch-card,
            .related-card
            `
        ).forEach((card, i) => {

            gsap.from(card, {

                opacity: 0,
                y: 60,
                duration: 0.7,
                delay: (i % 4) * 0.08,

                scrollTrigger: {
                    trigger: card,
                    start: "top 90%"
                }

            });

        });

        /* =====================================
        CURRICULUM ROWS
        ===================================== */

        gsap.utils.toArray(".curriculum-row")
            .forEach((row, i) => {

                gsap.from(row, {

                    opacity: 0,
                    x: -50,
                    duration: 0.7,
                    delay: i * 0.05,

                    scrollTrigger: {
                        trigger: row,
                        start: "top 90%"
                    }

                });

            });

        /* =====================================
        ROADMAP STEPS
        ===================================== */

        gsap.utils.toArray(".roadmap-step")
            .forEach((step, i) => {

                gsap.from(step, {

                    opacity: 0,
                    scale: 0.8,
                    duration: 0.7,
                    delay: i * 0.15,

                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%"
                    }

                });

            });

        /* =====================================
        PARALLAX IMAGES
        ===================================== */

        gsap.utils.toArray(
            `
            .service-hero-image img,
            .project-card-pro img,
            .certificate-preview img
            `
        ).forEach(img => {

            gsap.to(img, {

                y: -50,

                scrollTrigger: {
                    trigger: img,
                    scrub: true
                }

            });

        });

    }

    /* =========================================
    TESTIMONIAL SWIPER
    ========================================= */

    if (typeof Swiper !== "undefined") {

        new Swiper(".testimonialSwiper", {

            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 1000,

            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },

            breakpoints: {

                768: {
                    slidesPerView: 2
                },

                1200: {
                    slidesPerView: 3
                }

            }

        });

    }

    /* =========================================
    COUNTERS
    ========================================= */

    const counters =
        document.querySelectorAll(".counter-number");

    const counterObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    parseInt(
                        counter.dataset.target
                    );

                let current = 0;

                const increment =
                    target / 100;

                const update = () => {

                    current += increment;

                    if (current < target) {

                        counter.innerText =
                            Math.floor(current);

                        requestAnimationFrame(update);

                    } else {

                        counter.innerText =
                            target + "+";

                    }

                };

                update();

                counterObserver.unobserve(counter);

            });

        });

    counters.forEach(counter =>
        counterObserver.observe(counter)
    );

    /* =========================================
    MAGNETIC BUTTONS
    ========================================= */

    const magneticBtns =
        document.querySelectorAll(
            ".magnetic-btn"
        );

    magneticBtns.forEach(btn => {

        btn.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    btn.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const moveX =
                    (x - rect.width / 2) * 0.2;

                const moveY =
                    (y - rect.height / 2) * 0.2;

                btn.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            });

        btn.addEventListener(
            "mouseleave",
            () => {

                btn.style.transform =
                    "translate(0px,0px)";

            });

    });

    /* =========================================
    FLOATING CARDS
    ========================================= */

    document.querySelectorAll(
        ".highlight-card-pro, .skill-card"
    ).forEach(card => {

        card.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * 8;

                const rotateY =
                    ((x / rect.width) - 0.5) * -8;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    `;

            });

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg)";

            });

    });

    /* =========================================
    MOUSE GLOW EFFECT
    ========================================= */

    const glow =
        document.createElement("div");

    glow.className =
        "mouse-glow";

    document.body.appendChild(glow);

    document.addEventListener(
        "mousemove",
        (e) => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";

        });

    /* =========================================
    PROGRESS BAR
    ========================================= */

    const progress =
        document.getElementById(
            "scroll-progress"
        );

    if (progress) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollTop =
                    document.documentElement.scrollTop;

                const scrollHeight =
                    document.documentElement.scrollHeight -
                    document.documentElement.clientHeight;

                const percent =
                    (scrollTop / scrollHeight) * 100;

                progress.style.width =
                    percent + "%";

            });

    }

    /* =========================================
    FAQ AUTO CLOSE
    ========================================= */

    document.querySelectorAll(
        ".accordion-button"
    ).forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                btn.classList.toggle(
                    "active"
                );

            });

    });

    /* =========================================
    LOGO MARQUEE PAUSE
    ========================================= */

    const marquee =
        document.querySelector(
            ".logo-track"
        );

    if (marquee) {

        marquee.addEventListener(
            "mouseenter",
            () => {

                marquee.style.animationPlayState =
                    "paused";

            });

        marquee.addEventListener(
            "mouseleave",
            () => {

                marquee.style.animationPlayState =
                    "running";

            });

    }

    /* =========================================
    CTA PULSE
    ========================================= */

    const ctaBtns =
        document.querySelectorAll(
            ".sticky-apply-cta .btn"
        );

    ctaBtns.forEach(btn => {

        setInterval(() => {

            btn.classList.add("pulse");

            setTimeout(() => {

                btn.classList.remove("pulse");

            }, 1000);

        }, 3000);

    });

    /* =========================================
    REFRESH
    ========================================= */

    if (
        typeof ScrollTrigger !==
        "undefined"
    ) {

        ScrollTrigger.refresh();

    }

});


/* =========================================================
END OF FILE
========================================================= */



