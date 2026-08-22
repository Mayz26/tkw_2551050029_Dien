export function initFaq() {
    const root = document.getElementById("cau-hoi");
    if (!root) return;

    const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
    if (triggers.length === 0) return;

   
    function setOpen(trigger, open) {
        // Tìm panel bằng chính ARIA đã có: trigger.getAttribute("aria-controls")
        const panelId = trigger.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        
        if (panel) {
        trigger.setAttribute("aria-expanded", String(open));
        panel.hidden = !open;
        }
    }

    root.addEventListener("click", function (e) {
        const trigger = e.target.closest("[data-faq-trigger]");
        if (!trigger) return;

    
        const willOpen = trigger.getAttribute("aria-expanded") === "false";

        triggers.forEach(t => setOpen(t, false));

        if (willOpen) {
        setOpen(trigger, true);
        }
    });

    root.addEventListener("keydown", function (e) {
        const trigger = e.target.closest("[data-faq-trigger]");
        if (!trigger) return;

        const currentIndex = triggers.indexOf(trigger);
        let nextIndex = -1;

        switch (e.key) {
        case "ArrowDown":
            nextIndex = (currentIndex + 1) % triggers.length;
            break;
        case "ArrowUp":
            nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            break;
        case "Home":
            nextIndex = 0;
            break;
        case "End":
            nextIndex = triggers.length - 1;
            break;
        default:
            return; // Không xử lý các phím khác
        }

        if (nextIndex !== -1) {
        e.preventDefault(); // Nhớ e.preventDefault() để trang không cuộn theo.
        triggers[nextIndex].focus();
        }
    });

    triggers.forEach(t => setOpen(t, false));
}