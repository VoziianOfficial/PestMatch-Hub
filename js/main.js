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
    // DOM REFERENCES
    // =========================
    const body = document.body;
    const siteHeader = document.getElementById("siteHeader");

    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");
    const mobileServiceSelect = document.getElementById("mobileServiceSelect");

    const cookieBanner = document.getElementById("cookieBanner");
    const cookieAcceptBtn = document.getElementById("cookieAcceptBtn");
    const cookieDeclineBtn = document.getElementById("cookieDeclineBtn");

    const successModal = document.getElementById("formSuccessModal");
    const successModalClose = document.querySelector(".form-success-modal__close");
    const successModalBtn = document.getElementById("successModalBtn");
    const successModalBackdrop = document.querySelector(".form-success-modal__backdrop");

    // =========================
    // STICKY HEADER
    // =========================
    const handleHeaderState = () => {
        if (!siteHeader) return;

        if (window.scrollY > 16) {
            siteHeader.classList.add("is-scrolled");
        } else {
            siteHeader.classList.remove("is-scrolled");
        }
    };

    handleHeaderState();
    window.addEventListener("scroll", handleHeaderState, { passive: true });

    // =========================
    // MOBILE MENU
    // =========================
    const openMobileMenu = () => {
        if (!mobileMenu || !mobileMenuToggle) return;

        mobileMenu.classList.add("is-open");
        mobileMenu.setAttribute("aria-hidden", "false");
        mobileMenuToggle.setAttribute("aria-expanded", "true");
        body.classList.add("menu-open");
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileMenuToggle) return;

        mobileMenu.classList.remove("is-open");
        mobileMenu.setAttribute("aria-hidden", "true");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
    };

    mobileMenuToggle?.addEventListener("click", openMobileMenu);
    mobileMenuClose?.addEventListener("click", closeMobileMenu);

    mobileMenu?.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
            closeMobileMenu();
        }
    });

    mobileServiceSelect?.addEventListener("change", (event) => {
        const { value } = event.target;
        if (value) {
            window.location.href = value;
        }
    });

    // close mobile menu after clicking a link inside it
    const mobileMenuLinks = mobileMenu?.querySelectorAll("a");
    mobileMenuLinks?.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    // =========================
    // COOKIE / POLICY BANNER
    // =========================
    const COOKIE_KEY = "pestmatch_policy_choice";

    const setBannerState = (state) => {
        try {
            localStorage.setItem(COOKIE_KEY, state);
        } catch (error) {
            console.error("Banner state save failed:", error);
        }
    };

    const getBannerState = () => {
        try {
            return localStorage.getItem(COOKIE_KEY);
        } catch (error) {
            console.error("Banner state read failed:", error);
            return null;
        }
    };

    const hideCookieBanner = () => {
        if (!cookieBanner) return;
        cookieBanner.classList.add("is-hidden");
    };

    const showCookieBanner = () => {
        if (!cookieBanner) return;
        cookieBanner.classList.remove("is-hidden");
    };

    if (cookieBanner) {
        const existingState = getBannerState();

        if (existingState === "accepted" || existingState === "declined") {
            hideCookieBanner();
        } else {
            showCookieBanner();
        }

        cookieAcceptBtn?.addEventListener("click", () => {
            setBannerState("accepted");
            hideCookieBanner();
        });

        cookieDeclineBtn?.addEventListener("click", () => {
            setBannerState("declined");
            hideCookieBanner();
        });
    }

    // =========================
    // SUCCESS MODAL HELPERS
    // =========================
    const openSuccessModal = () => {
        if (!successModal) return;

        successModal.classList.add("is-active");
        successModal.setAttribute("aria-hidden", "false");
        body.classList.add("modal-open");
    };

    const closeSuccessModal = () => {
        if (!successModal) return;

        successModal.classList.remove("is-active");
        successModal.setAttribute("aria-hidden", "true");
        body.classList.remove("modal-open");
    };

    successModalClose?.addEventListener("click", closeSuccessModal);
    successModalBtn?.addEventListener("click", closeSuccessModal);
    successModalBackdrop?.addEventListener("click", closeSuccessModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && successModal?.classList.contains("is-active")) {
            closeSuccessModal();
        }
    });

    // =========================
    // GENERIC FORM FALLBACK
    // =========================
    // This only handles forms that are NOT explicitly marked as JS-owned by page scripts.
    // If a form has data-form-managed="page", main.js will ignore it.
    const genericForms = document.querySelectorAll(
        "form[data-form-type]:not([data-form-managed='page'])"
    );

    genericForms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            // Let page-level scripts fully own forms marked by page logic.
            if (form.dataset.formManaged === "page") return;

            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            form.reset();
            openSuccessModal();
        });
    });

    // =========================
    // OPTIONAL SAFE FAQ FALLBACK
    // =========================
    // Only runs on pages that do not already opt into page-level FAQ handling.
    const faqRoot = document.querySelector("[data-faq-managed='page']");
    if (!faqRoot) {
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
    }

    // =========================
    // BASIC REVEALS (SAFE)
    // =========================
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const revealItems = document.querySelectorAll(
            ".site-footer__grid > div, .legal-section, .legal-sidebar__card"
        );

        revealItems.forEach((item) => {
            gsap.fromTo(
                item,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    },
                }
            );
        });
    }

    // =========================
    // FINAL ICON REFRESH
    // =========================
    refreshIcons();
});