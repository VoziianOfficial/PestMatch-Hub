document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // ICONS REFRESH
    // =========================
    const refreshIcons = () => {
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    refreshIcons();

    // =========================
    // HERO INTRO
    // =========================
    if (window.gsap) {
        const heroEyebrow = document.querySelector(".about-hero__copy .section-eyebrow");
        const heroTitle = document.querySelector(".about-hero__copy h1");
        const heroText = document.querySelector(".about-hero__copy p");
        const heroActions = document.querySelector(".about-hero__actions");
        const heroPanel = document.querySelector(".about-hero__panel");

        if (heroEyebrow) {
            gsap.fromTo(
                heroEyebrow,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
            );
        }

        if (heroTitle) {
            gsap.fromTo(
                heroTitle,
                { opacity: 0, y: 34 },
                { opacity: 1, y: 0, duration: 0.95, delay: 0.08, ease: "power3.out" }
            );
        }

        if (heroText) {
            gsap.fromTo(
                heroText,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.9, delay: 0.18, ease: "power3.out" }
            );
        }

        if (heroActions?.children.length) {
            gsap.fromTo(
                heroActions.children,
                { opacity: 0, y: 22 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.28,
                    stagger: 0.08,
                    ease: "power3.out",
                }
            );
        }

        if (heroPanel) {
            gsap.fromTo(
                heroPanel,
                { opacity: 0, y: 48, scale: 0.985 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    delay: 0.14,
                    ease: "power3.out",
                }
            );
        }
    }

    // =========================
    // HERO PARALLAX
    // =========================
    if (window.gsap && window.ScrollTrigger) {
        const heroImage = document.querySelector(".about-hero__media img");

        if (heroImage) {
            gsap.to(heroImage, {
                yPercent: 10,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                    trigger: ".about-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    }

    // =========================
    // SECTION REVEALS
    // =========================
    if (window.gsap && window.ScrollTrigger) {
        const revealGroups = [
            {
                trigger: ".about-story__grid",
                items: ".about-story__copy, .about-story-card",
            },
            {
                trigger: ".about-model__grid",
                items: ".about-model-card",
            },
            {
                trigger: ".about-process__grid",
                items: ".about-process-card",
            },
            {
                trigger: ".about-values__grid",
                items: ".about-values__copy, .about-value-item",
            },
            {
                trigger: ".about-cta__inner",
                items: ".about-cta__inner",
            },
        ];

        revealGroups.forEach((group) => {
            const items = document.querySelectorAll(group.items);

            if (items.length) {
                gsap.from(items, {
                    opacity: 0,
                    y: 34,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: group.trigger,
                        start: "top 85%",
                    },
                });
            }
        });
    }

    // =========================
    // MAGNETIC BUTTONS
    // =========================
    if (window.gsap) {
        const magneticButtons = document.querySelectorAll(".btn");

        magneticButtons.forEach((button) => {
            button.addEventListener("mousemove", (event) => {
                const rect = button.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                gsap.to(button, {
                    x: x * 0.12,
                    y: y * 0.16,
                    duration: 0.24,
                    ease: "power2.out",
                });
            });

            button.addEventListener("mouseleave", () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.35,
                    ease: "power3.out",
                });
            });
        });
    }

    refreshIcons();
});