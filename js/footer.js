(function () {
      const hero   = document.getElementById('qfHero');
      const reveal = document.getElementById('qfReveal');

      let raf    = null;
      let active = false;

      // Target (where the mouse is) and current (lerped, smooth)
      let tx = -999, ty = -999;
      let cx = -999, cy = -999;
      let pct = 0;           // reveal circle size as % of gradient, 0–60

      const lerp = (a, b, t) => a + (b - a) * t;

      function setMask(x, y, p) {
        const m = `radial-gradient(circle at ${x.toFixed(1)}px ${y.toFixed(1)}px, #000 0%, transparent ${p.toFixed(1)}%)`;
        reveal.style.maskImage         = m;
        reveal.style.webkitMaskImage   = m;
      }

      function tick() {
        // Smoothly follow the mouse
        cx  = lerp(cx,  tx,  0.1);
        cy  = lerp(cy,  ty,  0.1);
        // Animate the reveal circle open/close
        pct = lerp(pct, active ? 60 : 0, 0.1);

        setMask(cx, cy, pct);

        // Keep animating while hovering OR while circle is still closing
        raf = (active || pct > 0.25) ? requestAnimationFrame(tick) : null;
      }

      function start() {
        if (!raf) raf = requestAnimationFrame(tick);
      }

      hero.addEventListener('mouseenter', (e) => {
        const r = hero.getBoundingClientRect();
        // Snap current position immediately so there's no sweep from off-screen
        tx = cx = e.clientX - r.left;
        ty = cy = e.clientY - r.top;
        active = true;
        start();
      });

      hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
        start();
      });

      hero.addEventListener('mouseleave', () => {
        active = false;
        start(); // let the closing animation finish
      });
    })();