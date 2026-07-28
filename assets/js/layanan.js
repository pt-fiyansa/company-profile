/* ==========================================================================
   layanan.js — perilaku khusus halaman Layanan
   (Kalau assets/js/main.js sudah menangani navbar shadow / reveal / back-to-top
   secara global, boleh hapus bagian yang duplikat di bawah ini.)
   ========================================================================== */
(function () {
  "use strict";

  var navbar = document.getElementById("mainNav");
  var backToTop = document.querySelector(".back-to-top");
  var yearEl = document.getElementById("currentYear");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar shadow saat halaman di-scroll ---------- */
  function onScroll() {
    var scrolled = window.scrollY > 12;
    if (navbar) navbar.classList.toggle("is-scrolled", scrolled);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Reveal-on-scroll (fail-safe) ----------
     class "js-ready" baru ditambahkan di sini, SETELAH kita tahu JS ini
     benar-benar jalan. Selama class ini belum ada, CSS di layanan.css
     membuat semua .reveal tetap opacity:1 (terlihat normal, tanpa animasi).
     Ini mencegah section jadi blank kalau file JS ini gagal ke-load. */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    document.documentElement.classList.add("js-ready");
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Highlight submenu Layanan sesuai section aktif ---------- */
  var sectionIds = ["layanan-cleaning", "layanan-sales", "layanan-fo", "layanan-driver", "layanan-obg"];
  var sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);
  var dropdownItems = document.querySelectorAll(".nav-item-layanan .dropdown-item, #layananDropdown ~ .dropdown-menu .dropdown-item");

  function setActiveDropdownItem(sectionId) {
    dropdownItems.forEach(function (item) {
      var targetId = (item.getAttribute("href") || "").replace("#", "");
      item.classList.toggle("is-active", targetId === sectionId);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveDropdownItem(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  }

  /* ---------- Smooth-scroll fallback untuk browser tanpa scroll-behavior ---------- */
  document.querySelectorAll('a[href^="#layanan-"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href").slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      var offset = 90; // kira-kira tinggi navbar fixed
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
