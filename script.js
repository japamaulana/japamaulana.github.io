const topbar = document.querySelector(".topbar");
const screens = [...document.querySelectorAll(".screen")];
const navLinks = [...document.querySelectorAll('.nav-list a[href^="#"]')];

/* Which nav item owns each screen (project screens belong to Work). */
function navTarget(screen) {
    if (screen.classList.contains("case")) return "work";
    return screen.id;
}

/* The top bar takes the colour of the screen under it, and the nav marks where you are. */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const screen = entry.target;
            topbar.classList.toggle("tone-dark", screen.dataset.tone === "dark");
            topbar.classList.toggle("tone-mint", screen.dataset.tone === "mint");

            const target = navTarget(screen);
            navLinks.forEach((link) => {
                if (link.getAttribute("href") === `#${target}`) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    { rootMargin: "0px 0px -92% 0px" }
);

screens.forEach((screen) => observer.observe(screen));
