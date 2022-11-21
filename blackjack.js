// use the getDeck() function from createCardDeck()
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
          val = 10;
          break;
        case j == 12:
          valName = "Queen";
          val = 10;
          break;
        case j == 13:
          valName = "King";
          val = 10;
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

const blackjackDeck = getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  drawCard() {
    const deck = getDeck();
    const randomCard = deck[Math.floor(Math.random() * 52)];
    this.hand.push(randomCard);
  }

};

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer");
const player = new CardPlayer("Player");

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  let handTotal = 0;
  let handIsSoft = false;
  const blackJackScore = {
    total: 0,
    isSoft: false
  };

  // check if there are aces in hand
  let filteredAces = hand.filter((card) => (card.displayVal === "Ace") && (card.val === 11));
  
  console.log(`This is number of filtered Aces ${filteredAces.length}`);

  // if only 1 ace
  if(filteredAces.length == 1) {
    handIsSoft = true;
  }
  // if more than 1 ace
  else if(filteredAces.length > 1) {
    handIsSoft = true;
    // change ace card value to 1
    for(let i = 1; i < filteredAces.length; i++) {
      filteredAces[i].val = 1;
    }
  }

  for(card of hand) {
    handTotal += card.val;
  }

  blackJackScore.total = handTotal;
  blackJackScore.isSoft = handIsSoft;

  return blackJackScore;
}

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  let total = 0;

  // calc total
  for(card of dealerHand) {
    total += card.val;
  }
  // if dealer less than 16 points, should draw
  if(total < 16) {
    return true;
  }
  // if dealer equal 17 points, check for ace
  if(total == 17) {

    return true;
  }

  // by default: dealer higher than 17, hold and no draw
  return false;
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => {
  return (playerScore === dealerScore ? "It's a tie." : playerScore > dealerScore ? `Winner is ${playerScore}` : `Winner is ${dealerScore}`);
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();
  

  const readline = require("readline");
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });


  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && rl.question(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  // while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
  //   player.drawCard();
  //   playerScore = calcPoints(player.hand).total;
  //   showHand(player);
  // }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());