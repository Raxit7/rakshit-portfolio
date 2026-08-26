/*=========================================
        PAGE LOADER
=========================================*/

let percent = 0;

const loading = document.getElementById("loading-number");

const progress = document.querySelector(".loader-progress");

const loader = document.getElementById("loader");

const interval = setInterval(() => {
  percent++;

  loading.innerHTML = percent;

  progress.style.width = percent + "%";

  if (percent >= 100) {
    clearInterval(interval);

    setTimeout(() => {
      loader.style.opacity = "0";

      loader.style.visibility = "hidden";

      loader.style.transition = ".8s";
    }, 400);
  }
}, 15);
/*=========================================
        NAVBAR
=========================================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

const menuBtn = document.querySelector(".menu-btn");

const navMenu = document.querySelector(".nav-menu");

menuBtn.onclick = () => {
  navMenu.classList.toggle("active");
};
/* =====================================================
   VIDEO PLAY ONLY ON BUTTON CLICK
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const videoCards = document.querySelectorAll(".video-showcase");

  videoCards.forEach(function (card) {
    const video = card.querySelector("video");
    const button = card.querySelector(".video-play-btn");
    const icon = button?.querySelector("i");

    if (!video || !button) return;

    /* =========================================
           FORCE PAUSED ON EVERY PAGE LOAD
        ========================================= */

    video.pause();
    video.currentTime = 0;
    video.muted = false;

    card.classList.remove("is-playing");

    if (icon) {
      icon.className = "ri-play-fill";
    }

    /* =========================================
           PLAY / PAUSE BUTTON
        ========================================= */

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (video.paused) {
        video.muted = false;
        video.volume = 1;

        video
          .play()
          .then(function () {
            card.classList.add("is-playing");

            if (icon) {
              icon.className = "ri-pause-fill";
            }
          })
          .catch(function (error) {
            console.error("Video playback failed:", error);
          });
      } else {
        video.pause();

        card.classList.remove("is-playing");

        if (icon) {
          icon.className = "ri-play-fill";
        }
      }
    });

    /* =========================================
           WHEN VIDEO PLAYS
        ========================================= */

    video.addEventListener("play", function () {
      card.classList.add("is-playing");

      if (icon) {
        icon.className = "ri-pause-fill";
      }
    });

    /* =========================================
           WHEN VIDEO PAUSES
        ========================================= */

    video.addEventListener("pause", function () {
      card.classList.remove("is-playing");

      if (icon) {
        icon.className = "ri-play-fill";
      }
    });

    /* =========================================
           WHEN VIDEO ENDS
        ========================================= */

    video.addEventListener("ended", function () {
      card.classList.remove("is-playing");

      video.currentTime = 0;

      if (icon) {
        icon.className = "ri-play-fill";
      }
    });
  });
});
/* =====================================================
   VIDEO SHOWCASE CAROUSEL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".video-showcase-track");

  const windowEl = document.querySelector(".video-showcase-window");

  const prev = document.querySelector(".video-showcase-prev");

  const next = document.querySelector(".video-showcase-next");

  if (!track || !windowEl || !prev || !next) return;

  const cards = track.querySelectorAll(".video-showcase-card");

  let index = 0;

  function getStep() {
    const card = cards[0];

    if (!card) return 0;

    const style = window.getComputedStyle(track);

    const gap = parseFloat(style.gap) || 0;

    return card.offsetWidth + gap;
  }

  function getVisibleCards() {
    const step = getStep();

    if (!step) return 1;

    return Math.max(1, Math.floor(windowEl.clientWidth / step));
  }

  function updateCarousel() {
    const step = getStep();

    const visible = getVisibleCards();

    const maxIndex = Math.max(0, cards.length - visible);

    index = Math.max(0, Math.min(index, maxIndex));

    track.style.transform = `translateX(-${index * step}px)`;

    prev.disabled = index <= 0;

    next.disabled = index >= maxIndex;
  }

  next.addEventListener("click", function () {
    index++;

    updateCarousel();
  });

  prev.addEventListener("click", function () {
    index--;

    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();

  /* =========================================
       PLAY / PAUSE
    ========================================= */

  cards.forEach(function (card) {
    const video = card.querySelector("video");

    const button = card.querySelector(".video-showcase-play");

    const icon = button?.querySelector("i");

    if (!video || !button) return;

    video.pause();

    video.currentTime = 0;

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (video.paused) {
        video
          .play()
          .then(function () {
            icon.className = "ri-pause-fill";
          })
          .catch(function (error) {
            console.error("Video error:", error);
          });
      } else {
        video.pause();

        icon.className = "ri-play-fill";
      }
    });

    video.addEventListener("pause", function () {
      icon.className = "ri-play-fill";
    });

    video.addEventListener("ended", function () {
      video.currentTime = 0;

      icon.className = "ri-play-fill";
    });
  });
});

/* =====================================================
   GRAPHICS LIGHTBOX
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("graphicsLightbox");

  const lightboxImage = document.getElementById("graphicsLightboxImage");

  const closeButton = document.querySelector(".graphics-lightbox-close");

  const viewButtons = document.querySelectorAll(".graphic-view-btn");

  if (!lightbox || !lightboxImage) return;

  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const image = button.dataset.image;

      if (!image) return;

      lightboxImage.src = image;

      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(function () {
      lightboxImage.src = "";
    }, 300);
  }

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});
/* =====================================================
   FOOTER YEAR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("footer-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
/* =====================================================
   PORTFOLIO FINAL UI JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
       SMOOTH SCROLL
    ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      const header = document.querySelector("header");

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

  const header = document.querySelector("header");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  };

  window.addEventListener("scroll", updateHeader, { passive: true });

  updateHeader();

  /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

  const sections = document.querySelectorAll("section[id]");

  const navLinks = document.querySelectorAll('header a[href^="#"]');

  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;

      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  updateActiveNav();

  /* =========================================
       SCROLL REVEAL
    ========================================= */

  const revealElements = document.querySelectorAll(
    ".services-item, " +
      ".pricing-card, " +
      ".contact-form-wrapper, " +
      ".contact-content, " +
      ".footer-main > *, " +
      ".footer-cta",
  );

  revealElements.forEach((element) => {
    element.classList.add("scroll-reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =========================================
       BACK TO TOP
    ========================================= */

  const backToTop = document.querySelector('[href="#home"]');

  window.addEventListener(
    "scroll",
    () => {
      if (!backToTop) return;

      if (window.scrollY > 700) {
        backToTop.classList.add("back-to-top-visible");
      } else {
        backToTop.classList.remove("back-to-top-visible");
      }
    },
    { passive: true },
  );

  /* =========================================
       EXTERNAL LINKS
    ========================================= */

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* =========================================
       CONTACT FORM FEEDBACK
    ========================================= */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      /*
       * Remove this preventDefault()
       * when PHP backend is connected.
       */

      e.preventDefault();

      const button = contactForm.querySelector(".contact-submit");

      if (!button) return;

      const originalHTML = button.innerHTML;

      button.innerHTML = `
                    <i class="ri-check-line"></i>
                    Enquiry Ready
                    `;

      button.classList.add("form-success");

      setTimeout(() => {
        button.innerHTML = originalHTML;

        button.classList.remove("form-success");
      }, 3000);
    });
  }

  /* =========================================
       DISABLE IMAGE DRAG
    ========================================= */

  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
  });

  /* =========================================
       ESC KEY
    ========================================= */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.body.classList.remove("menu-open");
    }
  });
});
/* =========================================
   GRAPHIC DESIGN CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const preview = document.querySelector(".graphic-services-preview");

  if (!preview) return;

  const track = preview.querySelector(".graphic-carousel-track");

  const slides = Array.from(preview.querySelectorAll(".graphic-slide"));

  const next = preview.querySelector(".graphic-next");

  let currentIndex = 0;

  function getStep() {
    if (!slides.length) return 0;

    const width = slides[0].getBoundingClientRect().width;

    return width + 14;
  }

  function getVisible() {
    const window = preview.querySelector(".graphic-carousel-window");

    if (!window || !slides.length) return 1;

    return Math.max(
      1,
      Math.floor(window.clientWidth / slides[0].getBoundingClientRect().width),
    );
  }

  function updateCarousel() {
    const visible = getVisible();

    const maxIndex = Math.max(0, slides.length - visible);

    currentIndex = Math.min(currentIndex, maxIndex);

    track.style.transform = `translateX(-${currentIndex * getStep()}px)`;

    next.disabled = currentIndex >= maxIndex;
  }

  next.addEventListener("click", () => {
    const visible = getVisible();

    const maxIndex = Math.max(0, slides.length - visible);

    if (currentIndex < maxIndex) {
      currentIndex++;

      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});
