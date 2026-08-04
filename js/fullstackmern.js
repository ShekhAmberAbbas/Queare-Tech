const modules = [
  {
    title: "Foundation: Semantic HTML5 & Modern CSS",
    desc: "Build accessible, responsive page layouts from scratch.",
    topics: ["Semantic HTML5","Flexbox & Grid","Responsive Layouts"]
  },
  {
    title: "Modern JavaScript (ES6+)",
    desc: "Master async programming and DOM manipulation.",
    topics: ["ES6+ Syntax","Promises & Async/Await","DOM APIs"]
  },
  {
    title: "React & Hooks",
    desc: "Build component-driven, interactive user interfaces.",
    topics: ["Components","useState / useEffect","Custom Hooks"]
  },
  {
    title: "State Management",
    desc: "Manage complex application state cleanly at scale.",
    topics: ["Redux Toolkit","Context API","App Architecture"]
  },
  {
    title: "REST APIs with Node & Express",
    desc: "Design and build backend services and endpoints.",
    topics: ["Express Routing","Middleware","REST Design"]
  },
  {
    title: "Authentication & Authorization",
    desc: "Secure applications with token-based auth.",
    topics: ["JWT","Protected Routes","Role-based Access"]
  },
  {
    title: "MongoDB & Mongoose",
    desc: "Design schemas and query data efficiently.",
    topics: ["Schema Design","Mongoose ODM","Aggregation"]
  },
  {
    title: "Deployment & CI/CD",
    desc: "Ship full-stack apps to production with pipelines.",
    topics: ["CI/CD Pipelines","Environment Config","Production Deploys"]
  }
];

const accordion = document.getElementById("curriculumAccordion");

modules.forEach((module, index) => {

    accordion.innerHTML += `
    
    <div class="accordion-item shadow-sm border-0 rounded-4 mb-3 overflow-hidden">

        <h2 class="accordion-header" id="heading${index}">

            <button class="accordion-button ${index !== 0 ? "collapsed" : ""}"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}"
                    aria-expanded="${index === 0}"
                    aria-controls="collapse${index}">

                <div class="d-flex align-items-center w-100">

                    <div class="module-number me-3">
                        ${(index + 1).toString().padStart(2,'0')}
                    </div>

                    <div>
                        <h5 class="mb-1">${module.title}</h5>
                        <small class="text-muted">${module.desc}</small>
                    </div>

                </div>

            </button>

        </h2>

        <div id="collapse${index}"
             class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
             data-bs-parent="#curriculumAccordion">

            <div class="accordion-body">

                <div class="row g-3">

                    ${module.topics.map(topic => `

                        <div class="col-md-4">

                            <div class="topic-card">

                                <i class="fa-solid fa-circle-check me-2 text-primary"></i>

                                ${topic}

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>

        </div>

    </div>

    `;
});

// Mouse Parallax Effect

document.querySelectorAll(".related-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateY=((x-rect.width/2)/18);
const rotateX=(-(y-rect.height/2)/18);

card.style.transform=
`perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-12px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});

});


document.querySelectorAll(".salary-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rotateY=(x-rect.width/2)/18;
const rotateX=-(y-rect.height/2)/18;

card.style.transform=`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(1000px) rotateX(0) rotateY(0)";

});

});


(function(){
  "use strict";
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Seat progress bar: animate when scrolled into view ---------- */
  const seatFill = document.getElementById('seatFill');
  const seatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        seatFill.style.width = seatFill.dataset.target + '%';
        seatObserver.disconnect();
      }
    });
  }, { threshold: .4 });
  seatObserver.observe(seatFill);

  /* ---------- Magnetic button hover effect ---------- */
  const btn = document.getElementById('enrollBtn');
  if (!reduceMotion) {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.12;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
  }

  /* ---------- Copy-to-clipboard on contact items ---------- */
  document.querySelectorAll('.contact-item[data-copy]').forEach(item => {
    item.addEventListener('click', async () => {
      const value = item.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
      } catch (e) { /* clipboard unavailable, still show feedback */ }
      const hint = item.querySelector('.copy-hint');
      const original = hint.textContent;
      item.classList.add('copied');
      hint.textContent = 'copied!';
      setTimeout(() => {
        item.classList.remove('copied');
        hint.textContent = original;
      }, 1400);
    });
  });

  /* ---------- Terminal spec card: typewriter-style line reveal ---------- */
  const specLines = [
    { k: 'liveSessions', v: '94', t: 'num' },
    { k: 'projects', v: '12', t: 'num' },
    { k: 'language', v: 'Hindi + English', t: 'str' },
    { k: 'skillLevel', v: 'Beginner → Advanced', t: 'str' },
    { k: 'mode', v: 'Online (Live)', t: 'str' },
    { k: 'certificate', v: 'true', t: 'bool' },
    { k: 'placementAssistance', v: 'true', t: 'bool' },
    { k: 'doubtSupport', v: '1:1 Mentor', t: 'str' },
  ];

  function renderValue(item){
    if (item.t === 'num') return `<span class="tk-num">${item.v}</span>`;
    if (item.t === 'bool') return `<span class="tk-bool">${item.v}</span>`;
    return `<span class="tk-str">"${item.v}"</span>`;
  }

  const body = document.getElementById('terminalBody');
  const lines = [];
  lines.push(`<span class="tk-punc">{</span>`);
  specLines.forEach((item, i) => {
    const comma = i < specLines.length - 1 ? '<span class="tk-punc">,</span>' : '';
    lines.push(`  <span class="tk-key">"${item.k}"</span><span class="tk-punc">:</span> ${renderValue(item)}${comma}`);
  });
  lines.push(`<span class="tk-punc">}</span><span class="cursor"></span>`);

  lines.forEach(html => {
    const div = document.createElement('div');
    div.className = 'line';
    div.innerHTML = html;
    body.appendChild(div);
  });

  function playTypewriter(){
    const lineEls = body.querySelectorAll('.line');
    if (reduceMotion) {
      lineEls.forEach(l => l.classList.add('show'));
      return;
    }
    lineEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('show'), i * 110);
    });
  }

  let played = false;
  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !played) {
        played = true;
        playTypewriter();
        termObserver.disconnect();
      }
    });
  }, { threshold: .3 });
  termObserver.observe(document.getElementById('terminalCard'));
})();
