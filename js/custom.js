/* ===================================================
   QUAERETECH V2
   SCRIPT.JS COMPLETE
=================================================== */

/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load", () => {

const preloader =
document.getElementById("preloader");

setTimeout(() => {

preloader.style.opacity = "0";

preloader.style.visibility = "hidden";

}, 1800);

});

/* ==========================================
   AOS INIT
========================================== */

AOS.init({

duration: 800,
once: true,
offset: 80,
easing: "ease-out-cubic"

});

/* ==========================================
   LENIS SMOOTH SCROLL
========================================== */

const lenis = new Lenis({

duration: 1.2,
smoothWheel: true

});

function raf(time) {

lenis.raf(time);

requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

/* ==========================================
   GSAP REGISTER
========================================== */

gsap.registerPlugin(ScrollTrigger);

/* ==========================================
   NAVBAR SCROLL
========================================== */

const navbar =
document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {

if(window.scrollY > 80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

const progressBar =
document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

const scrollTop =
document.documentElement.scrollTop;

const scrollHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const percent =
(scrollTop / scrollHeight) * 100;

progressBar.style.width =
percent + "%";

});

/* ==========================================
   CUSTOM CURSOR
========================================== */

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

/* ==========================================
   CURSOR HOVER EFFECT
========================================== */

document.querySelectorAll(
"a,button,.service-card,.tech-item,.case-card,.blog-card,.testimonial-card,.why-card"
).forEach(el=>{

el.addEventListener("mouseenter",()=>{

document.body.classList.add(
"cursor-hover"
);

});

el.addEventListener("mouseleave",()=>{

document.body.classList.remove(
"cursor-hover"
);

});

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounter(el){

const target =
+el.dataset.target;

let count = 0;

const speed = target / 120;

const update = () => {

count += speed;

if(count < target){

el.innerText =
Math.floor(count);

requestAnimationFrame(update);

}else{

el.innerText = target;

}

};

update();

}

const counterObserver =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateCounter(entry.target);

counterObserver.unobserve(
entry.target
);

}

});

},{
threshold:.4
});

document
.querySelectorAll(".counter")
.forEach(counter=>{

counterObserver.observe(counter);

});

/* ==========================================
   GSAP HERO ANIMATION
========================================== */

const heroTimeline =
gsap.timeline();

heroTimeline

.from(".hero-badge",{

y:-50,
opacity:0,
duration:.7

})

.from(".hero-title",{

y:60,
opacity:0,
duration:.8

})

.from(".hero-description",{

y:50,
opacity:0,
duration:.7

},"-=0.3")

.from(".hero-buttons",{

y:50,
opacity:0,
duration:.7

},"-=0.3")

.from(".hero-stats",{

y:50,
opacity:0,
duration:.7

},"-=0.4");

/* ==========================================
   FLOATING CARDS ANIMATION
========================================== */

gsap.to(".floating-card",{

y:-15,

repeat:-1,

yoyo:true,

duration:2,

stagger:.3,

ease:"power1.inOut"

});

/* ==========================================
   SECTION REVEALS
========================================== */

gsap.utils.toArray("section").forEach(sec=>{

gsap.from(sec,{

scrollTrigger:{

trigger:sec,
start:"top 80%"

},

opacity:0,
y:80,
duration:1

});

});

/* ==========================================
   SERVICE CARDS STAGGER
========================================== */

gsap.from(".service-card",{

scrollTrigger:{

trigger:".services-section",
start:"top 70%"

},

opacity:0,
y:100,
duration:1,

stagger:.15

});

/* ==========================================
   CASE STUDIES STAGGER
========================================== */

gsap.from(".case-card",{

scrollTrigger:{

trigger:".case-study-section",
start:"top 75%"

},

opacity:0,
scale:.85,

duration:1,

stagger:.2

});

/* ==========================================
   WHY CARDS
========================================== */

gsap.from(".why-card",{

scrollTrigger:{

trigger:".why-section",
start:"top 75%"

},

opacity:0,
x:50,

duration:.8,

stagger:.15

});

/* ==========================================
   TECH ITEMS
========================================== */

gsap.from(".tech-item",{

scrollTrigger:{

trigger:".tech-section",
start:"top 75%"

},

opacity:0,
y:50,

duration:.6,

stagger:.08

});

/* ==========================================
   TIMELINE
========================================== */

gsap.from(".timeline-item",{

scrollTrigger:{

trigger:".timeline",
start:"top 75%"

},

opacity:0,
y:80,

duration:.8,

stagger:.15

});

/* ==========================================
   SWIPER TESTIMONIALS
========================================== */

new Swiper(".testimonialSwiper",{

slidesPerView:1,

spaceBetween:25,

loop:true,

autoplay:{

delay:3500,
disableOnInteraction:false

},

pagination:{

el:".swiper-pagination",
clickable:true

},

breakpoints:{

768:{
slidesPerView:2
},

1200:{
slidesPerView:3
}

}

});

/* ==========================================
   VANILLA TILT
========================================== */

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

/* ==========================================
   MAGNETIC BUTTONS
========================================== */

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
rect.width/2;

const y =
e.clientY - rect.top -
rect.height/2;

gsap.to(btn,{

x:x*0.15,
y:y*0.15,

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

/* ==========================================
   ACTIVE NAV LINK
========================================== */

const sections =
document.querySelectorAll("section[id]");

const navLinks =
document.querySelectorAll(
".nav-link"
);

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop - 120;

const sectionHeight =
section.clientHeight;

if(window.scrollY >= sectionTop){

current =
section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove(
"active"
);

if(
link.getAttribute("href")
=== "#" + current
){

link.classList.add(
"active"
);

}

});

});

/* ==========================================
   CONTACT FORM
========================================== */

const form =
document.getElementById(
"contactForm"
);

if(form){

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const button =
this.querySelector("button");

button.innerHTML =
"Sending...";

button.disabled = true;

setTimeout(()=>{

button.innerHTML =
"Message Sent ✓";

button.style.background =
"#22c55e";

this.reset();

setTimeout(()=>{

button.innerHTML =
'Send Message <i class="bi bi-send-fill"></i>';

button.disabled = false;

button.style.background =
"";

},3000);

},1800);

});

}

/* ==========================================
   PARALLAX BLOBS
========================================== */

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

x:-x*60,
y:-y*40,

duration:2

});

gsap.to(".blob-3",{

x:x*30,
y:-y*30,

duration:2

});

});

/* ==========================================
   LOGO MARQUEE PAUSE
========================================== */

const marquee =
document.querySelector(
".logo-track"
);

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

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(

"%cQuaereTech V2 Loaded Successfully 🚀",

"font-size:16px;color:#2563eb;font-weight:bold"

);

/* ==========================================
   END OF FILE
========================================== */