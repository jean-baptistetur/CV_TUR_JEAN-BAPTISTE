const cur = document.getElementById("cur");
const ring = document.getElementById("ring");
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
(function follow() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  ring.style.left = fx + "px";
  ring.style.top = fy + "px";
  requestAnimationFrame(follow);
})();
document.querySelectorAll("a,button,.sc,.hob-tag").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cur.style.width = "18px";
    cur.style.height = "18px";
    ring.style.width = "52px";
    ring.style.height = "52px";
    ring.style.opacity = ".3";
  });
  el.addEventListener("mouseleave", () => {
    cur.style.width = "10px";
    cur.style.height = "10px";
    ring.style.width = "32px";
    ring.style.height = "32px";
    ring.style.opacity = "1";
  });
});

window.addEventListener("scroll", () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById("prog").style.width = pct + "%";
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 40);
});

const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");
let W = 0,
  H = 0,
  pts = [];
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);
for (let i = 0; i < 110; i++) {
  pts.push({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.2 + 0.3,
    o: Math.random() * 0.5 + 0.1,
  });
}
let mouseX = W / 2,
  mouseY = H / 2;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    const dx = p.x - mouseX,
      dy = p.y - mouseY,
      d = Math.sqrt(dx * dx + dy * dy);
    if (d < 100) {
      p.x += (dx / d) * 0.8;
      p.y += (dy / d) * 0.8;
    }
    pts.slice(i + 1).forEach((q) => {
      const ex = p.x - q.x,
        ey = p.y - q.y,
        ed = Math.sqrt(ex * ex + ey * ey);
      if (ed < 130) {
        ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - ed / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    });
    ctx.fillStyle = `rgba(0,229,255,${p.o})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

const phrases = [
  "Python & Langage C",
  "Réseaux Informatiques",
  "Cybersécurité / TryHackMe",
  "Développement Web",
];
let pi = 0,
  ci = 0,
  del = false;
const twEl = document.getElementById("tw");
function type() {
  const ph = phrases[pi];
  if (!del) {
    twEl.textContent = ph.slice(0, ++ci);
    if (ci === ph.length) {
      del = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    twEl.textContent = ph.slice(0, --ci);
    if (ci === 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, del ? 45 : 75);
}
type();

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("vis");
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll(".reveal,.tl-item,.edu-c,.lang-c")
  .forEach((el) => obs.observe(el));

const skObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target
          .querySelectorAll(".sk-fill")
          .forEach((f, i) => setTimeout(() => f.classList.add("go"), i * 120));
        skObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.25 },
);
const skSec = document.getElementById("skills");
if (skSec) skObs.observe(skSec);
