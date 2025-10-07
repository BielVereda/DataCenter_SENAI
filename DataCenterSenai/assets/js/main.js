// ===================== CARROSSEL DE HACKS =====================
const container = document.querySelector(".hack-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let hacks = Array.from(document.querySelectorAll(".hack"));
let total = hacks.length;
let current = 2; // servidor central inicial

function atualizarCarrossel() {
  // Reset visual de todos
  hacks.forEach((h, i) => {
    h.classList.remove("destaque");
    h.style.opacity = "0.6";
    h.querySelector("img").src = "assets/img/hack_cinza.svg";
  });

  // Destacar servidor central
  const ativo = hacks[current];
  ativo.classList.add("destaque");
  ativo.style.opacity = "1";
  ativo.querySelector("img").src = "assets/img/hack_vermelho.svg";

  // Centralizar hack ativo
  const hackWidth = ativo.offsetWidth + parseInt(getComputedStyle(container).gap || 0);
  const containerWidth = container.offsetWidth;
  const desloc = -(hackWidth * current - containerWidth / 2 + hackWidth / 2);
  container.style.transform = `translateX(${desloc}px)`;
}

// Navegação
nextBtn.addEventListener("click", () => {
  current = (current + 1) % total;
  atualizarCarrossel();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + total) % total;
  atualizarCarrossel();
});

// Clique direto no hack
hacks.forEach((h, i) => {
  h.addEventListener("click", () => {
    if (i !== current) current = i;
    atualizarCarrossel();
  });
});

// Inicialização
atualizarCarrossel();


// ===================== CARÔMETRO 3D =====================
const participantes = [
  { nome: "Prof. Ricardo", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Fulano da Silva", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Ciclano Souza", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Beltrano Pereira", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Profª Juliana", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Mariana Lima", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Carlos Mendes", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Ana Paula", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "Gustavo Rocha", foto: "assets/img/participantes/pessoa.svg" },
  { nome: "João Ricardo", foto: "assets/img/participantes/pessoa.svg" },
];

const carometro = document.getElementById("carometro");
let angulo = 0;
const totalP = participantes.length;

// Criar participantes
participantes.forEach((p, i) => {
  const div = document.createElement("div");
  div.classList.add("participante");
  div.style.transform = `rotateY(${(360 / totalP) * i}deg) translateZ(300px)`;
  div.innerHTML = `<img src="${p.foto}" alt="${p.nome}"><p>${p.nome}</p>`;
  carometro.appendChild(div);
});

// Rotação contínua
setInterval(() => {
  angulo += 360 / totalP;
  document.querySelectorAll(".participante").forEach((el, i) => {
    el.style.transform = `rotateY(${(360 / totalP) * i - angulo}deg) translateZ(300px)`;
    const rot = ((360 / totalP) * i - angulo) % 360;
    el.classList.toggle("tras", rot > 180 && rot < 360);
  });
}, 2500);