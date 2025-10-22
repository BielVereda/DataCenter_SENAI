const carrossels = document.querySelectorAll('.carrossel-container');

carrossels.forEach(container => {
  const carrossel = container.querySelector('.carrossel');
  const nextBtn = container.querySelector('.next');
  const prevBtn = container.querySelector('.prev');
  let index = 0;

  function atualizarCarrossel() {
    const cardWidth = carrossel.querySelector('.card').offsetWidth + 20;
    carrossel.style.transform = `translateX(${-index * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if(index < carrossel.children.length - Math.floor(container.offsetWidth / (carrossel.children[0].offsetWidth + 20))) {
      index++;
      atualizarCarrossel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if(index > 0){
      index--;
      atualizarCarrossel();
    }
  });

  window.addEventListener('resize', atualizarCarrossel);
});