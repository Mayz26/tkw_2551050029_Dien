export function initToTop() {
    const btn = document.getElementById("nut-len-dau");
    const sentinel = document.getElementById("nav-sentinel");

    if (!btn || !sentinel) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            btn.classList.toggle(
                "is-visible",
                !entry.isIntersecting
            );
        },
        {
            rootMargin: "400px 0px 0px 0px"
        }
    );

    observer.observe(sentinel);

    btn.addEventListener("click", () => {
        const reduced =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduced ? "auto" : "smooth"
        });

        document.documentElement.tabIndex = -1;
        document.documentElement.focus({
            preventScroll: true
        });
    });
}