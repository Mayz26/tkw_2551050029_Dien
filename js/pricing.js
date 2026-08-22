const dong = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function initPricing() {
  const sw = document.getElementById("cong-tac-gia");
  if (!sw) return;

  const prices = [...document.querySelectorAll("[data-price]")];
  const units = [...document.querySelectorAll("[data-price-unit]")];
  if (prices.length === 0) return;

  const initialState = sw.getAttribute("aria-checked") === "true";
  render(initialState);

  sw.addEventListener("click", () => {
    const currentState = sw.getAttribute("aria-checked") === "true";
    const newState = !currentState;
    render(newState);
  });

  sw.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault(); 
      const currentState = sw.getAttribute("aria-checked") === "true";
      render(!currentState);
    } else if (e.key === "Enter") {
      
      const currentState = sw.getAttribute("aria-checked") === "true";
      render(!currentState);
    }
  });

  function render(yearly) {
    
    sw.setAttribute("aria-checked", String(yearly));

    prices.forEach((el) => {
      const priceStr = yearly ? el.dataset.yearly : el.dataset.monthly;
      const priceNum = Number(priceStr) || 0;
      el.textContent = dong.format(priceNum);
    });

    units.forEach((el) => {
      el.textContent = yearly ? "/năm" : "/tháng";
    });
  }
    const cards = document.querySelectorAll(".pricing-card");
    const buttons = document.querySelectorAll(".pricing-select");

    if (!cards.length || !buttons.length) return;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedPlan =
                button.dataset.planButton;

            cards.forEach((card) => {
                const isSelected =
                    card.dataset.plan === selectedPlan;

                card.classList.toggle(
                    "is-selected",
                    isSelected
                );
            });

            buttons.forEach((otherButton) => {
                const isSelected =
                    otherButton.dataset.planButton === selectedPlan;

                otherButton.textContent = isSelected
                    ? "Đã chọn ✓"
                    : "Chọn gói";

                otherButton.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );
            });
        });
    });
}