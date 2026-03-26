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

    const SITE_LOGO_SVG = `
        <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M32 12C24.268 12 18 18.268 18 26V36C18 45.9411 25.1634 54 34 54C42.8366 54 50 45.9411 50 36V26C50 18.268 43.732 12 36 12H32Z" fill="currentColor" opacity="0.16" />
            <path d="M32 14C24.268 14 18 20.268 18 28V36C18 44.8366 25.1634 52 34 52C42.8366 52 50 44.8366 50 36V28C50 20.268 43.732 14 36 14H32Z" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" />
            <path d="M26 24C26 21.7909 27.7909 20 30 20H34C36.2091 20 38 21.7909 38 24V29C38 31.2091 36.2091 33 34 33H30C27.7909 33 26 31.2091 26 29V24Z" fill="currentColor" />
            <path d="M22 20L18 16M42 20L46 16" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <path d="M24 37H40M23 43H41" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <path d="M21 28H18M46 28H43M22 35H18M46 35H42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
    `;

    const SITE_SEARCH_DATA = [
        {
            title: "Home",
            href: "index.html",
            icon: "home",
            description: "Compare providers, browse pest categories, and request quotes.",
            keywords: ["home", "compare", "quotes", "request", "pest control", "ants", "termite", "rodent", "bed bug", "mosquito", "commercial"],
        },
        {
            title: "Services",
            href: "services.html",
            icon: "layout-grid",
            description: "Browse the category directory and comparison filters.",
            keywords: ["services", "categories", "directory", "browse", "comparison"],
        },
        {
            title: "About",
            href: "about.html",
            icon: "shield-check",
            description: "Learn how the platform works and what it is not.",
            keywords: ["about", "platform", "how it works", "independent", "comparison"],
        },
        {
            title: "Contact",
            href: "contact.html",
            icon: "clipboard-list",
            description: "Start a request and share your property details.",
            keywords: ["contact", "form", "request", "submit", "quote", "phone"],
        },
        {
            title: "Ant Control",
            href: "ant-control.html",
            icon: "bug",
            description: "Compare ant activity treatment options and follow-up plans.",
            keywords: ["ant", "ants", "bug", "insects", "prevention", "treatment"],
        },
        {
            title: "Termite Control",
            href: "termite-control.html",
            icon: "scan-search",
            description: "Review termite inspection, treatment, and monitoring details.",
            keywords: ["termite", "inspection", "treatment", "monitoring", "wood"],
        },
        {
            title: "Rodent Control",
            href: "rodent-control.html",
            icon: "shield",
            description: "Compare rodent sealing, monitoring, and prevention approaches.",
            keywords: ["rodent", "mouse", "rat", "entry points", "monitoring", "prevention"],
        },
        {
            title: "Bed Bug Treatment",
            href: "bed-bug-treatment.html",
            icon: "bed-double",
            description: "Explore treatment sequences and follow-up service options.",
            keywords: ["bed bug", "bedbugs", "mattress", "room", "treatment"],
        },
        {
            title: "Mosquito Control",
            href: "mosquito-control.html",
            icon: "trees",
            description: "Review outdoor coverage, seasonal timing, and yard-fit options.",
            keywords: ["mosquito", "yard", "outdoor", "seasonal", "spray"],
        },
        {
            title: "Commercial Pest Control",
            href: "commercial-pest-control.html",
            icon: "briefcase-business",
            description: "Compare ongoing support for offices, facilities, and managed properties.",
            keywords: ["commercial", "business", "office", "facility", "managed property"],
        },
    ];

    const SITE_SEARCH_SUGGESTIONS = [
        "ants",
        "termite inspection",
        "rodent control",
        "bed bug treatment",
        "mosquito control",
        "request quotes",
        "service area",
        "pricing",
    ];

    const normalizeText = (value) =>
        (value || "")
            .toString()
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[^\w\s-]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    const injectLogoMarks = () => {
        document.querySelectorAll(".site-logo__mark").forEach((mark) => {
            if (mark.dataset.logoInjected === "true") return;
            mark.innerHTML = SITE_LOGO_SVG;
            mark.dataset.logoInjected = "true";
        });
    };

    const ensureSearchUi = () => {
        if (document.getElementById("siteSearchModal")) return;

        document.body.insertAdjacentHTML(
            "beforeend",
            `
            <div class="site-search" id="siteSearchModal" aria-hidden="true">
                <div class="site-search__backdrop" data-search-close></div>
                <div class="site-search__panel" role="dialog" aria-modal="true" aria-label="Site search">
                    <div class="site-search__top">
                        <div class="site-search__heading">
                            <span class="mini-label">Site search</span>
                            <h2>Find pages, categories, and request paths</h2>
                            <p>Type a keyword and we will surface the most relevant pages and categories.</p>
                        </div>
                        <button class="site-search__close" type="button" data-search-close aria-label="Close search">
                            <i data-lucide="x"></i>
                        </button>
                    </div>
                    <label class="site-search__field" for="siteSearchInput">
                        <i data-lucide="search"></i>
                        <input id="siteSearchInput" type="search" placeholder="Try ants, pricing, contact, service area..." autocomplete="off" />
                    </label>
                    <div class="site-search__meta">
                        <span id="siteSearchSummary">Try one of these examples</span>
                    </div>
                    <div class="site-search__suggestions" id="siteSearchExamples" aria-label="Search examples"></div>
                    <div class="site-search__results" id="siteSearchResults" aria-live="polite"></div>
                </div>
            </div>
        `
        );
    };

    injectLogoMarks();
    ensureSearchUi();

    const siteSearchModal = document.getElementById("siteSearchModal");
    const siteSearchInput = document.getElementById("siteSearchInput");
    const siteSearchSummary = document.getElementById("siteSearchSummary");
    const siteSearchExamples = document.getElementById("siteSearchExamples");
    const siteSearchResults = document.getElementById("siteSearchResults");
    const siteSearchCloseButtons = document.querySelectorAll("[data-search-close]");

    const scoreSearchItem = (item, query) => {
        const haystack = normalizeText([item.title, item.description, ...(item.keywords || [])].join(" "));
        const tokens = query.split(" ");
        let score = 0;

        if (haystack.includes(query)) score += 100;
        if (normalizeText(item.title).includes(query)) score += 55;
        if ((item.keywords || []).some((keyword) => normalizeText(keyword).includes(query))) score += 40;

        tokens.forEach((token) => {
            if (!token) return;
            if (haystack.includes(token)) score += 18;
        });

        return score;
    };

    const renderSearchExamples = (query) => {
        if (!siteSearchExamples) return;

        const visibleSuggestions = SITE_SEARCH_SUGGESTIONS.filter((item) => !query || normalizeText(item).includes(query)).slice(0, 8);

        siteSearchExamples.innerHTML = visibleSuggestions
            .map(
                (suggestion) => `
                    <button type="button" class="site-search__chip" data-search-chip="${suggestion}">
                        <i data-lucide="sparkles"></i>
                        <span>${suggestion}</span>
                    </button>
                `
            )
            .join("");
    };

    const renderSearchResults = (query) => {
        if (!siteSearchResults || !siteSearchSummary) return;

        const normalizedQuery = normalizeText(query);
        const results = normalizedQuery
            ? SITE_SEARCH_DATA
                  .map((item) => ({ ...item, score: scoreSearchItem(item, normalizedQuery) }))
                  .filter((item) => item.score > 0)
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 6)
            : SITE_SEARCH_DATA.slice(0, 6);

        siteSearchSummary.textContent = normalizedQuery
            ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query.trim()}"`
            : "Popular pages and categories";

        renderSearchExamples(normalizedQuery);

        siteSearchResults.innerHTML = results.length
            ? results
                  .map(
                      (item) => `
                        <a class="site-search__result" href="${item.href}">
                            <span class="site-search__result-icon"><i data-lucide="${item.icon}"></i></span>
                            <span class="site-search__result-copy">
                                <strong>${item.title}</strong>
                                <span>${item.description}</span>
                            </span>
                            <i class="site-search__result-arrow" data-lucide="arrow-up-right"></i>
                        </a>
                    `
                  )
                  .join("")
            : `
                <div class="site-search__empty">
                    <i data-lucide="search-x"></i>
                    <p>No results yet. Try <strong>ants</strong>, <strong>quotes</strong>, or <strong>service area</strong>.</p>
                </div>
            `;

        refreshIcons();
    };

    const closeSiteSearch = () => {
        if (!siteSearchModal) return;

        siteSearchModal.classList.remove("is-open");
        siteSearchModal.setAttribute("aria-hidden", "true");
        body.classList.remove("search-open");
    };

    const openSiteSearch = () => {
        if (!siteSearchModal || !siteSearchInput) return;

        siteSearchModal.classList.add("is-open");
        siteSearchModal.setAttribute("aria-hidden", "false");
        body.classList.add("search-open");

        renderSearchResults(siteSearchInput.value);

        window.setTimeout(() => {
            siteSearchInput.focus();
            siteSearchInput.select();
        }, 0);
    };

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
    const headerActions = document.querySelector(".header-actions");

    const injectHeaderSearchButton = () => {
        if (!headerActions || headerActions.querySelector(".site-search-toggle")) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "site-search-toggle";
        button.setAttribute("aria-label", "Open site search");
        button.setAttribute("aria-haspopup", "dialog");
        button.innerHTML = '<i data-lucide="search"></i>';

        const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

        if (mobileMenuToggle) {
            headerActions.insertBefore(button, mobileMenuToggle);
        } else {
            headerActions.appendChild(button);
        }
    };

    injectHeaderSearchButton();
    refreshIcons();

    const siteSearchToggleButton = document.querySelector(".site-search-toggle");
    siteSearchToggleButton?.addEventListener("click", openSiteSearch);

    siteSearchCloseButtons.forEach((button) => {
        button.addEventListener("click", closeSiteSearch);
    });

    siteSearchModal?.addEventListener("click", (event) => {
        if (event.target === siteSearchModal) {
            closeSiteSearch();
        }
    });

    siteSearchInput?.addEventListener("input", (event) => {
        renderSearchResults(event.target.value);
    });

    siteSearchInput?.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        const firstResult = siteSearchResults?.querySelector(".site-search__result");
        if (firstResult instanceof HTMLAnchorElement) {
            window.location.href = firstResult.href;
        }
    });

    siteSearchExamples?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-search-chip]");
        if (!button || !siteSearchInput) return;

        const value = button.getAttribute("data-search-chip") || "";
        siteSearchInput.value = value;
        renderSearchResults(value);
        siteSearchInput.focus();
    });

    document.addEventListener("keydown", (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            openSiteSearch();
        }
    });

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

        if (event.key === "Escape" && siteSearchModal?.classList.contains("is-open")) {
            closeSiteSearch();
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
