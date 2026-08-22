export function initTheme() {
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    }

    function updateButton() {
        const isDark =
            document.documentElement.classList.contains("dark");

        toggle.setAttribute(
            "aria-pressed",
            String(isDark)
        );

        toggle.setAttribute(
            "aria-label",
            isDark
                ? "Chuyển sang giao diện sáng"
                : "Chuyển sang giao diện tối"
        );

        toggle.innerHTML = isDark
            ? '<span aria-hidden="true">☀️</span>'
            : '<span aria-hidden="true">🌙</span>';
    }

    updateButton();

    toggle.addEventListener("click", () => {
        const isDark =
            document.documentElement.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateButton();
    });
}