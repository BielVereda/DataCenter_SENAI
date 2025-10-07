// ===== Carrossel de Servidores =====
const servidores = document.querySelectorAll('.carrossel-servidores .servidor');
let atual = 0;

setInterval(() => {
  servidores.forEach((s, i) => s.classList.remove('destaque', 'fundo'));

  servidores[atual].classList.add('fundo');
  servidores[(atual + 1) % servidores.length].classList.add('destaque');
  servidores[(atual + 2) % servidores.length].classList.add('fundo');

  atual = (atual + 1) % servidores.length;
}, 4000);

// ===== Carrossel de Participantes (Carômetro) =====
const participantes = [
  { nome: "Prof. Ricardo", foto: "assets/img/participantes/pessoa1.jpg" },
  { nome: "Fulano da Silva", foto: "assets/img/participantes/pessoa2.jpg" },
  { nome: "Ciclano Souza", foto: "assets/img/participantes/pessoa3.jpg" },
  { nome: "Beltrano Pereira", foto: "assets/img/participantes/pessoa4.jpg" },
  { nome: "Profª Juliana", foto: "assets/img/participantes/pessoa5.jpg" },
  { nome: "Mariana Lima", foto: "assets/img/participantes/pessoa6.jpg" },
  { nome: "Carlos Mendes", foto: "assets/img/participantes/pessoa7.jpg" },
  { nome: "João Ricardo", foto: "assets/img/participantes/pessoa8.jpg" },
  { nome: "Ana Paula", foto: "assets/img/participantes/pessoa9.jpg" },
  { nome: "Gustavo Rocha", foto: "assets/img/participantes/pessoa10.jpg" },
];

const track = document.getElementById('carometroTrack');

// Duplicar lista pra loop infinito
const total = participantes.concat(participantes);
total.forEach(p => {
  const div = document.createElement('div');
  div.classList.add('participante');
  div.innerHTML = `
    <img src="${p.foto}" alt="${p.nome}">
    <p>${p.nome}</p>
  `;
  track.appendChild(div);
});

// Troca aleatória de fotos (pra simular mudança de pessoa)
setInterval(() => {
  const imgs = document.querySelectorAll('.participante img');
  const random = Math.floor(Math.random() * imgs.length);
  const novo = participantes[Math.floor(Math.random() * participantes.length)];
  imgs[random].src = novo.foto;
  imgs[random].nextElementSibling.textContent = novo.nome;
}, 7000);
