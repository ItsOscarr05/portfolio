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

  // --- Smooth eased navigation for in-page anchors ---
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const NAV_OFFSET = 84; // matches html scroll-padding-top / sticky nav height
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const smoothScrollTo = (targetY, duration = 700) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (reduceMotion.matches || Math.abs(diff) < 4) {
      window.scrollTo(0, targetY);
      return;
    }
    let startTs;
    const step = (ts) => {
      if (startTs === undefined) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      const y = window.scrollY + target.getBoundingClientRect().top - NAV_OFFSET;
      smoothScrollTo(Math.max(0, y));
      history.pushState(null, "", href);
    });
  });

  // --- Smooth expand/collapse for About-card dropdowns ---
  document.querySelectorAll(".fact").forEach((fact) => {
    const summary = fact.querySelector("summary");
    const info = fact.querySelector(".fact__info");
    if (!summary || !info) return;

    fact.classList.toggle("is-open", fact.open);

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      if (fact.classList.contains("is-animating")) return;

      // Reduced motion: skip animation, just toggle state.
      if (reduceMotion.matches) {
        fact.open = !fact.open;
        fact.classList.toggle("is-open", fact.open);
        return;
      }

      const onEnd = (ev) => {
        if (ev.propertyName !== "height") return;
        info.style.height = "";
        info.style.opacity = "";
        fact.classList.remove("is-animating");
        if (!fact.classList.contains("is-open")) fact.open = false;
        info.removeEventListener("transitionend", onEnd);
      };

      if (fact.open) {
        // Collapse
        fact.classList.add("is-animating");
        fact.classList.remove("is-open");
        const start = info.scrollHeight;
        info.style.height = start + "px";
        info.style.opacity = "1";
        void info.offsetHeight; // force reflow so the transition runs
        info.style.height = "0px";
        info.style.opacity = "0";
        info.addEventListener("transitionend", onEnd);
      } else {
        // Expand
        fact.classList.add("is-animating", "is-open");
        fact.open = true;
        const target = info.scrollHeight;
        info.style.height = "0px";
        info.style.opacity = "0";
        void info.offsetHeight; // force reflow
        info.style.height = target + "px";
        info.style.opacity = "1";
        info.addEventListener("transitionend", onEnd);
      }
    });
  });

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
