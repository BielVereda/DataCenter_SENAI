// ===================== MENU HAMBURGUER =====================
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

let isMenuOpen = false;
let animating = false;

if (menuBtn && navLinks) {
  const iconImg = menuBtn.querySelector("img");

  menuBtn.addEventListener("click", () => {
    if (animating) return;
    animating = true;

    iconImg.style.transition = "transform 0.15s, opacity 0.15s";

    if (!isMenuOpen) {
      // Abrindo menu
      navLinks.style.display = "flex";
      requestAnimationFrame(() => {
        navLinks.classList.add("show");

        // Fade out da seta antiga
        iconImg.style.transform = "translateY(10px)";
        iconImg.style.opacity = "0";

        setTimeout(() => {
          iconImg.src = "assets/img/arrow.svg";
          // Força o browser aplicar a mudança de src antes do fade in
          requestAnimationFrame(() => {
            iconImg.style.transform = "translateY(0)";
            iconImg.style.opacity = "1";
          });
        }, 300);
      });

      setTimeout(() => animating = false, 350);

    } else {
      // Fechando menu
      navLinks.classList.remove("show");

      // Fade out da seta
      iconImg.style.transform = "translateY(10px)";
      iconImg.style.opacity = "0";

      setTimeout(() => {
        // Troca o src **após o fade out** e força o fade in
        iconImg.src = "assets/img/menu_hamburger.svg";
        requestAnimationFrame(() => {
          iconImg.style.transform = "translateY(0)";
          iconImg.style.opacity = "1";
        });
      }, 300);

      setTimeout(() => {
        navLinks.style.display = "none";
        animating = false;
      }, 350);
    }

    isMenuOpen = !isMenuOpen;
  });

  // Fecha se clicar fora
  document.addEventListener("click", (e) => {
    if (isMenuOpen && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      menuBtn.click();
    }
  });
}

// ===================== CARROSSEL DE HACKS =====================
const container = document.querySelector(".hack-container");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let hacks = Array.from(document.querySelectorAll(".hack"));
let total = hacks.length;
let current = 0; // agora o primeiro servidor é o inicial

function atualizarCarrossel() {
  hacks.forEach((h, i) => {
    h.classList.remove("destaque");
    h.style.opacity = "0.6";
    h.querySelector("img").src = "assets/img/hack_cinza.svg";
  });

  const ativo = hacks[current];
  ativo.classList.add("destaque");
  ativo.style.opacity = "1";
  ativo.querySelector("img").src = "assets/img/hack_vermelho.svg";

  const hackWidth = ativo.offsetWidth + parseInt(getComputedStyle(container).gap || 0);
  const containerWidth = container.offsetWidth;
  const desloc = -(hackWidth * current - containerWidth / 2 + hackWidth / 2);
  container.style.transform = `translateX(${desloc}px)`;
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % total;
  atualizarCarrossel();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + total) % total;
  atualizarCarrossel();
});

hacks.forEach((h, i) => {
  h.addEventListener("click", () => {
    if (i !== current) current = i;
    atualizarCarrossel();
  });
});

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

participantes.forEach((p, i) => {
  const div = document.createElement("div");
  div.classList.add("participante");
  div.style.transform = `rotateY(${(360 / totalP) * i}deg) translateZ(300px)`;
  div.innerHTML = `<img src="${p.foto}" alt="${p.nome}"><p>${p.nome}</p>`;
  carometro.appendChild(div);
});

setInterval(() => {
  angulo += 360 / totalP;
  document.querySelectorAll(".participante").forEach((el, i) => {
    el.style.transform = `rotateY(${(360 / totalP) * i - angulo}deg) translateZ(300px)`;
    const rot = ((360 / totalP) * i - angulo) % 360;
    el.classList.toggle("tras", rot > 180 && rot < 360);
  });
}, 2500);

const wrapper = document.querySelector('.carometro-wrapper');
const btnPrev = document.querySelector('.caro-btn.prev');
const btnNext = document.querySelector('.caro-btn.next');


  // Rolagem automática
  let scrollPosition = 0;
  setInterval(() => {
    scrollPosition += 100;
    wrapper.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });

    if (scrollPosition >= wrapper.scrollWidth - wrapper.clientWidth) {
      scrollPosition = 0;
    }
  }, 1800);

// ===================== AJUSTE DINÂMICO DO CARÔMETRO =====================
function ajustarRaioCarometro() {
  const carometro = document.querySelector('.carometro');
  const participantes = document.querySelectorAll('.participante');

  if (!carometro || participantes.length === 0) return;

  const larguraTela = window.innerWidth;
  let raioBase = 300; // valor original

  // ajusta o raio conforme o tamanho da tela
  if (larguraTela < 380) raioBase = 120;
  else if (larguraTela < 500) raioBase = 150;
  else if (larguraTela < 700) raioBase = 200;
  else if (larguraTela < 900) raioBase = 250;

  participantes.forEach(part => {
    part.style.transformOrigin = `center center -${raioBase}px`;
  });
}

// executa ao carregar e ao redimensionar
window.addEventListener('load', ajustarRaioCarometro);
window.addEventListener('resize', ajustarRaioCarometro);