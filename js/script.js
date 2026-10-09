(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const backToTop = document.getElementById("back-to-top");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const closeMenu = () => {
    navToggle.classList.remove("open");
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Header state + back-to-top visibility
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
    backToTop.classList.toggle("show", window.scrollY > 480);
    setActiveNav();
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // Active nav highlighting (based on scroll position, so unlinked sections
  // like Education/Certifications don't break the highlight order)
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveNav = () => {
    const offset = window.scrollY + header.offsetHeight + 120;
    let current = navSections[0];

    for (const section of navSections) {
      if (section.offsetTop <= offset) current = section;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
    });
  };

  // Scroll-triggered reveals
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // Project category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

      projectCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });

  // Back to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  // Contact form (front-end demo — no message is sent without a backend)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setStatus = (message, type) => {
    status.textContent = message;
    status.className = `form-status ${type}`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      setStatus("Please fill in all fields before submitting.", "error");
      return;
    }

    if (!emailPattern.test(email)) {
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    if (message.length < 10) {
      setStatus("Please write a slightly longer message (at least 10 characters).", "error");
      return;
    }

    setStatus(
      "Thanks for reaching out! This form is a front-end demo — please email sara19feleke@gmail.com directly for now.",
      "success"
    );
    form.reset();
  });

  // Initial state
  onScroll();
})();
