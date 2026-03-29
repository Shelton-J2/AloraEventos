/* ===========================
   ALORA EVENTOS — script.js
=========================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    // -------------------------
    // NAVBAR: scroll effect + hamburger
    // -------------------------
    var navbar = document.querySelector(".navbar");
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");

    if (navbar) {
      window.addEventListener("scroll", function () {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      });
    }

    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
      });
      // close on link click
      navLinks.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          navToggle.classList.remove("open");
          navLinks.classList.remove("open");
        });
      });
    }

    // -------------------------
    // HERO: loaded class for pan effect
    // -------------------------
    var hero = document.querySelector(".hero");
    if (hero) {
      setTimeout(function () { hero.classList.add("loaded"); }, 100);
    }

    // -------------------------
    // INTERSECTION OBSERVER: fade-in
    // -------------------------
    var fadeEls = document.querySelectorAll(".fade-in, .gallery-item");
    if (fadeEls.length && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      fadeEls.forEach(function (el) { observer.observe(el); });
    } else {
      fadeEls.forEach(function (el) { el.classList.add("visible"); });
    }

    // -------------------------
    // COUNTERS (homepage)
    // -------------------------
    var counters = document.querySelectorAll(".stat-number");
    if (counters.length && "IntersectionObserver" in window) {
      var counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { counterObs.observe(c); });
    }

    function animateCounter(el) {
      var target = parseInt(el.getAttribute("data-target"), 10);
      if (isNaN(target)) return;
      var current = 0;
      var duration = 1600;
      var frames = Math.max(1, Math.floor(duration / 16));
      var step = Math.max(1, Math.ceil(target / frames));
      var timer = setInterval(function () {
        current = Math.min(current + step, target);
        el.textContent = "+" + current;
        if (current >= target) clearInterval(timer);
      }, 16);
    }

    // -------------------------
    // LIGHTBOX (gallery page)
    // -------------------------
    var lightbox = document.getElementById("lightbox");
    var galleryImgs = document.querySelectorAll(".gallery-item img");

    if (lightbox && galleryImgs.length) {
      var lightboxImg = document.getElementById("lightbox-img");
      var btnClose = lightbox.querySelector(".lb-close");
      var btnPrev  = lightbox.querySelector(".lb-prev");
      var btnNext  = lightbox.querySelector(".lb-next");
      var imgs     = Array.prototype.slice.call(galleryImgs);
      var current  = 0;

      function open(idx) {
        current = idx;
        lightboxImg.src = imgs[current].src;
        lightbox.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
      function close() {
        lightbox.classList.add("hidden");
        document.body.style.overflow = "";
      }
      function prev() { current = (current - 1 + imgs.length) % imgs.length; lightboxImg.src = imgs[current].src; }
      function next() { current = (current + 1) % imgs.length; lightboxImg.src = imgs[current].src; }

      imgs.forEach(function (img, i) {
        img.addEventListener("click", function () { open(i); });
      });

      if (btnClose) btnClose.addEventListener("click", close);
      if (btnPrev)  btnPrev.addEventListener("click", prev);
      if (btnNext)  btnNext.addEventListener("click", next);
      lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
      document.addEventListener("keydown", function (e) {
        if (lightbox.classList.contains("hidden")) return;
        if (e.key === "Escape")      close();
        if (e.key === "ArrowLeft")   prev();
        if (e.key === "ArrowRight")  next();
      });
    }

  }); // DOMContentLoaded

})();
