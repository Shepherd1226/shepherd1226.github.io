/* ==========================================================================
   Project pages — shared interaction layer
   Adds the frosted-header scrolled state, scroll-spy for the segmented nav,
   and a soft scroll reveal. Every project page opts in by loading this file.
   ========================================================================== */

(() => {
  // A missing/empty static asset should not break the layout with a broken
  // image icon. Hide only images that actually failed; alt text stays in DOM.
  document.querySelectorAll("img").forEach((image) => {
    const markMissing = () => image.classList.add("is-missing");
    if (image.complete && image.naturalWidth === 0) markMissing();
    image.addEventListener("error", markMissing, { once: true });
  });

  const header = document.querySelector(".site-header");

  if (header) {
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    window.addEventListener("scroll", syncHeader, { passive: true });
    syncHeader();
  }

  // Scroll-spy: highlight the section currently being read in the glass nav.
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-18% 0px -68%", threshold: [0, 0.2, 0.55] },
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  document.documentElement.classList.add("motion-ready");

  const revealSelectors = [
    "main > header",
    "main > section",
    "main > .teaser-video-container",
    "main > .hero",
    "main > .hero-demo",
    ".band > .section-shell",
  ];

  const revealTargets = [
    ...new Set(revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)])),
  ];

  revealTargets.forEach((element) => element.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-inview"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inview", entry.isIntersecting);
      });
    },
    { rootMargin: "90px 0px", threshold: 0.01 },
  );

  revealTargets.forEach((element) => {
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      window.requestAnimationFrame(() => element.classList.add("is-inview"));
    }
    revealObserver.observe(element);
  });

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    revealTargets.forEach((element) => element.classList.add("is-inview"));
  });
})();
