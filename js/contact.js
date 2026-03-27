document.addEventListener("DOMContentLoaded", () => {



    const refreshIcons = () => {
        if (window.lucide) {
            lucide.createIcons();
        }
    };

    refreshIcons();



    if (window.gsap) {
        const heroEyebrow = document.querySelector(".contact-hero__copy .section-eyebrow");
        const heroTitle = document.querySelector(".contact-hero__copy h1");
        const heroText = document.querySelector(".contact-hero__copy p");
        const heroActions = document.querySelector(".contact-hero__actions");
        const heroPoints = document.querySelector(".contact-hero__points");
        const heroPanel = document.querySelector(".contact-hero__panel");

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
                { opacity: 0, y: 24 },
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

        if (heroPoints?.children.length) {
            gsap.fromTo(
                heroPoints.children,
                { opacity: 0, y: 18 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    delay: 0.36,
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



    if (window.gsap && window.ScrollTrigger) {
        const heroImage = document.querySelector(".contact-hero__media img");

        if (heroImage) {
            gsap.to(heroImage, {
                yPercent: 10,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                    trigger: ".contact-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }
    }



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



    const form = document.querySelector(".contact-request-form");
    const serviceSelect = document.getElementById("contactService");
    const timingSelect = document.getElementById("contactTiming");
    const messageField = document.getElementById("contactMessage");

    if (form && serviceSelect && messageField) {
        serviceSelect.addEventListener("change", () => {
            const value = serviceSelect.value;

            if (!value || messageField.value.trim().length > 0) return;

            const presets = {
                "Ant Control":
                    "I would like to compare local provider options for recurring ant activity.",
                "Termite Control":
                    "I would like to compare local termite inspection or treatment options.",
                "Rodent Control":
                    "I would like to compare provider options for rodent activity and possible entry-point concerns.",
                "Bed Bug Treatment":
                    "I would like to compare local provider options for bed bug treatment and follow-up service.",
                "Mosquito Control":
                    "I would like to compare outdoor mosquito control options for my property.",
                "Commercial Pest Control":
                    "I would like to compare commercial pest control provider options for a business or managed property.",
            };

            if (presets[value]) {
                messageField.value = presets[value];
            }
        });
    }

    if (timingSelect && form) {
        timingSelect.addEventListener("change", () => {
            const selected = timingSelect.value;
            const activeSteps = document.querySelectorAll(".form-progress__step");

            activeSteps.forEach((step) => step.classList.add("is-active"));

            if (window.gsap) {
                gsap.fromTo(
                    ".form-progress__step",
                    { scale: 0.98, opacity: 0.8 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.35,
                        stagger: 0.04,
                        ease: "power2.out",
                    }
                );
            }

            if (selected === "Just comparing options" && messageField && !messageField.value.trim()) {
                messageField.value = "I am comparing provider options and would like to review what may be available in my area.";
            }
        });
    }



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

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            form.reset();
            openSuccessModal();
        });
    }

    successModalClose?.addEventListener("click", closeSuccessModal);
    successModalBtn?.addEventListener("click", closeSuccessModal);
    successModalBackdrop?.addEventListener("click", closeSuccessModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && successModal?.classList.contains("is-active")) {
            closeSuccessModal();
        }
    });



    if (window.gsap && window.ScrollTrigger) {
        const revealGroups = [
            {
                trigger: ".contact-highlights__grid",
                items: ".contact-highlight-card",
            },
            {
                trigger: ".contact-main__grid",
                items: ".contact-form-shell, .contact-side-card",
            },
            {
                trigger: ".contact-cards__grid",
                items: ".contact-info-card",
            },
            {
                trigger: ".contact-map-section__grid",
                items: ".contact-map-section__copy, .contact-map-card",
            },
            {
                trigger: ".faq-list",
                items: ".faq-item",
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