document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".legal-sidebar a");

    if (!sections.length || !navLinks.length) return;



    const activateLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.remove("is-active");

            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("is-active");
            }
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activateLink(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-40% 0px -50% 0px",
            threshold: 0,
        }
    );

    sections.forEach((section) => observer.observe(section));



    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href").replace("#", "");
            const target = document.getElementById(targetId);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });
});