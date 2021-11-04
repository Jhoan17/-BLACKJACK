const btnNewGame = document.querySelector('#btnNewGame');
const btnAsk = document.querySelector('#btnAsk');
const btnDetain = document.querySelector('#btnDetain');
const divCards = document.querySelectorAll('.divCards');
const pointSmalls = document.querySelectorAll('.pointSmalls');

let deckCards = [];
let point = [0, 0];
let shift = [];

const fillDeckCards = () => {
  const typesCards = ['C', 'D', 'H', 'S'];
  const lyricsCards = ['J', 'K', 'Q', 'A'];
  for (const typeCard of typesCards) {
    for (let i = 2; i <= 10; i++) {
      deckCards.push(i + typeCard);
    }
    for (const lyricCard of lyricsCards) {
      deckCards.push(lyricCard + typeCard);
    }
  }
  //   console.log(deckCards);
};

const askCard = () => {
  const numberCards = deckCards.length;
  const random = Math.floor(Math.random() * numberCards);
  const card = deckCards[random];
  const count = card.charAt(card.length - 2);
  deckCards.splice(random, 1);

  const point =
    count == 'A'
      ? '11'
      : count == '0' || count == 'J' || count == 'Q' || count == 'K'
      ? '10'
      : count;

  return { card, point };
};

const pointCounter = (pointAsk, shift) => {
  point[shift] = pointAsk + point[shift];
  pointSmalls[shift].innerHTML = point[shift];
  if (shift != 1) {
    if (point[shift] > 21) {
      btnNewGame.disabled = false;
      btnAsk.disabled = true;
      btnDetain.disabled = true;
      computerShift();
      setTimeout(() => {
        validatePoint();
      }, 150);
    }
  }
};

const validatePoint = () => {
  if (point[0] < 21 && point[0] < point[1]) {
    if (point[1] <= 21) {
      alert('Perdiste!!!');
    } else {
      alert('Ganaste!!!');
    }
  } else {
    alert('Perdiste!!!');
  }
};

const paintCard = (card, shift) => {
  const img = document.createElement('img');
  img.src = `assets/img/cartas/${card}.png`;
  img.classList.add('carta');
  img.innerHTML = img;

  divCards[shift].append(img);
};

const computerShift = () => {
  const pointer = point[0] > 21 ? 1 : point[0];
  console.log(pointer);
  while (point[1] <= pointer) {
    const cardPoint = askCard();
    paintCard(cardPoint.card, 1);
    pointCounter(parseInt(cardPoint['point']), 1);
  }
};

const events = () => {
  btnNewGame.addEventListener('click', (event) => {
    deckCards = [];
    point = [0, 0];
    divCards[0].innerHTML = '';
    divCards[1].innerHTML = '';
    pointSmalls[0].innerHTML = 0;
    pointSmalls[1].innerHTML = 0;
    btnNewGame.disabled = true;
    btnAsk.disabled = false;
    btnDetain.disabled = false;
    fillDeckCards();
  });
  btnAsk.addEventListener('click', (event) => {
    // console.log(askCard().card);
    const cardPoint = askCard();
    paintCard(cardPoint['card'], 0);
    pointCounter(parseInt(cardPoint['point']), 0);
  });
  btnDetain.addEventListener('click', (event) => {
    computerShift();
    btnNewGame.disabled = false;
    btnAsk.disabled = true;
    btnDetain.disabled = true;
    setTimeout(() => {
      validatePoint();
    }, 150);
  });
};

export const init = () => {
  events();
};
