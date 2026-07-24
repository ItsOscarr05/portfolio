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

  // --- Smooth eased scrolling (wheel + in-page anchors) ---
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const NAV_OFFSET = 84; // matches html scroll-padding-top / sticky nav height

  // Custom wheel smoothing only where it helps: mouse/trackpad, motion allowed.
  // Touch devices keep their native momentum scrolling.
  const smoothEnabled = finePointer.matches && !reduceMotion.matches;

  const maxScroll = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const clampY = (y) => Math.max(0, Math.min(y, maxScroll()));

  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let ticking = false;
  const EASE = 0.12; // lower = smoother/longer glide

  const tick = () => {
    currentY += (targetY - currentY) * EASE;
    if (Math.abs(targetY - currentY) < 0.4) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      ticking = false;
      return;
    }
    window.scrollTo(0, currentY);
    requestAnimationFrame(tick);
  };
  const ensureTick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  };

  // Deliberate, clearly-visible glide for nav/CTA clicks (independent of the
  // subtle wheel lerp) — eased over a fixed duration so the motion reads well.
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // JS drives all click scrolling, so make sure native CSS smoothing never
  // competes with our per-frame updates (a common cause of "jumpy" scrolling).
  document.documentElement.style.scrollBehavior = "auto";

  let clickRaf = null;
  const scrollToY = (y) => {
    const destY = clampY(y);
    const startY = window.scrollY;
    const diff = destY - startY;

    // Note: this glide is an explicit navigation action the user requested, so
    // we animate it even when prefers-reduced-motion is set. Only skip for
    // trivially small distances.
    if (Math.abs(diff) < 4) {
      window.scrollTo(0, destY);
      currentY = targetY = destY;
      return;
    }

    if (clickRaf) cancelAnimationFrame(clickRaf);
    ticking = true; // pause the wheel lerp loop while we drive the glide
    // Distance-aware duration so long jumps don't feel sluggish or too fast.
    const duration = Math.min(1100, Math.max(550, Math.abs(diff) * 0.6));
    let startTs;

    const step = (ts) => {
      if (startTs === undefined) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      const y2 = startY + diff * easeInOutCubic(t);
      window.scrollTo(0, y2);
      currentY = targetY = y2; // keep the wheel controller in sync
      if (t < 1) {
        clickRaf = requestAnimationFrame(step);
      } else {
        clickRaf = null;
        ticking = false;
      }
    };
    clickRaf = requestAnimationFrame(step);
  };

  if (smoothEnabled) {
    window.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) return; // allow pinch-zoom
        e.preventDefault();
        const unit =
          e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
        targetY = clampY(targetY + e.deltaY * unit);
        ensureTick();
      },
      { passive: false }
    );

    // Re-sync when the user scrolls by other means (keyboard, scrollbar, touch).
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          currentY = window.scrollY;
          targetY = window.scrollY;
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        targetY = clampY(targetY);
      },
      { passive: true }
    );
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      const y = window.scrollY + target.getBoundingClientRect().top - NAV_OFFSET;
      scrollToY(Math.max(0, y));
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

  // --- Certificate lightbox (view certificate image full-size) ---
  const lightbox = document.getElementById("cert-lightbox");
  const lightboxImg = document.getElementById("cert-lightbox-img");
  const lightboxCap = document.getElementById("cert-lightbox-cap");

  if (lightbox && lightboxImg) {
    let lastFocused = null;

    const openLightbox = (src, title) => {
      lastFocused = document.activeElement;
      lightboxImg.src = src;
      lightboxImg.alt = title || "Certificate";
      if (lightboxCap) lightboxCap.textContent = title || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      const closeBtn = lightbox.querySelector(".lightbox__close");
      if (closeBtn) closeBtn.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      lightboxImg.src = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    document.querySelectorAll("[data-cert-src]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = (btn.getAttribute("data-cert-src") || "").trim();
        if (!src) return;
        openLightbox(src, btn.getAttribute("data-cert-title"));
      });
    });

    lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) =>
      el.addEventListener("click", closeLightbox)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  // --- Report modal (view full report PDF in-page) ---
  const reportModal = document.getElementById("report-lightbox");
  const reportFrame = document.getElementById("report-lightbox-frame");
  const reportCap = document.getElementById("report-lightbox-cap");

  if (reportModal && reportFrame) {
    let reportLastFocused = null;

    const openReport = (src, title) => {
      reportLastFocused = document.activeElement;
      reportFrame.src = src;
      if (reportCap) reportCap.innerHTML = title || "";
      reportModal.classList.add("is-open");
      reportModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      const closeBtn = reportModal.querySelector(".lightbox__close");
      if (closeBtn) closeBtn.focus();
    };

    const closeReport = () => {
      reportModal.classList.remove("is-open");
      reportModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      reportFrame.src = "";
      if (reportLastFocused && typeof reportLastFocused.focus === "function") reportLastFocused.focus();
    };

    document.querySelectorAll("[data-report]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const src = (link.getAttribute("href") || "").trim();
        if (!src) return;
        e.preventDefault();
        openReport(src, link.getAttribute("data-report-title"));
      });
    });

    reportModal.querySelectorAll("[data-report-close]").forEach((el) =>
      el.addEventListener("click", closeReport)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && reportModal.classList.contains("is-open")) closeReport();
    });
  }

  // --- Current year in footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
