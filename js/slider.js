const TU_CHAY = 6000;  

export function initSlider() {
  const root = document.getElementById("slider-camnhan");
  if (!root) return;

  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dotsBox = root.querySelector("[data-slider-dots]");
  const prev = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  const dots = [];
  if (dotsBox) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.classList.add("slider-dot");
      dot.setAttribute("aria-label", `Xem cảm nhận ${i + 1} trên ${slides.length}`);
      
      dot.addEventListener("click", () => {
        go(i);
        restart();
      });

      dotsBox.appendChild(dot);
      dots.push(dot);
    });
  }

  function go(next_) {
    index = (next_ + slides.length) % slides.length;

    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
      const isCurrent = i === index;
      slide.toggleAttribute("inert", !isCurrent);
      slide.setAttribute("aria-hidden", !isCurrent);
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function start() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    stop();
    timer = setInterval(() => go(index + 1), TU_CHAY);
  }
  
  function stop() { 
    clearInterval(timer); 
    timer = null; 
  }
  
  function restart() { 
    stop(); 
    start(); 
  }

  prev?.addEventListener("click", () => {
    go(index - 1);
    restart();
  });

  next?.addEventListener("click", () => {
    go(index + 1);
    restart();
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      go(index - 1);
      restart();
    } else if (e.key === "ArrowRight") {
      go(index + 1);
      restart();
    }
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  go(0);
  start();
}