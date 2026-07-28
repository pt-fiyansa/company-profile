/* ==========================================================================
   kontak.js — perilaku khusus halaman Kontak
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
     Sama seperti layanan.js: .reveal defaultnya SELALU terlihat (lihat
     assets/css/style.css / kontak.css), animasi hanya aktif kalau class
     "js-ready" berhasil ditambahkan di sini. */
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

  /* ---------- Form Kontak ----------
     Belum ada backend, jadi sementara form ini membuka email client
     (mailto:) berisi data yang diisi. Begitu ada endpoint backend,
     ganti bagian "TODO: kirim ke backend" di bawah dengan fetch()/API call,
     dan hapus fallback mailto-nya. */
  var form = document.getElementById("kontakForm");
  var formNote = document.getElementById("formNote");

  function showNote(message, isError) {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.style.display = "block";
    formNote.style.color = isError ? "#b91c1c" : "var(--green-700)";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = {
        nama: form.nama.value.trim(),
        perusahaan: form.perusahaan.value.trim(),
        email: form.email.value.trim(),
        telepon: form.telepon.value.trim(),
        layanan: form.layanan.value,
        pesan: form.pesan.value.trim(),
      };

      // TODO: kirim ke backend, contoh:
      // fetch("/api/kontak", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) })

      var subject = "Permintaan Penawaran — " + data.nama;
      var bodyLines = ["Nama: " + data.nama, "Perusahaan: " + (data.perusahaan || "-"), "Email: " + data.email, "Telepon: " + data.telepon, "Layanan: " + data.layanan, "", "Pesan:", data.pesan];
      var mailto = "mailto:info@fiyansamulya.co.id" + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
      showNote("Membuka aplikasi email Anda untuk mengirim pesan…", false);
    });
  }
})();
