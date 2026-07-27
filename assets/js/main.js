/*
 * PT. Fiyansa Mulya — Company Profile
 * Lightweight vanilla-JS behaviours (no framework dependency, kept small on purpose for fast Ads landing performance).
 */
(function () {
  "use strict";

  var navbar = document.querySelector(".navbar-fm");
  var backToTop = document.querySelector(".back-to-top");
  var navCollapseEl = document.getElementById("mainNavbar");

  /* Shrink / shadow navbar after scrolling past hero top */
  function onScroll() {
    var scrolled = window.scrollY > 24;
    if (navbar) navbar.classList.toggle("is-scrolled", scrolled);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Auto-close mobile menu after a nav link is tapped */
  if (navCollapseEl) {
    var bsCollapse = window.bootstrap ? new bootstrap.Collapse(navCollapseEl, { toggle: false }) : null;
    navCollapseEl.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        if (bsCollapse && navCollapseEl.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* Back-to-top click */
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Reveal-on-scroll for sections/cards marked with .reveal */
  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Current year in footer */
  var yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
