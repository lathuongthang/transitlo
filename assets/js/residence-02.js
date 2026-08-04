(() => {
  "use strict";

  const revealItems = [...document.querySelectorAll(".reveal")];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const figures = [...document.querySelectorAll("[data-lightbox]")];
  const lightbox = document.querySelector(".lightbox");
  const largeImage = lightbox?.querySelector("img");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const previousButton = lightbox?.querySelector(".lightbox-prev");
  const nextButton = lightbox?.querySelector(".lightbox-next");
  const counter = lightbox?.querySelector(".lightbox-count");

  if (!lightbox || !largeImage || !closeButton || !previousButton || !nextButton || !counter) return;

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + figures.length) % figures.length;
    const figure = figures[currentIndex];
    const image = figure.querySelector("img");
    const source = figure.dataset.lightbox || image?.currentSrc || image?.src;
    if (!source) return;

    largeImage.src = source;
    largeImage.alt = image?.alt || "";
    counter.textContent = `${currentIndex + 1} / ${figures.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    largeImage.removeAttribute("src");
  }

  figures.forEach((figure, index) => {
    figure.tabIndex = 0;
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "打开项目大图");
    figure.addEventListener("click", () => openLightbox(index));
    figure.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentIndex - 1);
  });
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });
})();
