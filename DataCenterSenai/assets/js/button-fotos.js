const botao = document.getElementById('meuBotao');

botao.addEventListener('mouseover', () => {
  botao.src = 'botao-hover.png';
});

botao.addEventListener('mouseout', () => {
  botao.src = 'botao.png';
});