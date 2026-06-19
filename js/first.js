/* =========================================================
   QUAERETECH ENTERPRISE V3 — FIRST.JS CLEAN

   ✔ Preloader
   ✔ Dark Mode
   ✔ Native Scroll (CSS scroll-behavior: smooth)
   ✔ GSAP + ScrollTrigger
   ✔ Hero Animations
   ✔ About Image Fallback + Reveal
   ✔ Lottie Hero
   ✔ Swiper Testimonials
   ✔ Vanilla Tilt
   ✔ Magnetic Buttons
   ✔ Animated Counters
   ✔ Scroll Progress
   ✔ Active Navbar
   ✔ Floating Blobs Parallax
   ✔ Blog Loader (inline data + GSAP reveal)
   ✔ Logo Marquee Pause
   ✔ Contact Form
========================================================= */

/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");
  const percent   = document.getElementById("loaderPercent");
  const progressCircle = document.querySelector(".loader-progress-circle");

  let count = 0;
  const circumference = 314;

  const loader = setInterval(() => {

    count++;
    percent.innerText = count + "%";

    const offset = circumference - (count / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    if (count >= 100) {
      clearInterval(loader);
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 500);
    }

  }, 15);

});

/* =========================================================
   DARK MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

themeToggle?.addEventListener("click", () => {

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  }

});

/* =========================================================
   GSAP + ScrollTrigger
   Native scroll is used — ScrollTrigger listens directly
========================================================= */

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   HERO ANIMATION
========================================================= */

gsap.timeline()
  .from(".hero-badge",       { y: -50, opacity: 0, duration: .7 })
  .from(".hero-title",       { y: 80,  opacity: 0, duration: .9 })
  .from(".hero-description", { y: 50,  opacity: 0, duration: .7 }, "-=0.4")
  .from(".hero-buttons",     { y: 40,  opacity: 0, duration: .7 }, "-=0.3")
  .from(".hero-stats",       { y: 50,  opacity: 0, duration: .7 }, "-=0.3");

/* =========================================================
   FLOATING BLOBS PARALLAX
========================================================= */

document.addEventListener("mousemove", (e) => {

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  gsap.to(".blob-1", { x: x * 50,  y: y * 40,  duration: 2 });
  gsap.to(".blob-2", { x: -x * 50, y: -y * 40, duration: 2 });
  gsap.to(".blob-3", { x: x * 30,  y: -y * 30, duration: 2 });

});

/* =========================================================
   NAVBAR SCROLL CLASS
========================================================= */

const navbar = document.querySelector(".custom-navbar");

if(navbar){
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 80);
    });
}

/* =========================================================
   ACTIVE NAVIGATION LINKS
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});

/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

const progress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = (winScroll / height) * 100 + "%";
});

/* =========================================================
   ABOUT IMAGE FALLBACK + GSAP REVEAL
========================================================= */

const aboutImg = document.querySelector(".about-main-image");

if (aboutImg) {

  const svgFallback =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
      '<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#dbeafe"/>' +
      '<stop offset="100%" stop-color="#cffafe"/>' +
      '</linearGradient></defs>' +
      '<rect width="800" height="500" fill="url(#g)" rx="30"/>' +
      '<text x="400" y="230" font-family="sans-serif" font-size="32"' +
      ' fill="#2563eb" text-anchor="middle" font-weight="bold">QuaereTech</text>' +
      '<text x="400" y="280" font-family="sans-serif" font-size="18"' +
      ' fill="#64748b" text-anchor="middle">AI-First Engineering</text>' +
      '</svg>'
    );

  aboutImg.onerror = function () {
    this.onerror = null;
    this.src = svgFallback;
  };

  if (!aboutImg.complete || aboutImg.naturalWidth === 0) {
    aboutImg.src = aboutImg.src;
  }

}

gsap.from("#about-img-col", {
  scrollTrigger: { trigger: ".about-section", start: "top 75%" },
  x: -80, opacity: 0, duration: 1, ease: "power3.out"
});

gsap.from("#about-text-col", {
  scrollTrigger: { trigger: ".about-section", start: "top 75%" },
  x: 80, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
});

/* =========================================================
   SECTION CARD REVEALS
   (excludes .blog-card — those are animated inside loadBlogs)
========================================================= */

gsap.utils.toArray(
".service-card,.why-card,.case-card,.stats-card,.testimonial-card").forEach(item => {

  gsap.from(item, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    scrollTrigger: { trigger: item, start: "top 85%" }
  });

});

/* =========================================================
   ANIMATED COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target  = +counter.dataset.target;
    let count = 0;

    const update = () => {
      count += target / 100;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target+"+";
      }
    };

    update();
    counterObserver.unobserve(counter);
  });

}, { threshold: .4 });

counters.forEach(counter => counterObserver.observe(counter));

/* =========================================================
   SWIPER TESTIMONIALS
========================================================= */

new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: false,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    768:  { slidesPerView: 2 },
    1200: { slidesPerView: 3 }
  }
});

/* =========================================================
   VANILLA TILT
========================================================= */

if (typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(
    document.querySelectorAll(".tilt-card"),
    { max: 8, speed: 400, glare: true, "max-glare": 0.15 }
  );
}

/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document.querySelectorAll(".magnetic-btn").forEach(btn => {

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: .3 });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: .4 });
  });

});

/* =========================================================
   LOTTIE HERO
========================================================= */



/* =========================================================
   BLOG LOADER — inline data + GSAP reveal
========================================================= */

function loadBlogs() {

  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) return;

  const blogs = [
    {
      title:   "How AI is Transforming Enterprise Software",
      image:   "assets/blogs/blog1.jpg",
      excerpt: "Generative AI and intelligent automation are reshaping ERP, CRM and enterprise workflows globally.",
      link:    "#"
    },
    {
      title:   "Cloud-Native Architecture: Best Practices",
      image:   "assets/blogs/blog2.jpg",
      excerpt: "Microservices, containerization and Kubernetes strategies for modern enterprise applications.",
      link:    "#"
    },
    {
      title:   "Building RAG Systems for Business Intelligence",
      image:   "assets/blogs/blog3.jpg",
      excerpt: "How Retrieval-Augmented Generation is revolutionizing knowledge management and decision-making.",
      link:    "#"
    }
  ];

  blogContainer.innerHTML = "";

  blogs.forEach((blog, i) => {

    const fallback = `https://picsum.photos/seed/qtblog${i + 1}/800/400`;
    const col = document.createElement("div");
    col.className = "col-lg-4";

    col.innerHTML = `
      <div class="blog-card">
        <div class="blog-image">
          <img
            src="${blog.image}"
            alt="${blog.title}"
            onerror="this.onerror=null;this.src='${fallback}'"
          >
        </div>
        <div class="blog-content">
          <h4>${blog.title}</h4>
          <p>${blog.excerpt}</p>
          <a href="${blog.link}">Read More →</a>
        </div>
      </div>
    `;

    blogContainer.appendChild(col);

  });

  // Animate cards after DOM paint
  setTimeout(() => {

    gsap.from(blogContainer.querySelectorAll(".blog-card"), {
      scrollTrigger: {
        trigger: blogContainer,
        start: "top 85%",
        once: true
      },
      opacity: 0,
      y: 80,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      onComplete() {
        blogContainer.querySelectorAll(".blog-card").forEach(card => {
          card.style.opacity   = "1";
          card.style.transform = "none";
        });
      }
    });

    ScrollTrigger.refresh();

  }, 100);

}

loadBlogs();

/* =========================================================
   LOGO MARQUEE — PAUSE ON HOVER
========================================================= */

const marquee = document.querySelector(".logo-track");

if (marquee) {
  marquee.addEventListener("mouseenter", () => {
    marquee.style.animationPlayState = "paused";
  });
  marquee.addEventListener("mouseleave", () => {
    marquee.style.animationPlayState = "running";
  });
}

/* =========================================================
   BROKEN LOGO IMAGES — HIDE ON ERROR
========================================================= */

document.querySelectorAll(".logo-track img, .tech-track img").forEach(img => {
  img.onerror = function () { this.style.display = "none"; };
});

/* =========================================================
   CONTACT FORM
========================================================= */

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const btn = this.querySelector("button");
    btn.disabled = true;
    btn.innerHTML = "Sending...";

    setTimeout(() => {
      btn.innerHTML = "Message Sent ✓";
      this.reset();
      setTimeout(() => {
        btn.innerHTML = 'Send Message <i class="bi bi-send-fill"></i>';
        btn.disabled  = false;
      }, 3000);
    }, 1500);

  });
}

/* =========================================================
   FINAL REFRESH
========================================================= */

ScrollTrigger.refresh();

console.log(
  "%cQuaereTech Enterprise V3 Loaded 🚀",
  "color:#2563eb;font-size:16px;font-weight:bold;"
);

if (window.Lenis) {

const lenis = new Lenis({
duration: 1.2,
smoothWheel: true
});

function raf(time) {
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

} else {
console.log("Lenis not loaded");
}

/* ==========================================
   UNIVERSAL LOTTIE LOADER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof lottie === "undefined") {
        console.error("Lottie not loaded");
        return;
    }

    document
    .querySelectorAll("[data-lottie]")
    .forEach(container => {

        const file =
        container.dataset.lottie;

        lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: `assets/lottie/${file}`
        });

    });

});
(function () {


const THRESHOLD = 160;
let blocked = false;

function isDevToolsOpen() {
    return (
        window.outerWidth - window.innerWidth > THRESHOLD ||
        window.outerHeight - window.innerHeight > THRESHOLD
    );
}

function blockPage() {

    if (blocked) return;
    blocked = true;

    document.documentElement.innerHTML = `
    <head>
        <title>Access Restricted</title>
    </head>
    <body style="
        margin:0;
        background:#000;
        color:#ff3b3b;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;
        font-family:Arial,sans-serif;
    ">
        <div>
            <h1 style="font-size:70px">⚠ SECURITY ALERT ⚠</h1>
            <p style="font-size:24px">
                Unauthorized inspection activity detected.
            </p>
            <p style="color:white">
                Close Developer Tools to continue.
            </p>
            <p style="color:#888">
                Session: ${Date.now()}
            </p>
        </div>
    </body>
    `;
}

function monitor() {

    if (isDevToolsOpen()) {
        blockPage();
    }

    if (blocked && !isDevToolsOpen()) {
        location.reload();
    }
}

setInterval(monitor, 300);

document.addEventListener("contextmenu", e => {
    e.preventDefault();
});

document.addEventListener("keydown", e => {

    const key = e.key.toUpperCase();

    if (
        key === "F12" ||
        (e.ctrlKey && e.shiftKey &&
            ["I", "J", "C", "K"].includes(key)) ||
        (e.ctrlKey && key === "U")
    ) {
        e.preventDefault();
        blockPage();
    }

});

setInterval(() => {

    const start = performance.now();

    debugger;

    const end = performance.now();

    if (end - start > 100) {
        blockPage();
    }

}, 1000);

const bait = new Image();

Object.defineProperty(bait, "id", {
    get() {
        blockPage();
        return "";
    }
});

setInterval(() => {
    console.log(bait);
}, 3000);

window.addEventListener("resize", () => {
    if (isDevToolsOpen()) {
        blockPage();
    }
});


})();


const timeline = document.querySelector(".timeline");

if (timeline) {

    const marker =
    document.querySelector(".timeline-marker");

    const progress =
    document.querySelector(".timeline-progress");

    gsap.set(marker,{
        xPercent:-50
    });

    gsap.to(progress,{

        height:"100%",

        ease:"none",

        scrollTrigger:{

            trigger:timeline,

            start:"top center",

            end:"bottom bottom",

            scrub:true

        }

    });

    gsap.to(marker,{

        y:() => {

        if(window.innerWidth < 992){
            return timeline.offsetHeight - 120;
        }

        return timeline.offsetHeight - 80;
    },

        rotation:360,

        ease:"none",

        scrollTrigger:{

            trigger:timeline,

            start:"top center",

            end:"bottom bottom",

            scrub:true

        }

    });


}

gsap.utils.toArray(".timeline-item").forEach(item => {

    gsap.fromTo(
        item,
        {
            opacity:0,
            y:80
        },
        {
            opacity:1,
            y:0,
            duration:1,

            scrollTrigger:{
                trigger:item,
                start:"top 85%",
                toggleActions:"play none none reverse"
            }
        }
    );

});


gsap.utils.toArray(".future-card").forEach((card, i) => {

    gsap.from(card, {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: i * 0.15,

        scrollTrigger: {
            trigger: card,
            start: "top 85%"
        }
    });

});


gsap.utils.toArray(".timeline-image").forEach(img => {

    gsap.from(img,{
        opacity:0,
        scale:0.8,
        x: img.closest(".left") ? -100 : 100,
        duration:1.2,

        scrollTrigger:{
            trigger:img,
            start:"top 80%"
        }
    });

});

    ScrollTrigger.refresh();

    gsap.utils.toArray(".expert-card-pro").forEach((card,index)=>{

    gsap.from(card,{

        y:100,
        opacity:0,

        duration:1,

        delay:index * .1,

        scrollTrigger:{
            trigger:card,
            start:"top 85%"
        }
    });

});