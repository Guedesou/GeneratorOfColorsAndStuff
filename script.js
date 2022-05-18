let allTheColors = [];
let animationDuration = 1400; //ms

const createCard = (
color = '#0022ff',
name = 'Toxic Blue') =>
{
  const $wrap = document.createElement('a');
  $wrap.setAttribute('href', `https://parrot.color.pizza/color/${color.substring(1)}/%E2%9D%A4`);
  $wrap.setAttribute('target', '_blank');

  const $head = document.createElement('header');
  const $color = document.createElement('div');
  const $upperPart = document.createElement('div');

  const $colorName = document.createElement('h2');
  const $colorValue = document.createElement('var');

  $colorName.classList.add('color__name');
  $colorValue.classList.add('color__value');
  $colorValue.textContent = color;
  $colorName.textContent = name;

  const logo = `<strong class="color__brand">Color Parrot</strong><svg class="color__logo" viewBox="0 0 180 180"><use href="#logo" /></svg>`;
  $upperPart.innerHTML = logo;

  $wrap.classList.add('color');
  $head.classList.add('color__bottom');
  $upperPart.classList.add('color__top');
  $color.classList.add('color__swatch');

  $head.appendChild($colorValue);
  $head.appendChild($colorName);

  [$head, $color, $upperPart].forEach($el => $wrap.appendChild($el));

  $wrap.style.setProperty('--color', color);

  return $wrap;
};

const $wrap = document.querySelector('[data-wrap]');

const addRandomCard = colorList => {
  const l = colorList.length;
  const index = Math.floor(Math.random() * colorList.length);
  const { name, hex } = colorList[index];
  const $card = createCard(hex, name);
  const $cardTop = $card.cloneNode(true);

  $cardTop.classList.add('color--top');

  $wrap.appendChild(
  $card);

  $wrap.appendChild(
  $cardTop);


  setTimeout(() => {
    $card.remove();
    $cardTop.remove();
  }, 20100);
};

fetch('https://api.color.pizza/v1/?goodnamesonly=true').
then(d => d.json()).
then(data => {
  allTheColors = data;
  setInterval(() =>
  addRandomCard(data.colors),
  animationDuration);

});

const $btn = document.querySelector('[data-togglelight]');

$btn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  $btn.toggleAttribute('aria-pressed');
});

const $btnSlnt = document.querySelector('[data-toggleslant]');

$btnSlnt.addEventListener('click', () => {
  document.documentElement.classList.toggle('slantback');
  $btnSlnt.toggleAttribute('aria-pressed');
});