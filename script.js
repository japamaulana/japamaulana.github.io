const root = document.documentElement;
const header = document.querySelector(".site-header");
const nav = document.getElementById("site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-toggle-label");

/* Theme toggle: the initial theme is set inline in <head> to avoid a flash. */
function syncThemeButton() {
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeLabel.textContent = isDark ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
    syncThemeButton();
});

syncThemeButton();

/* Mobile menu */
function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
}

menuToggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuToggle.focus();
    }
});

window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
});

/* Header rule appears once the page scrolls, so the hero starts clean. */
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Mark the nav link for the section currently in view. */
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                const active = link.getAttribute("href") === `#${entry.target.id}`;
                if (active) link.setAttribute("aria-current", "true");
                else link.removeAttribute("aria-current");
            });
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

/* Highlighter strokes draw once when their phrase scrolls into view. */
const markObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-drawn");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.8 }
);

document.querySelectorAll(".mark").forEach((mark) => markObserver.observe(mark));
