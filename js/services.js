document.addEventListener("DOMContentLoaded", () => {



    if (window.SplitType && window.gsap && window.ScrollTrigger) {
        const splitTargets = document.querySelectorAll(
            ".services-hero-lux__title, .section-heading h2, .services-cta-lux__copy h2"
        );

        splitTargets.forEach((heading) => {
            const split = new SplitType(heading, {
                types: "words",
            });

            gsap.from(split.words, {
                yPercent: 110,
                opacity: 0,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.035,
                scrollTrigger: {
                    trigger: heading,
                    start: "top 88%",
                },
            });
        });
    }



    if (window.gsap) {
        const heroEyebrow = document.querySelector(".services-hero-lux__copy .section-eyebrow");
        const heroText = document.querySelector(".services-hero-lux__copy p");
        const heroActions = document.querySelector(".services-hero-lux__actions");
        const heroCard = document.querySelector(".services-insight-card");
        const heroStats = document.querySelectorAll(".services-insight-stat");

        if (heroEyebrow) {
            gsap.fromTo(
                heroEyebrow,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
            );
        }

        if (heroText) {
            gsap.fromTo(
                heroText,
                { opacity: 0, y: 36 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.18,
                    ease: "power3.out",
                }
            );
        }

        if (heroActions) {
            gsap.fromTo(
                heroActions.children,
                { opacity: 0, y: 26 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    delay: 0.3,
                    stagger: 0.08,
                    ease: "power3.out",
                }
            );
        }

        if (heroCard) {
            gsap.fromTo(
                heroCard,
                { opacity: 0, y: 54, scale: 0.985 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.05,
                    delay: 0.14,
                    ease: "power3.out",
                }
            );
        }

        if (heroStats.length) {
            gsap.fromTo(
                heroStats,
                { opacity: 0, y: 20, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.32,
                    stagger: 0.07,
                    ease: "power3.out",
                }
            );
        }
    }



    if (window.gsap && window.ScrollTrigger) {
        const heroImage = document.querySelector(".services-hero-lux__media img");

        if (heroImage) {
            gsap.to(heroImage, {
                yPercent: 10,
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".services-hero-lux",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    }



    if (window.gsap) {
        const serviceCards = document.querySelectorAll(".service-index-card");

        serviceCards.forEach((card) => {
            const image = card.querySelector("img");
            const overlay = card.querySelector(".service-index-card__overlay");
            const icon = card.querySelector(".service-index-card__icon");

            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.35,
                    ease: "power2.out",
                });

                if (image) {
                    gsap.to(image, {
                        scale: 1.08,
                        duration: 0.7,
                        ease: "power3.out",
                    });
                }

                if (overlay) {
                    gsap.to(overlay, {
                        y: -4,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                }

                if (icon) {
                    gsap.to(icon, {
                        rotate: 6,
                        scale: 1.05,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                }
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.35,
                    ease: "power2.out",
                });

                if (image) {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.7,
                        ease: "power3.out",
                    });
                }

                if (overlay) {
                    gsap.to(overlay, {
                        y: 0,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                }

                if (icon) {
                    gsap.to(icon, {
                        rotate: 0,
                        scale: 1,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                }
            });
        });
    }



    if (window.gsap && window.ScrollTrigger) {
        const groups = [
            {
                trigger: ".services-stats-grid",
                items: ".services-stat-card",
            },
            {
                trigger: ".service-index__grid",
                items: ".service-index-card",
            },
            {
                trigger: ".services-editorial__cards",
                items: ".editorial-card",
            },
            {
                trigger: ".services-review-grid",
                items: ".services-review-card",
            },
            {
                trigger: ".services-flow__grid",
                items: ".services-flow-card",
            },
        ];

        groups.forEach((group) => {
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



    if (window.gsap && window.ScrollTrigger) {
        const ctaBlock = document.querySelector(".services-cta-lux__inner");

        if (ctaBlock) {
            gsap.fromTo(
                ctaBlock,
                { opacity: 0, y: 34, scale: 0.985 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaBlock,
                        start: "top 86%",
                    },
                }
            );
        }
    }



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
});