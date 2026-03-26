document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // ICONS
    // =========================
    const refreshIcons = () => {
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    refreshIcons();

    // =========================
    // PAGE CONTEXT
    // =========================
    const path = window.location.pathname.split("/").pop() || "";

    const pagePresets = {
        "ant-control.html": {
            request: "I would like to compare local provider options for recurring ant activity at my property.",
        },
        "termite-control.html": {
            request: "I would like to compare local provider options for termite inspection or treatment.",
        },
        "rodent-control.html": {
            request: "I would like to compare local provider options for rodent activity and possible entry-point concerns.",
        },
        "bed-bug-treatment.html": {
            request: "I would like to compare local provider options for bed bug treatment and follow-up service.",
        },
        "mosquito-control.html": {
            request: "I would like to compare local provider options for mosquito control around my property.",
        },
        "commercial-pest-control.html": {
            request: "I would like to compare commercial pest control provider options for a business or managed property.",
        },
    };

    // =========================
    // HERO REVEAL
    // =========================
    if (window.gsap) {
        const eyebrow = document.querySelector(
            ".service-page-hero .section-eyebrow, .service-hero .section-eyebrow, .service-hero-lux .section-eyebrow"
        );
        const title = document.querySelector(
            ".service-page-hero h1, .service-hero h1, .service-hero-lux h1"
        );
        const text = document.querySelector(
            ".service-page-hero p, .service-hero p, .service-hero-lux p"
        );
        const actions = document.querySelector(
            ".service-page-hero__actions, .service-hero__actions, .service-hero-lux__actions"
        );
        const panel = document.querySelector(
            ".service-page-hero__panel, .service-hero__panel, .service-hero-lux__panel, .service-side-panel, .service-insight-card"
        );

        if (eyebrow) {
            gsap.fromTo(
                eyebrow,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
            );
        }

        if (title) {
            gsap.fromTo(
                title,
                { opacity: 0, y: 34 },
                { opacity: 1, y: 0, duration: 0.95, delay: 0.08, ease: "power3.out" }
            );
        }

        if (text) {
            gsap.fromTo(
                text,
                { opacity: 0, y: 28 },
                { opacity: 1, y: 0, duration: 0.9, delay: 0.18, ease: "power3.out" }
            );
        }

        if (actions?.children.length) {
            gsap.fromTo(
                actions.children,
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

        if (panel) {
            gsap.fromTo(
                panel,
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
        const heroImage = document.querySelector(
            ".service-page-hero__media img, .service-hero__media img, .service-hero-lux__media img"
        );
        const heroSection = document.querySelector(
            ".service-page-hero, .service-hero, .service-hero-lux"
        );

        if (heroImage && heroSection) {
            gsap.to(heroImage, {
                yPercent: 10,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    }

    // =========================
    // FAQ
    // =========================
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const faqItem = button.closest(".faq-item");
            const answer = faqItem?.querySelector(".faq-answer");
            const isExpanded = button.getAttribute("aria-expanded") === "true";

            faqButtons.forEach((otherButton) => {
                const otherItem = otherButton.closest(".faq-item");
                const otherAnswer = otherItem?.querySelector(".faq-answer");

                otherButton.setAttribute("aria-expanded", "false");
                otherItem?.classList.remove("is-open");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!isExpanded && faqItem && answer) {
                button.setAttribute("aria-expanded", "true");
                faqItem.classList.add("is-open");
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });

    // =========================
    // FORM PRESET / INTERACTIONS
    // =========================
    const serviceForms = document.querySelectorAll("form[data-form-type]");
    const serviceField = document.querySelector(
        "#servicePageService, #requestService, #contactService, select[name='service']"
    );
    const messageField = document.querySelector(
        "#servicePageMessage, #requestMessage, #contactMessage, textarea[name='message']"
    );

    const currentPreset = pagePresets[path];

    if (serviceField && currentPreset) {
        const optionValues = Array.from(serviceField.options).map((option) => option.textContent.trim());

        const matchValue = optionValues.find((value) =>
            currentPreset.request.toLowerCase().includes(value.toLowerCase().replace(/\s+/g, " "))
        );

        if (matchValue && !serviceField.value) {
            serviceField.value = matchValue;
        }
    }

    if (messageField && currentPreset) {
        messageField.addEventListener("focus", () => {
            if (!messageField.value.trim()) {
                messageField.value = currentPreset.request;
            }
        });
    }

    // =========================
    // SUCCESS MODAL
    // =========================
    const successModal = document.getElementById("formSuccessModal");
    const successModalClose = document.querySelector(".form-success-modal__close");
    const successModalBtn = document.getElementById("successModalBtn");
    const successModalBackdrop = document.querySelector(".form-success-modal__backdrop");

    const openSuccessModal = () => {
        if (!successModal) return;

        successModal.classList.add("is-active");
        successModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    };

    const closeSuccessModal = () => {
        if (!successModal) return;

        successModal.classList.remove("is-active");
        successModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };

    serviceForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            form.reset();

            if (serviceField && currentPreset) {
                serviceField.value = serviceField.value || "";
            }

            openSuccessModal();
        });
    });

    successModalClose?.addEventListener("click", closeSuccessModal);
    successModalBtn?.addEventListener("click", closeSuccessModal);
    successModalBackdrop?.addEventListener("click", closeSuccessModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && successModal?.classList.contains("is-active")) {
            closeSuccessModal();
        }
    });

    // =========================
    // SECTION REVEALS
    // =========================
    if (window.gsap && window.ScrollTrigger) {
        const revealGroups = [
            {
                trigger: ".service-overview, .service-overview-section, .service-editorial",
                items: ".service-overview-card, .service-detail-card, .editorial-card, .benefit-card",
            },
            {
                trigger: ".service-factors, .comparison-factors, .service-values",
                items: ".factor-card, .comparison-card, .value-card, .about-value-item",
            },
            {
                trigger: ".service-process, .service-flow, .process-editorial__grid",
                items: ".step-card, .service-flow-card, .process-panel, .about-process-card",
            },
            {
                trigger: ".faq-list",
                items: ".faq-item",
            },
            {
                trigger: ".service-cta, .services-cta-lux, .about-cta__inner",
                items: ".service-cta__inner, .services-cta-lux__inner, .about-cta__inner",
            },
            {
                trigger: ".site-footer__grid",
                items: ".site-footer__grid > div",
            },
        ];

        revealGroups.forEach((group) => {
            const trigger = document.querySelector(group.trigger);
            const items = document.querySelectorAll(group.items);

            if (trigger && items.length) {
                gsap.from(items, {
                    opacity: 0,
                    y: 34,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger,
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