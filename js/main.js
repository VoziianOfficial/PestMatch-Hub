document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

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
    // AOS
    // =========================
    if (window.AOS) {
        try {
            AOS.init({
                duration: 850,
                easing: "ease-out-cubic",
                once: true,
                offset: 40,
                mirror: false,
            });

            root.classList.add("aos-ready");
        } catch (error) {
            console.error("AOS init failed:", error);
        }
    }

    // =========================
    // LENIS
    // =========================
    let lenis = null;

    if (window.Lenis) {
        lenis = new Lenis({
            duration: 1.05,
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 0.95,
            touchMultiplier: 1,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    // =========================
    // GSAP + SCROLLTRIGGER
    // =========================
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on("scroll", ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }
    }

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

    const forms = document.querySelectorAll("form[data-form-type]");
    const successModal = document.getElementById("formSuccessModal");
    const successModalClose = document.querySelector(".form-success-modal__close");
    const successModalBtn = document.getElementById("successModalBtn");
    const successModalBackdrop = document.querySelector(".form-success-modal__backdrop");

    const faqButtons = document.querySelectorAll(".faq-question");

    // =========================
    // HEADER SCROLLED STATE
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
    window.addEventListener("scroll", handleHeaderState);

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

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener("click", closeMobileMenu);
    }

    if (mobileMenu) {
        mobileMenu.addEventListener("click", (event) => {
            if (event.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
            closeMobileMenu();
        }
    });

    if (mobileServiceSelect) {
        mobileServiceSelect.addEventListener("change", (event) => {
            const { value } = event.target;
            if (value) {
                window.location.href = value;
            }
        });
    }

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
    // SUCCESS MODAL
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

    forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            form.reset();
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
    // FAQ ACCORDION
    // =========================
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
    // SHARED REVEALS
    // =========================
    if (window.gsap && window.ScrollTrigger) {
        const revealItems = document.querySelectorAll(
            ".review-card, .benefit-card, .process-panel, .coverage-showcase__map, .home-form-shell, .site-footer__grid > div"
        );

        revealItems.forEach((item) => {
            gsap.fromTo(
                item,
                {
                    opacity: 0,
                    y: 34,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 88%",
                    },
                }
            );
        });
    }

    refreshIcons();
});