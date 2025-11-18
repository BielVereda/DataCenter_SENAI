// ===================== HACKS SUAVE (VERSÃO ANTIGA) =====================
const container = document.querySelector(".hack-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let hacks = Array.from(document.querySelectorAll(".hack"));
let total = hacks.length;
let current = 0;

const cardContainers = document.querySelectorAll(".card-container");

// Atualiza o carrossel e define o item ativo
function atualizarCarrossel() {
  hacks.forEach((h, i) => {
    h.classList.remove("destaque");
    h.style.opacity = "0.6";
    h.querySelector("img").src = "./assets/img/racks/rack_cinza.svg";
  });

  const ativo = hacks[current];
  ativo.classList.add("destaque");
  ativo.style.opacity = "1";
  ativo.querySelector("img").src = "./assets/img/racks/rack_vermelho.svg";

  const hackWidth = ativo.offsetWidth + parseInt(getComputedStyle(container).gap || 0);
  const containerWidth = container.offsetWidth;
  const desloc = -(hackWidth * current - containerWidth / 2 + hackWidth / 2);

  // 👉 aplica direto o deslocamento (sem animação suave)
  container.style.transform = `translateX(${desloc}px)`;
}

// Botões de navegação
nextBtn.addEventListener("click", () => {
  current = (current + 1) % total;
  atualizarCarrossel();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + total) % total;
  atualizarCarrossel();
});

// Clique direto nos hacks
hacks.forEach((h, i) => {
  h.addEventListener("click", () => {
    if (i !== current) current = i;
    atualizarCarrossel();
  });
});

// Flip dos cards
cardContainers.forEach((container) => {
  container.addEventListener("click", () => {
    container.classList.toggle("flipped");
  });
});

// Inicialização
atualizarCarrossel();