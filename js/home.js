document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // SAFE MODE FOR SERVICES PAGE
    // Без reveal-анимаций, чтобы ничего не исчезало
    // =========================

    // SPLIT TEXT intentionally disabled
    // HERO GSAP reveals intentionally disabled
    // SCROLLTRIGGER reveals intentionally disabled
    // MAGNETIC BUTTONS intentionally disabled

    // =========================
    // SIMPLE HOVER FOR SERVICE INDEX
    // =========================
    const serviceCards = document.querySelectorAll(".service-index-card");

    serviceCards.forEach((card) => {
        const image = card.querySelector("img");

        card.addEventListener("mouseenter", () => {
            if (image) {
                image.style.transform = "scale(1.06)";
            }
        });

        card.addEventListener("mouseleave", () => {
            if (image) {
                image.style.transform = "scale(1)";
            }
        });
    });

    // =========================
    // FORCE VISIBILITY FOR SAFETY
    // =========================
    const forcedVisible = document.querySelectorAll(
        "[data-aos], .services-hero-lux__copy, .services-hero-lux__aside, .services-stat-card, .service-index-card, .editorial-card, .services-review-card, .services-flow-card, .services-cta-lux__inner"
    );

    forcedVisible.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
        item.style.visibility = "visible";
    });
});