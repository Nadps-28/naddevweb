const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");
const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
const scrollTopButton = document.getElementById("scrollTop");
const typingText = document.getElementById("typingText");
const navbar = document.querySelector(".navbar");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const imageModal = document.getElementById("imageModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");

const typingWords = [
  "Website Tour & Travel",
  "Landing Page Paket Wisata",
  "Website Open Trip",
  "Website Rental & Sewa Mobil",
  "Website Travel Umroh & Haji",
  "Sistem Booking Wisata",
  "Website Bisnis & Company Profile",
];

if (mobileToggle && navLinks) {
  const closeMobileNav = () => {
    navLinks.classList.remove("open");
    mobileToggle.classList.remove("is-active");
    mobileNavBackdrop?.classList.remove("is-active");
    document.body.classList.remove("menu-open");
  };

  const openMobileNav = () => {
    navLinks.classList.add("open");
    mobileToggle.classList.add("is-active");
    mobileNavBackdrop?.classList.add("is-active");
    document.body.classList.add("menu-open");
  };

  mobileToggle.addEventListener("click", () => {
    if (navLinks.classList.contains("open")) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Hanya close modal jika link internal (bukan external seperti tombol WA)
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        // Delay sedikit agar smooth scroll berjalan dulu
        setTimeout(() => closeMobileNav(), 100);
      }
    });
  });

  mobileNavBackdrop?.addEventListener("click", closeMobileNav);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMobileNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMobileNav();
    }
  });
}

// Initialize Notiflix Theme Config
if (typeof Notiflix !== "undefined") {
  Notiflix.Notify.init({
    width: "320px",
    position: "right-top",
    distance: "18px",
    borderRadius: "14px",
    fontFamily: "Manrope, sans-serif",
    fontSize: "13.5px",
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: "from-top",
    useIcon: true,
    warning: {
      background: "#ff914d",
      textColor: "#ffffff",
      childClassName: "notiflix-notify-warning",
      notiflixIconColor: "rgba(255,255,255,0.95)",
    },
    failure: {
      background: "#ef4444",
      textColor: "#ffffff",
      childClassName: "notiflix-notify-failure",
      notiflixIconColor: "rgba(255,255,255,0.95)",
    },
    success: {
      background: "#10b981",
      textColor: "#ffffff",
      childClassName: "notiflix-notify-success",
      notiflixIconColor: "rgba(255,255,255,0.95)",
    },
    info: {
      background: "#547792",
      textColor: "#ffffff",
      childClassName: "notiflix-notify-info",
      notiflixIconColor: "rgba(255,255,255,0.95)",
    },
  });

  Notiflix.Confirm.init({
    className: "notiflix-confirm",
    width: "420px",
    zindex: 4003,
    position: "center",
    distance: "12px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    backOverlay: true,
    backOverlayColor: "rgba(20, 33, 43, 0.65)",
    fontFamily: "Manrope, sans-serif",
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: "zoom",
    plainText: false,
    titleColor: "#14212b",
    titleFontSize: "18px",
    titleMaxLength: 60,
    messageColor: "#667785",
    messageFontSize: "14px",
    messageMaxLength: 800,
    buttonsFontSize: "14px",
    buttonsBorderRadius: "12px",
    okButtonColor: "#ffffff",
    okButtonBackground: "#ff914d",
    cancelButtonColor: "#547792",
    cancelButtonBackground: "#edf3f6",
  });

  Notiflix.Loading.init({
    className: "notiflix-loading",
    zindex: 4000,
    backgroundColor: "rgba(20, 33, 43, 0.7)",
    svgColor: "#ff914d",
    titleColor: "#ffffff",
    fontFamily: "Manrope, sans-serif",
    fontSize: "15px",
  });
}

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm && formSuccess) {
  const nameInput = contactForm.querySelector("#contactName");
  const emailInput = contactForm.querySelector("#contactEmail");
  const phoneInput = contactForm.querySelector("#contactPhone");
  const serviceInput = contactForm.querySelector("#contactService");
  const messageInput = contactForm.querySelector("#contactMessage");

  // Remove invalid style on user input or change
  [nameInput, emailInput, phoneInput, serviceInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => input.classList.remove("is-invalid"));
    input.addEventListener("change", () => input.classList.remove("is-invalid"));
  });

  const showFieldError = (element, message) => {
    element.classList.add("is-invalid");
    element.focus();
    if (typeof Notiflix !== "undefined" && Notiflix.Notify) {
      Notiflix.Notify.failure(message);
    } else {
      alert(message);
    }
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const service = serviceInput ? serviceInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    // 1. Validation: Name
    if (!name) {
      showFieldError(nameInput, "Harap isi nama lengkap Anda sebelum mengirim!");
      return;
    }
    if (name.length < 2) {
      showFieldError(nameInput, "Nama terlalu singkat, minimal 2 karakter.");
      return;
    }

    // 2. Validation: Email
    if (!email) {
      showFieldError(emailInput, "Harap masukkan alamat email Anda!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFieldError(emailInput, "Format email tidak valid (contoh: nama@email.com).");
      return;
    }

    // 3. Validation: Phone (if filled, check valid phone format)
    if (phone) {
      const cleanPhone = phone.replace(/[\s\-\+]/g, "");
      if (!/^\d{9,16}$/.test(cleanPhone)) {
        showFieldError(phoneInput, "Format No. WhatsApp tidak valid (minimal 9 digit angka).");
        return;
      }
    }

    // 4. Validation: Service
    if (!service) {
      showFieldError(serviceInput, "Harap pilih paket atau layanan yang Anda minati!");
      return;
    }

    // 5. Validation: Message
    if (!message) {
      showFieldError(messageInput, "Harap tuliskan pesan atau kebutuhan website Anda!");
      return;
    }
    if (message.length < 5) {
      showFieldError(messageInput, "Pesan terlalu singkat. Mohon jelaskan kebutuhan Anda secara ringkas.");
      return;
    }

    // Prepare WhatsApp Message content
    const sendToWhatsApp = () => {
      if (typeof Notiflix !== "undefined" && Notiflix.Loading) {
        Notiflix.Loading.standard("Mengarahkan ke WhatsApp...");
      }

      const waLines = [
        `Halo NadDev, saya ${name}.`,
        `Email: ${email}`,
        phone ? `No. WhatsApp: ${phone}` : null,
        `Layanan: ${service}`,
        `\nPesan:\n${message}`,
      ].filter(Boolean);

      const waText = waLines.join("\n");

      setTimeout(() => {
        if (typeof Notiflix !== "undefined" && Notiflix.Loading) {
          Notiflix.Loading.remove();
        }
        window.open(
          `https://wa.me/6289674044681?text=${encodeURIComponent(waText)}`,
          "_blank",
          "noreferrer"
        );
        if (typeof Notiflix !== "undefined" && Notiflix.Notify) {
          Notiflix.Notify.success("Berhasil! Menghubungkan Anda ke WhatsApp NadDev...");
        }
        contactForm.reset();
        [nameInput, emailInput, phoneInput, serviceInput, messageInput].forEach((i) => {
          if (i) i.classList.remove("is-invalid");
        });
        formSuccess.classList.add("is-visible");
        setTimeout(() => formSuccess.classList.remove("is-visible"), 6000);
      }, 500);
    };

    // Show Notiflix Alert Confirmation Before Sending
    if (typeof Notiflix !== "undefined" && Notiflix.Confirm) {
      Notiflix.Confirm.show(
        "Konfirmasi Kirim Pesan",
        `Halo <strong>${name}</strong>!<br><br>Data formulir Anda sudah lengkap dan tervalidasi.<br><strong>Layanan:</strong> ${service}<br><br>Apakah Anda ingin langsung terhubung ke WhatsApp resmi NadDev untuk konsultasi?`,
        "Ya, Kirim ke WhatsApp",
        "Periksa Kembali",
        () => {
          sendToWhatsApp();
        },
        () => {
          if (typeof Notiflix !== "undefined" && Notiflix.Notify) {
            Notiflix.Notify.info("Pengiriman ditunda. Anda dapat meninjau kembali pesan Anda.");
          }
        },
        { plainText: false }
      );
    } else {
      sendToWhatsApp();
    }
  });
}

const routeSectionMap = {
  "": "hero",
  hero: "hero",
  portfolio: "portfolio",
  pricing: "pricing",
  faq: "faq",
};

const getSectionFromPath = () => {
  const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return routeSectionMap[cleanPath] || null;
};

const getPathFromSection = (sectionId) => {
  if (!sectionId || sectionId === "hero") return "/";
  return `/${sectionId}`;
};

const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const navbarLinks = document.querySelectorAll(
  ".nav-links a[href^=\"#\"], .brand[href^=\"#\"]",
);

navbarLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const rawHref = link.getAttribute("href");
    if (!rawHref) return;
    const sectionId = rawHref.replace("#", "").trim();
    if (!sectionId) return;

    event.preventDefault();
    scrollToSection(sectionId);
    history.pushState({ sectionId }, "", getPathFromSection(sectionId));
  });
});

window.addEventListener("popstate", () => {
  const sectionId = getSectionFromPath();
  if (!sectionId) return;
  scrollToSection(sectionId);
});

const initialSection = getSectionFromPath();
if (initialSection && initialSection !== "hero") {
  window.setTimeout(() => {
    scrollToSection(initialSection);
  }, 80);
}

if (navbar) {
  const toggleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  toggleNavbarScroll();

  window.addEventListener("scroll", toggleNavbarScroll, {
    passive: true,
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".portfolio-hidden");
    hiddenCards.forEach((card) => {
      card.classList.remove("portfolio-hidden");
      card.classList.add("visible");
    });
    loadMoreBtn.style.display = "none";
  });
}

if (imageModal && modalBackdrop && modalClose && modalImage) {
  const openModal = (imageSrc) => {
    modalImage.src = imageSrc;
    modalImage.alt = "Portfolio image detail";
    imageModal.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    imageModal.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => {
      modalImage.src = "";
    }, 300);
  };

  document.querySelectorAll(".portfolio-image").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      openModal(img.src);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imageModal.classList.contains("is-active")) {
      closeModal();
    }
  });
}

if (scrollTopButton) {
  const toggleScrollTopVisibility = () => {
    if (window.scrollY > 280) {
      scrollTopButton.classList.add("is-visible");
    } else {
      scrollTopButton.classList.remove("is-visible");
    }
  };

  toggleScrollTopVisibility();

  window.addEventListener("scroll", toggleScrollTopVisibility, {
    passive: true,
  });
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (typingText) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentWord = typingWords[wordIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    typingText.textContent = currentWord.slice(0, charIndex);

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      delay = 380;
    }

    window.setTimeout(typeLoop, delay);
  };

  typingText.textContent = "";
  window.setTimeout(typeLoop, 500);
}

const pricingToggles = document.querySelectorAll(".pricing-toggle");

pricingToggles.forEach((button) => {
  const pricingCard = button.closest(".pricing-card");
  const pricingList = pricingCard?.querySelector(".pricing-list");
  if (!pricingList) return;

  button.addEventListener("click", () => {
    const isCollapsed = pricingList.classList.contains("is-collapsed");

    if (isCollapsed) {
      pricingList.classList.remove("is-collapsed");
      button.textContent = "Tutup Detail";
    } else {
      pricingList.classList.add("is-collapsed");
      button.textContent = "Lihat Detail";
    }
  });
});

const faqItems = document.querySelectorAll(".faq-item");

const closeFaqItem = (item) => {
  const content = item.querySelector("p");
  if (!content || !item.open) return;

  item.dataset.animating = "true";
  if (content.style.maxHeight === "none" || !content.style.maxHeight) {
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
  content.offsetHeight;
  content.style.maxHeight = "0px";

  const onCloseEnd = (event) => {
    if (event.propertyName !== "max-height") return;
    item.open = false;
    item.classList.remove("is-open");
    item.dataset.animating = "false";
  };

  content.addEventListener("transitionend", onCloseEnd, { once: true });
};

const openFaqItem = (item) => {
  const content = item.querySelector("p");
  if (!content) return;

  item.dataset.animating = "true";
  item.open = true;
  item.classList.add("is-open");
  content.style.maxHeight = "0px";

  requestAnimationFrame(() => {
    content.style.maxHeight = `${content.scrollHeight}px`;
  });

  const onOpenEnd = (event) => {
    if (event.propertyName !== "max-height") return;
    content.style.maxHeight = "none";
    item.dataset.animating = "false";
  };

  content.addEventListener("transitionend", onOpenEnd, { once: true });
};

faqItems.forEach((item) => {
  const summary = item.querySelector("summary");
  const content = item.querySelector("p");
  if (!summary || !content) return;

  item.dataset.animating = "false";
  if (item.open) {
    item.classList.add("is-open");
    content.style.maxHeight = "none";
  } else {
    item.classList.remove("is-open");
    content.style.maxHeight = "0px";
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    if (item.dataset.animating === "true") return;

    if (item.open) {
      closeFaqItem(item);
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) closeFaqItem(otherItem);
    });

    setTimeout(() => {
      openFaqItem(item);
    }, 90);
  });
});

window.addEventListener("resize", () => {
  faqItems.forEach((item) => {
    if (!item.open) return;
    const content = item.querySelector("p");
    if (!content) return;
    content.style.maxHeight = "none";
  });
});

// ==========================================
// REAL-TIME VISITOR COUNTER (LIVE GLOBAL)
// ==========================================
(function initVisitorCounter() {
  const hitTotalEl = document.getElementById("hitCountTotal");
  const hitTodayEl = document.getElementById("hitCountToday");
  if (!hitTotalEl || !hitTodayEl) return;

  const getTodayDateStr = () => {
    const now = new Date();
    return `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
  };

  const todayStr = getTodayDateStr();
  const KEY_TOTAL = "naddev_official_real_views";
  const KEY_TODAY = `naddev_official_real_views_${todayStr}`;
  const API_BASE = "https://countapi.mileshilliard.com/api/v1";

  // Baca cache lokal sementara jika ada, default murni 0
  const cachedTotal = parseInt(localStorage.getItem("naddev_cache_total"), 10) || 0;
  const cachedToday = parseInt(localStorage.getItem("naddev_cache_today"), 10) || 0;
  const cachedDate = localStorage.getItem("naddev_cache_date");

  hitTotalEl.textContent = cachedTotal.toLocaleString("id-ID");
  hitTodayEl.textContent = (cachedDate === todayStr ? cachedToday : 0).toLocaleString("id-ID");

  // Animasi count-up angka halus
  const animateCount = (el, target, duration = 800) => {
    const current = parseInt(el.textContent.replace(/\./g, ""), 10) || 0;
    if (current === target) {
      el.textContent = target.toLocaleString("id-ID");
      return;
    }
    const start = current;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(start + (target - start) * ease);
      el.textContent = val.toLocaleString("id-ID");

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toLocaleString("id-ID");
      }
    };

    requestAnimationFrame(frame);
  };

  // Hit ke server API riil
  const trackVisit = async () => {
    try {
      const [resTotal, resToday] = await Promise.all([
        fetch(`${API_BASE}/hit/${KEY_TOTAL}`),
        fetch(`${API_BASE}/hit/${KEY_TODAY}`)
      ]);

      if (resTotal.ok) {
        const dataTotal = await resTotal.json();
        if (dataTotal && typeof dataTotal.value === "number") {
          animateCount(hitTotalEl, dataTotal.value);
          localStorage.setItem("naddev_cache_total", dataTotal.value.toString());
        }
      }

      if (resToday.ok) {
        const dataToday = await resToday.json();
        if (dataToday && typeof dataToday.value === "number") {
          animateCount(hitTodayEl, dataToday.value);
          localStorage.setItem("naddev_cache_today", dataToday.value.toString());
          localStorage.setItem("naddev_cache_date", todayStr);
        }
      }
    } catch (err) {
      console.warn("Counter API offline:", err);
    }
  };

  trackVisit();
})();
