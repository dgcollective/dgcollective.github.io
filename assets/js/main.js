document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.mobile-nav-overlay a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('nav-toggle').checked = false;
        });
    });

    const header = document.querySelector("header");
    const links = document.querySelectorAll('a[href^="#"]');
    const sections = [];

    links.forEach(anchor => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            sections.push({ id: anchor.getAttribute("href"), element: target });
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const offset = header ? header.offsetHeight : 0;
                const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: y, behavior: "smooth" });
            });
        }
    });

    function setActiveLink() {
        const scrollPosition = window.scrollY + (header ? header.offsetHeight + 10 : 10);
        let current = null;

        sections.forEach(section => {
            if (scrollPosition >= section.element.offsetTop) {
                current = section.id;
            }
        });

        links.forEach(link => {
            if (link.getAttribute("href") === current) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();

    const yearSpan = document.getElementById("cyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});