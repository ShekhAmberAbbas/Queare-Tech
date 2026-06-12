/* =========================================================
   QUAERETECH ENTERPRISE V3
   SCRIPT.JS COMPLETE

   Features:
   ✔ Preloader Percentage
   ✔ Dark Mode Toggle
   ✔ Lenis Smooth Scroll
   ✔ GSAP + ScrollTrigger
   ✔ SplitType Animations
   ✔ Lottie Hero Animation
   ✔ Swiper Testimonials
   ✔ Animated Counters
   ✔ Custom Cursor
   ✔ Scroll Progress
   ✔ Active Navbar
   ✔ Magnetic Buttons
   ✔ Blog API Fetch
   ✔ Logo Hover Effects
   ✔ Floating Blobs Parallax

========================================================= */

/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

const preloader =
document.getElementById("preloader");

const percent =
document.getElementById("loaderPercent");

const progressCircle =
document.querySelector(".loader-progress-circle");

let count = 0;

const circumference = 314;

const loader = setInterval(() => {

count++;

percent.innerText = count + "%";

const offset =
circumference -
(count / 100) * circumference;

progressCircle.style.strokeDashoffset =
offset;

if(count >= 100){

clearInterval(loader);

setTimeout(() => {

preloader.style.opacity = "0";
preloader.style.visibility = "hidden";

},500);

}

},15);

});

/* =========================================================
   DARK MODE
========================================================= */

const themeToggle =
document.getElementById("themeToggle");

const body = document.body;

if(localStorage.getItem("theme") === "dark"){

body.classList.add("dark-mode");

themeToggle.innerHTML =
'<i class="bi bi-sun-fill"></i>';

}

themeToggle?.addEventListener("click",()=>{

body.classList.toggle("dark-mode");

if(body.classList.contains("dark-mode")){

localStorage.setItem("theme","dark");

themeToggle.innerHTML =
'<i class="bi bi-sun-fill"></i>';

}else{

localStorage.setItem("theme","light");

themeToggle.innerHTML =
'<i class="bi bi-moon-stars-fill"></i>';

}

});

/* =========================================================
   LENIS SMOOTH SCROLL
========================================================= */

// const lenis = new Lenis({

// duration:1.2,

// smoothWheel:true,

// });

// function raf(time){

// lenis.raf(time);

// requestAnimationFrame(raf);

// }

// requestAnimationFrame(raf);
/* =========================================================
   LENIS SMOOTH SCROLL
========================================================= */

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});

// Bridge Lenis → GSAP ScrollTrigger + AOS
lenis.on("scroll", () => {
  ScrollTrigger.update();
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* =========================================================
   GSAP
========================================================= */

gsap.registerPlugin(ScrollTrigger);



/* =========================================================
   ABOUT SECTION — IMAGE FALLBACK + GSAP REVEAL
========================================================= */

// Image fallback (works offline, no external URL needed)
const aboutImg =
  document.querySelector(".about-main-image");

if (aboutImg) {

  const svgFallback =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg"' +
      ' width="800" height="500">' +
      '<defs>' +
      '<linearGradient id="g" x1="0%" y1="0%"' +
      ' x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#dbeafe"/>' +
      '<stop offset="100%" stop-color="#cffafe"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<rect width="800" height="500"' +
      ' fill="url(#g)" rx="30"/>' +
      '<text x="400" y="230"' +
      ' font-family="sans-serif" font-size="32"' +
      ' fill="#2563eb" text-anchor="middle"' +
      ' font-weight="bold">QuaereTech</text>' +
      '<text x="400" y="280"' +
      ' font-family="sans-serif" font-size="18"' +
      ' fill="#64748b" text-anchor="middle">' +
      'AI-First Engineering</text>' +
      '</svg>'
    );

  aboutImg.onerror = function () {
    this.onerror = null;
    this.src = svgFallback;
  };

  // Trigger onerror if already broken
  if (!aboutImg.complete || aboutImg.naturalWidth === 0) {
    aboutImg.src = aboutImg.src;
  }

}

// GSAP replaces the removed data-aos on about columns
gsap.from("#about-img-col", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 75%"
  },
  x: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from("#about-text-col", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 75%"
  },
  x: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.2
});





/* =========================================================
   SPLIT TYPE
========================================================= */

if(typeof SplitType !== "undefined"){

const splitElements =
document.querySelectorAll(".split-text");

splitElements.forEach(el=>{

const split =
new SplitType(el,{

types:"chars"

});



gsap.from(split.chars,{

opacity:0,
y:80,
rotateX:-90,

duration:0.8,

stagger:0.02,

ease:"power4.out",

scrollTrigger:{

trigger:el,

start:"top 85%"

}

});

});

}

/* =========================================================
   HERO ANIMATION
========================================================= */

gsap.timeline()

.from(".hero-badge",{

y:-50,
opacity:0,
duration:.7

})

.from(".hero-title",{

y:80,
opacity:0,
duration:.9

})

.from(".hero-description",{

y:50,
opacity:0,
duration:.7

},"-=0.4")

.from(".hero-buttons",{

y:40,
opacity:0,
duration:.7

},"-=0.3")

.from(".hero-stats",{

y:50,
opacity:0,
duration:.7

},"-=0.3");

/* =========================================================
   FLOATING BLOBS
========================================================= */

document.addEventListener(
"mousemove",
(e)=>{

const x =
e.clientX / window.innerWidth;

const y =
e.clientY / window.innerHeight;

gsap.to(".blob-1",{

x:x*50,
y:y*40,
duration:2

});

gsap.to(".blob-2",{

x:-x*50,
y:-y*40,
duration:2

});

gsap.to(".blob-3",{

x:x*30,
y:-y*30,
duration:2

});

});

/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
document.getElementById("cursor-dot");

const cursorOutline =
document.getElementById("cursor-outline");

let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;

document.addEventListener("mousemove",(e)=>{

mouseX = e.clientX;
mouseY = e.clientY;

cursorDot.style.left =
mouseX + "px";

cursorDot.style.top =
mouseY + "px";

});

function animateCursor(){

outlineX +=
(mouseX - outlineX) * 0.12;

outlineY +=
(mouseY - outlineY) * 0.12;

cursorOutline.style.left =
outlineX + "px";

cursorOutline.style.top =
outlineY + "px";

requestAnimationFrame(
animateCursor
);

}

animateCursor();

/* =========================================================
   CURSOR HOVER
========================================================= */

document.querySelectorAll(
"a,button,.service-card,.blog-card,.case-card,.tech-track img"
).forEach(item=>{

item.addEventListener(
"mouseenter",
()=>{

document.body.classList.add(
"cursor-hover"
);

});

item.addEventListener(
"mouseleave",
()=>{

document.body.classList.remove(
"cursor-hover"
);

});

});

/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
document.querySelector(".custom-navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
document.querySelectorAll("section[id]");

const navLinks =
document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(sec=>{

const top =
sec.offsetTop - 150;

if(window.scrollY >= top){

current =
sec.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
=== "#" + current
){

link.classList.add("active");

}

});

});

/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress =
document.getElementById(
"scroll-progress"
);

window.addEventListener("scroll",()=>{

const winScroll =
document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled =
(winScroll / height) * 100;

progress.style.width =
scrolled + "%";

});

/* =========================================================
   COUNTERS
========================================================= */

const counters =
document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter =
entry.target;

const target =
+counter.dataset.target;

let count = 0;

const update = ()=>{

count += target / 100;

if(count < target){

counter.innerText =
Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText =
target;

}

};

update();

counterObserver.unobserve(counter);

}

});

},{
threshold:.4
});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* =========================================================
   SWIPER
========================================================= */

// new Swiper(".testimonialSwiper",{

// slidesPerView:1,

// spaceBetween:25,

// loop:true,

// autoplay:{

// delay:3500,

// disableOnInteraction:false

// },

// pagination:{

// el:".swiper-pagination",

// clickable:true

// },

// breakpoints:{

// 768:{

// slidesPerView:2

// },

// 1200:{

// slidesPerView:3

// }

// }

// });

// In first.js — find your Swiper init and change loop to false:

new Swiper(".testimonialSwiper", {

  slidesPerView: 1,
  spaceBetween: 25,
  loop: false,          // ← was true, causing the warning

  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  breakpoints: {
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 }
  }

});
/* =========================================================
   VANILLA TILT
========================================================= */

if(typeof VanillaTilt !== "undefined"){

VanillaTilt.init(

document.querySelectorAll(
".tilt-card"
),

{

max:8,
speed:400,

glare:true,

"max-glare":0.15

}

);

}

/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document
.querySelectorAll(".magnetic-btn")
.forEach(btn=>{

btn.addEventListener(
"mousemove",
(e)=>{

const rect =
btn.getBoundingClientRect();

const x =
e.clientX - rect.left -
rect.width / 2;

const y =
e.clientY - rect.top -
rect.height / 2;

gsap.to(btn,{

x:x * 0.15,

y:y * 0.15,

duration:.3

});

});

btn.addEventListener(
"mouseleave",
()=>{

gsap.to(btn,{

x:0,
y:0,

duration:.4

});

});

});

/* =========================================================
   LOTTIE HERO
========================================================= */

if(window.lottie){

lottie.loadAnimation({

container:
document.getElementById(
"heroLottie"
),

renderer:"svg",

loop:true,

autoplay:true,

path:
"https://assets9.lottiefiles.com/packages/lf20_fcfjwiyb.json"

});

}

/* =========================================================
   BLOG API
========================================================= */

/*
Example blogs.json

[
 {
  "title":"AI In Enterprise",
  "image":"assets/blogs/blog1.webp",
  "excerpt":"How AI is transforming businesses."
 }
]
*/

// async function loadBlogs(){

// const blogContainer =
// document.getElementById(
// "blogContainer"
// );

// if(!blogContainer) return;

// try{

// const response =
// await fetch("data/blogs.json");

// const blogs =
// await response.json();

// blogContainer.innerHTML = "";

// blogs.forEach(blog=>{

// blogContainer.innerHTML += `

// <div class="col-lg-4">

// <div class="blog-card">

// <div class="blog-image">

// <img src="${blog.image}"
// alt="${blog.title}">

// </div>

// <div class="blog-content">

// <h4>
// ${blog.title}
// </h4>

// <p>
// ${blog.excerpt}
// </p>

// <a href="${blog.link}">
// Read More →
// </a>

// </div>

// </div>

// </div>

// `;

// });

// }catch(error){

// console.error(
// "Blog API Error:",
// error
// );

// }

// }
/* =========================================================
   BLOG - INLINE DATA (No CORS / No server needed)
========================================================= */

// function loadBlogs() {

//   const blogContainer =
//     document.getElementById("blogContainer");

//   if (!blogContainer) return;

//   const blogs = [
//     {
//       title: "How AI is Transforming Enterprise Software in 2026",
//       image: "assets/blogs/blog1.jpg",
//       excerpt: "Generative AI and intelligent automation are reshaping ERP, CRM and enterprise workflows globally.",
//       link: "#"
//     },
//     {
//       title: "Cloud-Native Architecture: Best Practices",
//       image: "assets/blogs/blog2.jpg",
//       excerpt: "Microservices, containerization and Kubernetes strategies for modern enterprise applications.",
//       link: "#"
//     },
//     {
//       title: "Building RAG Systems for Business Intelligence",
//       image: "assets/blogs/blog3.jpg",
//       excerpt: "How Retrieval-Augmented Generation is revolutionizing knowledge management and decision-making.",
//       link: "#"
//     }
//   ];

//   blogContainer.innerHTML = "";

//   blogs.forEach((blog, i) => {

//     // Fallback image if file missing
//     const fallback =
//       `https://picsum.photos/seed/qt${i}/800/400`;

//     blogContainer.innerHTML += `
//       <div class="col-lg-4"
//         data-aos="fade-up"
//         data-aos-delay="${i * 100}">
//         <div class="blog-card">
//           <div class="blog-image">
//             <img
//               src="${blog.image}"
//               alt="${blog.title}"
//               onerror="this.src='${fallback}'"
//             >
//           </div>
//           <div class="blog-content">
//             <h4>${blog.title}</h4>
//             <p>${blog.excerpt}</p>
//             <a href="${blog.link}">Read More →</a>
//           </div>
//         </div>
//       </div>
//     `;
//   });
// }

/* =========================================================
   BLOG — INLINE DATA + GSAP REVEAL (No AOS on dynamic elements)
========================================================= */

function loadBlogs() {

  const blogContainer =
    document.getElementById("blogContainer");

  if (!blogContainer) return;

  const blogs = [
    {
      title: "How AI is Transforming Enterprise Software",
      image: "assets/blogs/blog1.jpg",
      excerpt: "Generative AI and intelligent automation are reshaping ERP, CRM and enterprise workflows globally.",
      link: "#"
    },
    {
      title: "Cloud-Native Architecture: Best Practices",
      image: "assets/blogs/blog2.jpg",
      excerpt: "Microservices, containerization and Kubernetes strategies for modern enterprise applications.",
      link: "#"
    },
    {
      title: "Building RAG Systems for Business Intelligence",
      image: "assets/blogs/blog3.jpg",
      excerpt: "How Retrieval-Augmented Generation is revolutionizing knowledge management and decision-making.",
      link: "#"
    }
  ];

  // Clear skeleton cards
  blogContainer.innerHTML = "";

  blogs.forEach((blog, i) => {

    const fallback =
      `https://picsum.photos/seed/qtblog${i + 1}/800/400`;

    // NO data-aos here — that was causing opacity:0 to stick
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

  // GSAP animates AFTER cards are in the DOM
  // Small timeout ensures DOM has painted before GSAP measures
  setTimeout(() => {

    gsap.from(
      blogContainer.querySelectorAll(".blog-card"),
      {
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
        onComplete: () => {
          // Make sure cards are fully visible after animation
          blogContainer
            .querySelectorAll(".blog-card")
            .forEach(card => {
              card.style.opacity = "1";
              card.style.transform = "none";
            });
        }
      }
    );

    // Tell ScrollTrigger about the new DOM elements
    ScrollTrigger.refresh();

  }, 100);

}

// loadBlogs();

loadBlogs();

/* =========================================================
   GSAP SECTION REVEALS
========================================================= */

gsap.utils.toArray(

".service-card,.why-card,.case-card,.timeline-item,.stats-card,.testimonial-card,.blog-card"

).forEach(item=>{

gsap.from(item,{

opacity:0,

y:80,

duration:0.8,

scrollTrigger:{

trigger:item,

start:"top 85%"

}

});

});

/* =========================================================
   LOGO MARQUEE PAUSE
========================================================= */

const marquee =
document.querySelector(".logo-track");

if(marquee){

marquee.addEventListener(
"mouseenter",
()=>{

marquee.style.animationPlayState =
"paused";

});

marquee.addEventListener(
"mouseleave",
()=>{

marquee.style.animationPlayState =
"running";

});

}

/* =========================================================
   CONTACT FORM DEMO
========================================================= */

const form =
document.getElementById(
"contactForm"
);

if(form){

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const btn =
this.querySelector("button");

btn.disabled = true;

btn.innerHTML =
"Sending...";

setTimeout(()=>{

btn.innerHTML =
"Message Sent ✓";

this.reset();

setTimeout(()=>{

btn.innerHTML =
'Send Message <i class="bi bi-send-fill"></i>';

btn.disabled = false;

},3000);

},1500);

});

}

/* =========================================================
   PERFORMANCE
========================================================= */

ScrollTrigger.refresh();

/* =========================================================
   END
========================================================= */

console.log(
"%cQuaereTech Enterprise V3 Loaded 🚀",
"color:#2563eb;font-size:16px;font-weight:bold;"
);

document.querySelectorAll(
  ".logo-track img, .tech-track img"
).forEach(img => {
  img.onerror = function() {
    this.style.display = "none";
  };
});