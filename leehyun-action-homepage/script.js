document.body.classList.add("has-js");

const progressBar = document.getElementById("progressBar");
const sections = [...document.querySelectorAll("main section[id]")];
const menuLinks = [...document.querySelectorAll(".top-nav__menu a")];
const revealBlocks = [...document.querySelectorAll(".reveal")];
const sideRail = document.getElementById("sideRail");
const navToggle = document.getElementById("navToggle");
const topMenu = document.getElementById("topMenu");
const prefersReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const menuMap = new Map(menuLinks.map((link) => [link.hash.replace("#", ""), link]));
const sideMap = new Map();

if (sideRail) {
  sections.forEach((section) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "side-rail__dot";
    dot.setAttribute("aria-label", `${section.dataset.nav || section.id} 섹션 이동`);
    dot.setAttribute("data-label", section.dataset.nav || section.dataset.mark || section.id);
    dot.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    sideMap.set(section.id, dot);
    sideRail.appendChild(dot);
  });
}

function closeMobileMenu() {
  if (!topMenu || !navToggle) return;
  topMenu.classList.remove("is-open");
  navToggle.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "메뉴 열기");
}

function toggleMobileMenu() {
  if (!topMenu || !navToggle) return;
  const next = !topMenu.classList.contains("is-open");
  topMenu.classList.toggle("is-open", next);
  navToggle.classList.toggle("is-open", next);
  navToggle.setAttribute("aria-expanded", next ? "true" : "false");
  navToggle.setAttribute("aria-label", next ? "메뉴 닫기" : "메뉴 열기");
}

if (navToggle && topMenu) {
  navToggle.addEventListener("click", toggleMobileMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760) closeMobileMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 760) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!topMenu.contains(target) && !navToggle.contains(target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMobileMenu();
  });
}

function setActiveNavigation(id) {
  menuLinks.forEach((link) => link.classList.remove("is-active"));
  const activeMenu = menuMap.get(id);
  if (activeMenu) activeMenu.classList.add("is-active");

  sideMap.forEach((dot) => dot.classList.remove("is-active"));
  const activeDot = sideMap.get(id);
  if (activeDot) activeDot.classList.add("is-active");
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    }
  },
  { threshold: 0.16 }
);

revealBlocks.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      setActiveNavigation(entry.target.id);
    });
  },
  { threshold: 0.35, rootMargin: "-15% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
if (sections[0]) setActiveNavigation(sections[0].id);

function updateProgress() {
  const doc = document.documentElement;
  const maxScrollable = doc.scrollHeight - doc.clientHeight;
  const ratio = maxScrollable > 0 ? (doc.scrollTop / maxScrollable) * 100 : 0;
  progressBar.style.width = `${Math.max(0, Math.min(100, ratio))}%`;
}

document.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

if (!prefersReduceMotion) {
  const hero = document.getElementById("hero");
  const headline = document.querySelector(".hero__headline");
  if (hero && headline) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      headline.style.transform = `translateY(${y * -8}px) rotateX(${y * 3}deg) rotateY(${x * -5}deg)`;
    });
    hero.addEventListener("pointerleave", () => {
      headline.style.transform = "";
    });
  }
}
