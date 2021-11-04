const btnNewGame = document.querySelector('#btnNewGame'),
  btnAsk = document.querySelector('#btnAsk'),
  btnDetain = document.querySelector('#btnDetain'),
  divCards = document.querySelectorAll('.divCards'),
  pointSmalls = document.querySelectorAll('.pointSmalls');

let deckCards = [];
let point = [];

const fillPlayer = (player = 2) => {
  for (let i = 0; i < player; i++) {
    point.push(0);
  }
};

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
  setTimeout(() => {
    pointSmalls[shift].innerHTML = point[shift];
  }, 200);
};

const validatePoint = () => {
  setTimeout(() => {
    if (point[0] === point[1]) {
      alert('Empate!!!');
    } else if (point[0] > 21) {
      alert('Perdiste!!!');
    } else if (point[1] > 21) {
      alert('Ganaste!!!');
    } else {
      alert('Perdiste!!!');
    }
  }, 200);
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

  while (point[1] <= pointer) {
    const cardPoint = askCard();
    paintCard(cardPoint.card, 1);
    pointCounter(parseInt(cardPoint['point']), 1);
  }
};

const newGame = () => {
  deckCards = [];
  point = [];
  divCards[0].innerHTML = '';
  divCards[1].innerHTML = '';
  pointSmalls[0].innerHTML = 0;
  pointSmalls[1].innerHTML = 0;
  btnNewGame.disabled = true;
  btnAsk.disabled = false;
  btnDetain.disabled = true;
  fillDeckCards();
  fillPlayer(2);
};

const events = () => {
  btnNewGame.addEventListener('click', (event) => {
    newGame();
  });
  btnAsk.addEventListener('click', (event) => {
    const cardPoint = askCard();
    paintCard(cardPoint['card'], 0);
    pointCounter(parseInt(cardPoint['point']), 0);
    btnDetain.disabled = false;

    if (point[0] >= 21) {
      validatePoint();
      computerShift();
      btnNewGame.disabled = false;
      btnAsk.disabled = true;
      btnDetain.disabled = true;
    }
  });
  btnDetain.addEventListener('click', (event) => {
    computerShift();
    btnNewGame.disabled = false;
    btnAsk.disabled = true;
    btnDetain.disabled = true;
    validatePoint();
  });
};

export const init = () => {
  events();
};
