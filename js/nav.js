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

export function initNav() {
    const toggle = document.querySelector('[aria-controls="nav-mobile"]');
    const menu = document.getElementById("nav-mobile");
    if (!toggle || !menu) return;
    function setOpen(open) {
        menu.classList.toggle("hidden", !open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
        document.body.classList.toggle("overflow-hidden", open);
    }

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

    toggle.addEventListener("click", () => {
    setOpen(!isOpen());
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
        }
    });

    document.addEventListener("click", (e) => {
        if (isOpen() && !e.target.closest("header") && !toggle.contains(e.target)) {
        setOpen(false);
        }
    });

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    mediaQuery.addEventListener("change", (e) => {
        if (e.matches && isOpen()) {
        setOpen(false);
        }
    });
}

export function initHeaderOnScroll() {
  const header = document.querySelector('header');
  const sentinel = document.getElementById('nav-sentinel');
  if (!header || !sentinel) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isScrolled = !entry.isIntersecting;

      // Thêm hoặc xóa class dựa trên trạng thái cuộn
      header.classList.toggle('shadow-sm', isScrolled);
      header.classList.toggle('is-scrolled', isScrolled);
    });
  }, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0
  });

  observer.observe(sentinel);
}