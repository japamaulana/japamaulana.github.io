document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll(
        "#home, main section, section"
    );

    const heroImage =
        document.querySelector(".hero-image");

// Navbar Scroll

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


// Navigation
    const updateActiveNav = () => {

        if (!navLinks.length) return;


        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach((section) => {

            if (!section.id) return;


            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop + section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");


            link.classList.remove("active");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateActiveNav
    );

    updateActiveNav();


// Scroll
    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const targetSection =
                    document.querySelector(
                        targetId
                    );


                if (!targetSection) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                let targetPosition =
                    targetSection.offsetTop;


                if (window.innerWidth > 650) {

                    targetPosition -=
                        navbarHeight + 20;

                }

                window.scrollTo({

                    top:
                        Math.max(
                            targetPosition,
                            0
                        ),

                    behavior: "smooth"

                });

            }
        );

    });


    const revealElements =
        document.querySelectorAll(
            [
                ".about-content",
                ".about-grid",
                ".project",
                ".skill-card",
                ".contact .section-container"
            ].join(", ")
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });

// Intersection
    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(
                element
            );

        });


    } else {

        revealElements.forEach((element) => {

            element.classList.add("show");

        });

    }

// card
    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );


    skillCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -4;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 4;


                card.style.transform = `
                    perspective(600px)
                    translateY(-8px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

// Project Image
    const projectImages =
        document.querySelectorAll(
            ".project-image"
        );


    projectImages.forEach((image) => {

        const img =
            image.querySelector("img");


        if (!img) return;


        image.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 900
                ) {
                    return;
                }


                const rect =
                    image.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const moveX =
                    (
                        x / rect.width -
                        0.5
                    ) * 8;


                const moveY =
                    (
                        y / rect.height -
                        0.5
                    ) * 8;


                img.style.transform = `
                    scale(1.04)
                    translate(${moveX}px, ${moveY}px)
                `;

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                img.style.transform =
                    "scale(1)";

            }
        );

    });

// Hero Image
    if (heroImage) {

        heroImage.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 900
                ) {
                    return;
                }


                const rect =
                    heroImage.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    (
                        x / rect.width -
                        0.5
                    ) * 6;


                const rotateX =
                    (
                        y / rect.height -
                        0.5
                    ) * -6;


                heroImage.style.transform = `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;

            }
        );


        heroImage.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "perspective(800px) rotateX(0deg) rotateY(0deg)";

            }
        );

    }

// Buttton Ripple
    const buttons =
        document.querySelectorAll(
            ".button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.position =
                    "absolute";


                ripple.style.left =
                    `${
                        event.clientX -
                        rect.left -
                        size / 2
                    }px`;


                ripple.style.top =
                    `${
                        event.clientY -
                        rect.top -
                        size / 2
                    }px`;


                ripple.style.background =
                    "rgba(255,255,255,0.18)";


                ripple.style.borderRadius =
                    "50%";


                ripple.style.pointerEvents =
                    "none";


                ripple.style.transform =
                    "scale(0)";


                ripple.style.animation =
                    "ripple 0.6s ease-out";


                button.style.position =
                    "relative";


                button.style.overflow =
                    "hidden";


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    document.body.classList.add(
        "loaded"
    );


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth <= 900 &&
                heroImage
            ) {

                heroImage.style.transform =
                    "";

            }

            if (
                window.innerWidth <= 900
            ) {

                skillCards.forEach(
                    (card) => {

                        card.style.transform =
                            "";

                    }
                );

            }


            updateActiveNav();

        }
    );

});
