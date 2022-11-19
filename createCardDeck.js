/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const cards = [];

  for(let i = 0; i < suits.length; i++) {
    for(let j = 1; j <= 13; j++) {
      let val = "";
      let valName = "";
      let card;

      switch(true) {
        case j === 1:
          valName = "Ace";
          break;
        case j > 1 && j <= 10:
          valName = j;
          val = j;
          break;
        case j == 11:
          valName = "Jack";
          break;
        case j == 12:
          valName = "Queen";
          break;
        case j == 13:
          valName = "King";
          break;
        default:
          break;
      }
      card = {
        val: j,
        displayVal: valName,
        suit: suits[i],
      };

      if(valName === "Ace") {
        card.val = 11;
      }

      cards.push(card);
    }
  }
  return cards;
}


// CHECKS
const deck = getDeck();
console.log(`Deck length equals 52? ${deck.length === 52}`);

const randomCard = deck[Math.floor(Math.random() * 52)];

const cardHasVal = randomCard && randomCard.val && typeof randomCard.val === 'number';
console.log(`Random card has val? ${cardHasVal}`);

const cardHasSuit = randomCard && randomCard.suit && typeof randomCard.suit === 'string';
console.log(`Random card has suit? ${cardHasSuit}`);

const cardHasDisplayVal = randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string';
console.log(`Random card has display value? ${cardHasDisplayVal}`);
