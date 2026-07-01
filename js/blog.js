const API_KEY = "6e09ebd0c73ebf0d9896b153da854df6";
const API_URL = `https://gnews.io/api/v4/search?q=(AI OR "Machine Learning" OR Cybersecurity OR Programming)&lang=en&max=6&apikey=${API_KEY}`;

const BLOG_KEY = "quaereBlogs";
const BLOG_TIME = "quaereBlogsTime";

const UPDATE_INTERVAL = 28.8 * 60 * 1000; // 50 times/day

document.addEventListener("DOMContentLoaded", initBlogs);

async function initBlogs() {

    const savedBlogs = localStorage.getItem(BLOG_KEY);
    const lastUpdate = localStorage.getItem(BLOG_TIME);

    if (
        savedBlogs &&
        lastUpdate &&
        (Date.now() - Number(lastUpdate)) < UPDATE_INTERVAL
    ) {
        renderBlogs(JSON.parse(savedBlogs));
        return;
    }

    fetchBlogs();
}

async function fetchBlogs() {

    try {

        const res = await fetch(API_URL);
        const data = await res.json();

        const blogs = data.articles
            .filter(article => article.image)
            .map(article => ({
                title: article.title,
                excerpt: article.description || "Click to read more...",
                image: article.image,
                link: article.url
            }));

        localStorage.setItem(BLOG_KEY, JSON.stringify(blogs));
        localStorage.setItem(BLOG_TIME, Date.now());

        renderBlogs(blogs);

    } catch (err) {

        console.log(err);

        const cached = localStorage.getItem(BLOG_KEY);

        if (cached) {
            renderBlogs(JSON.parse(cached));
        }

    }

}

function renderBlogs(blogs){

const container=document.getElementById("blogContainer");

container.innerHTML="";

blogs.forEach((blog,index)=>{

container.innerHTML+=`

<div class="swiper-slide">

<div class="blog-card">

<div class="blog-image">
<img src="${blog.image}" alt="${blog.title}">
</div>

<div class="blog-content">

<h5 class="blog-title">
${blog.title}
</h5>

<p class="blog-text">
${blog.excerpt}
</p>

<a
href="#"
class="blog-btn"
onclick="openBlog(${index});return false;">
Read More →
</a>

</div>

</div>

</div>

`;

});

window.blogData=blogs;

new Swiper(".blogSwiper",{

slidesPerView:3,
spaceBetween:30,
loop:true,

autoplay:{
delay:4000,
disableOnInteraction:false
},

pagination:{
el:".swiper-pagination",
clickable:true
},

breakpoints:{

320:{
slidesPerView:1
},

768:{
slidesPerView:2
},

1200:{
slidesPerView:3
}

}

});

}

function openBlog(index){

const blog=window.blogData[index];

document.getElementById("modalTitle").innerHTML=blog.title;

document.getElementById("modalImage").src=blog.image;

document.getElementById("modalText").innerHTML=blog.excerpt;

document.getElementById("modalLink").href=blog.link;

new bootstrap.Modal(
document.getElementById("blogModal")
).show();

}