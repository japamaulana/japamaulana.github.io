const topbar = document.querySelector(".topbar");
const marqueeTrack = document.querySelector(".marquee-track");
const marquee = document.querySelector(".marquee");
const seal = document.querySelector(".seal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/*
  The marquee and the round seal move with the scroll position instead of looping
  on a timer, so nothing keeps moving while the reader is still.
*/
let ticking = false;

function update() {
    ticking = false;
    const y = window.scrollY;
    topbar.classList.toggle("is-scrolled", y > 8);

    if (reduceMotion.matches) {
        marqueeTrack.style.setProperty("--shift", "0px");
        seal.style.setProperty("--spin", "0deg");
        return;
    }

    seal.style.setProperty("--spin", `${y * 0.25}deg`);

    const rect = marquee.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const travel = marqueeTrack.scrollWidth - marquee.clientWidth;
        marqueeTrack.style.setProperty("--shift", `${-progress * travel * 0.6}px`);
    }
}

function onScroll() {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
    }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
reduceMotion.addEventListener("change", update);
update();

/* Mark the nav link for the section in view. */
const navLinks = [...document.querySelectorAll('.nav-list a[href^="#"]')];

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.setAttribute("aria-current", "true");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);

navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean)
    .forEach((section) => observer.observe(section));
