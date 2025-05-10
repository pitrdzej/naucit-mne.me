const overlay = document.getElementById("overlay");
    const modalWrong = document.getElementById("modal-wrong");
    const modalRight = document.getElementById("modal-right");
    const contentWrapper = document.getElementById("content-wrapper");

    function openModal(type) {
    overlay.classList.remove("hidden");
    overlay.classList.add("active");

    const modal = type === "wrong" ? modalWrong : modalRight;
    modal.classList.remove("hidden", "hide");
    modal.classList.add("show");

    contentWrapper.classList.add("blurred");
}

function closeModal() {
  const modal = !modalWrong.classList.contains("hidden") ? modalWrong : modalRight;

  modal.classList.remove("show");
  modal.classList.add("hide");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("hide");
    overlay.classList.remove("active");
    overlay.classList.add("hidden");
    contentWrapper.classList.remove("blurred");
  }, 400);
}

    document.querySelector(".wrong").addEventListener("click", (e) => {
      e.preventDefault();
      openModal("wrong");
    });

    document.querySelector(".right").addEventListener("click", (e) => {
      e.preventDefault();
      openModal("right");
    });
    document.addEventListener("keydown", function(event) {
      if (event.code === "Space") {
        event.preventDefault();
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    });

    document.querySelectorAll("#content-wrapper").forEach(section => {
    const bubbles = [];
    const sectionWidth = section.offsetWidth;
    const sectionHeight = section.offsetHeight;

    function isOverlapping(x, y, size) {
      return bubbles.some(b => {
        const dx = b.x - x;
        const dy = b.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (b.size + size) / 2; 
      });
    }

    let attempts = 0;
    while (bubbles.length < 20 && attempts < 200) {
      const size = Math.random() * 60 + 20;
      const x = Math.random() * (sectionWidth - size);
      const y = Math.random() * (sectionHeight - size);

      if (!isOverlapping(x + size / 2, y + size / 2, size)) {
        bubbles.push({ x: x + size / 2, y: y + size / 2, size });

        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const duration = Math.random() * 10 + 5;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.position = "absolute";

        section.appendChild(bubble);
      }

      attempts++;
    }
  });
  document.querySelectorAll('.swap').forEach(el => {
    const original = el.textContent;
    const alt = el.getAttribute('data-alt');

    el.addEventListener('mouseenter', () => {
      el.textContent = alt;
    });

    el.addEventListener('mouseleave', () => {
      el.textContent = original;
    });
  });