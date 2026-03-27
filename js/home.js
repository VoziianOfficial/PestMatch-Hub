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

    // =========================
    // HERO CLIENTS COUNTER
    // =========================
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroClients = document.querySelector(".hero-clients");

    const parseCounterPattern = (rawValue) => {
        const value = (rawValue || "").trim().replace(/\s+/g, " ");

        const ratioMatch = value.match(/^([\d.,]+)\s*\/\s*([\d.,]+)$/);
        if (ratioMatch) {
            const target = Number.parseFloat(ratioMatch[1].replace(",", "."));
            return Number.isFinite(target)
                ? { target, prefix: "", suffix: ` / ${ratioMatch[2]}`, decimals: target % 1 !== 0 ? 1 : 0 }
                : null;
        }

        const genericMatch = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
        if (!genericMatch) return null;

        const target = Number.parseFloat(genericMatch[2].replace(/,/g, ""));
        if (!Number.isFinite(target)) return null;

        const hasDecimal = genericMatch[2].includes(".");
        return {
            target,
            prefix: genericMatch[1] || "",
            suffix: genericMatch[3] || "",
            decimals: hasDecimal ? 1 : 0,
        };
    };

    const formatCounterValue = (value, decimals) => {
        if (decimals > 0) {
            return value.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            });
        }

        return Math.round(value).toLocaleString("en-US");
    };

    const animateCounter = (element) => {
        const pattern = parseCounterPattern(element.textContent);
        if (!pattern) return;

        const { target, prefix, suffix, decimals } = pattern;
        const duration = 1400;
        const start = performance.now();

        const frame = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress) * (1 - progress);
            const current = target * eased;

            element.textContent = `${prefix}${formatCounterValue(current, decimals)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                element.textContent = `${prefix}${formatCounterValue(target, decimals)}${suffix}`;
            }
        };

        requestAnimationFrame(frame);
    };

    const runHeroCounters = () => {
        const counters = heroClients?.querySelectorAll("strong");
        counters?.forEach((counter) => animateCounter(counter));
    };

    if (heroClients) {
        if (prefersReducedMotion) {
            runHeroCounters();
        } else if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            runHeroCounters();
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.35 }
            );

            observer.observe(heroClients);
        } else {
            runHeroCounters();
        }
    }
});
