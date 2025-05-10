const sectionToLink = {
  mneMe: "mneMe.html",
  jiJi: "jiJi.html",
  hold: "hold.html",
  bysme: "bysme.html",
  tip: "tip.html",
  jsiSi: "jsiSi.html"
};

const exploreLink = document.getElementById("exploreLink");

function updateExploreLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + window.innerHeight / 2;
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      currentId = section.id;
    }
  });

  if (currentId === "uvod") {
    exploreLink.style.display = "none";
  } else {
    exploreLink.style.display = "flex";
    exploreLink.href = sectionToLink[currentId] || "#";
  }
}

function updateDownIcon() {
  const sections = document.querySelectorAll("section");
  const lastSection = sections[sections.length - 1];
  const bottomOfLast = lastSection.offsetTop + lastSection.offsetHeight;
  const currentBottom = window.scrollY + window.innerHeight;

  if (currentBottom >= bottomOfLast - 10) {
    document.body.classList.add("last-section");
  } else {
    document.body.classList.remove("last-section");
  }
}

function scrollToNextSection() {
  const sections = Array.from(document.querySelectorAll("section"));
  const scrollPos = window.scrollY + 1;

  const next = sections.find(section => section.offsetTop > scrollPos);
  if (next) {
    next.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("keydown", function(event) {
  if (event.code === "Space" || event.code === "ArrowDown") {
    event.preventDefault();
    scrollToNextSection();
  }

  if ((event.code === "Enter" || event.code === "ArrowRight") && exploreLink.href !== "#") {
    exploreLink.click();
  }
});

document.getElementById("downIcon").addEventListener("click", scrollToNextSection);

window.addEventListener("scroll", () => {
  updateExploreLink();
  updateDownIcon();
});
window.addEventListener("load", () => {
  updateExploreLink();
  updateDownIcon();
  showNextLine();
});

document.querySelectorAll("section").forEach(section => {
  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 10 + 5;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;
    bubble.style.animationDuration = `${duration}s`;

    section.appendChild(bubble);
  }
});

const lines = [
  "Než tuto stránku zavřete, dejte mi prosím chvíli svého času.",
  "Během několika minut se dozvíte, jak se vyhnout nejčastějším pravopisným chybám. Pravidla, která si společně projdeme, využijete při psaní e-mailu, životopisu i obyčejné zprávy.",
  "Tak prosím! Až po vás. ↓"
];

let lineIndex = 0;
let charIndex = 0;

function typeLine(lineEl, text, callback) {
  if (charIndex < text.length) {
    lineEl.innerHTML += text.charAt(charIndex);
    charIndex++;
    setTimeout(() => typeLine(lineEl, text, callback), 30);
  } else {
    callback();
  }
}

function showNextLine() {
  if (lineIndex >= lines.length) {
    document.getElementById("downIcon").classList.add("bounce-in");
    return;
  }
  const lineEl = document.getElementById(`line${lineIndex + 1}`);
  lineEl.style.display = "block";
  charIndex = 0;
  typeLine(lineEl, lines[lineIndex], () => {
    lineIndex++;
    setTimeout(showNextLine, 400);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const teloElement = document.querySelector('.mobile-nav');

  hamburger.addEventListener('click', () => {
      const isHidden = teloElement.classList.contains('mobile-hidden');

      if (isHidden) {
          teloElement.style.display = 'flex';
          teloElement.classList.add('zobrazeno');
          teloElement.classList.remove('mobile-hidden');
      } else {
          teloElement.classList.add('mobile-hidden');
          teloElement.classList.remove('zobrazeno');
          teloElement.style.display = 'none';
      }
  });
});
