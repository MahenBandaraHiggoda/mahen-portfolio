const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const floatingRobot = document.querySelector(".floating-robot");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

floatingRobot?.addEventListener("error", () => {
  floatingRobot.hidden = true;
});

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (motionAllowed) {
  const canTrackPointer = window.matchMedia("(pointer: fine)").matches;

  if (canTrackPointer) {
    const cursorGlow = document.createElement("span");
    cursorGlow.className = "cursor-glow";
    cursorGlow.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursorGlow);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    const moveCursorGlow = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      cursorGlow.style.transform = `translate3d(${currentX - 130}px, ${currentY - 130}px, 0)`;
      window.requestAnimationFrame(moveCursorGlow);
    };

    moveCursorGlow();
  }

  const revealTargets = document.querySelectorAll(
    ".page-content > .eyebrow, .page-content > h1, .page-content > .intro, .info-panel, .service-card, .project-card, .contact-form, .skill-group, .skill-meter, .project-preview, .feature-list li"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal-item");
    target.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
    revealObserver.observe(target);
  });

}

const contactForm = document.querySelector(".contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name") || "Website visitor";
  const email = formData.get("email") || "No email provided";
  const message = formData.get("message") || "No message provided";
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:mhiggoda@gmail.com?subject=${subject}&body=${body}`;
});

const galleries = {
  inventory: [
    { src: "images/1.png", alt: "Inventory Management System Product Add screen" },
    { src: "images/2.png", alt: "Inventory Management System Product Update screen" },
    { src: "images/3.png", alt: "Inventory Management System Product Remove screen" },
    { src: "images/4.png", alt: "Inventory Management System Product Search screen" },
    { src: "images/5.png", alt: "Inventory Management System Low Stock screen" },
  ],
  farm2market: [
    { src: "images/farm2market.png", alt: "Farm2Market app screenshot 1" },
    { src: "images/farm2market2.png", alt: "Farm2Market app screenshot 2" },
    { src: "images/farm2market3.png", alt: "Farm2Market app screenshot 3" },
    { src: "images/farm2market4.png", alt: "Farm2Market app screenshot 4" },
    { src: "images/farm2market5.png", alt: "Farm2Market app screenshot 5" },
  ],
};

const galleryTriggers = document.querySelectorAll(".gallery-card");
const videoTriggers = document.querySelectorAll(".video-card");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxVideo = document.querySelector(".lightbox-video");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
let activeGallery = galleries.farm2market;
let activeGalleryTrigger = null;
let currentGalleryIndex = 0;

const updateGalleryImage = () => {
  if (!lightboxImage) return;

  const image = activeGallery[currentGalleryIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
};

const resetLightboxVideo = () => {
  if (!lightboxVideo) return;

  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
};

const openGallery = (trigger) => {
  if (!lightbox) return;

  resetLightboxVideo();
  lightbox.classList.remove("video-mode");
  activeGallery = galleries[trigger.dataset.gallery] || galleries.farm2market;
  activeGalleryTrigger = trigger;
  currentGalleryIndex = 0;
  updateGalleryImage();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lightboxClose?.focus();
};

const openVideo = (trigger) => {
  if (!lightbox || !lightboxVideo) return;

  activeGalleryTrigger = trigger;
  lightboxVideo.src = trigger.dataset.video;
  lightboxVideo.load();
  lightbox.classList.add("open", "video-mode");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lightboxClose?.focus();
};

const closeGallery = () => {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.classList.remove("video-mode");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  resetLightboxVideo();
  activeGalleryTrigger?.focus();
};

const showGalleryImage = (direction) => {
  currentGalleryIndex = (currentGalleryIndex + direction + activeGallery.length) % activeGallery.length;
  updateGalleryImage();
};

galleryTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openGallery(trigger));

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(trigger);
    }
  });
});

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openVideo(trigger));

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openVideo(trigger);
    }
  });
});

lightboxClose?.addEventListener("click", closeGallery);
lightboxPrev?.addEventListener("click", () => showGalleryImage(-1));
lightboxNext?.addEventListener("click", () => showGalleryImage(1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeGallery();
  }

  if (lightbox.classList.contains("video-mode")) return;

  if (event.key === "ArrowLeft") {
    showGalleryImage(-1);
  }

  if (event.key === "ArrowRight") {
    showGalleryImage(1);
  }
});
