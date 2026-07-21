// Oscar Berrigan — Portfolio interactions
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const navAnchors = links.querySelectorAll('a[href^="#"]');

  // --- Sticky nav shadow on scroll ---
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Mobile menu toggle ---
  const closeMenu = () => {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  navAnchors.forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // --- Active section highlighting ---
  const sections = [...navAnchors]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navAnchors.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // --- Reveal on scroll ---
  const revealables = document.querySelectorAll(
    ".section__title, .about, .card, .skills__group, .contact"
  );
  revealables.forEach((el) => el.classList.add("reveal"));

  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealables.forEach((el) => revealer.observe(el));

  // --- Profile picture fallback ---
  // Shows the "OB" initials until a real assets/profile.jpg is added.
  const pfp = document.getElementById("pfp");
  const pfpFrame = document.getElementById("pfp-frame");
  if (pfp && pfpFrame) {
    const showFallback = () => pfpFrame.classList.add("no-img");
    if (pfp.complete && pfp.naturalWidth === 0) showFallback();
    pfp.addEventListener("error", showFallback);
  }

  // --- Current year in footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
