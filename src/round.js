const Turn = require('../src/turn');
const Deck = require('../src/deck');
// const Game = require('../src/game');

class Round {
  constructor(deck) {
    this.deck = new Deck(deck);
    this.currentCard = this.deck.cards[0];
    this.turns = 0;
    this.incorrectGuesses = [];
    this.active = true;
  };

  returnCurrentCard() {
    return this.currentCard;
  };

  takeTurn(guess) {
    this.turns++;
    this.turn = new Turn(guess, this.currentCard);
    if (this.turn.guess !== this.currentCard.correctAnswer) {
      this.incorrectGuesses.push(this.currentCard.id);
    };
    this.deck.cards.splice(0, 1);
    this.currentCard = this.deck.cards[0];
    return this.turn.giveFeedback();
  };

  calculatePercentCorrect() {
    let correctGuesses = this.turns - this.incorrectGuesses.length
    return (correctGuesses / this.turns) * 100;
  };

  endRound() {
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`)
    this.active = false;
  };
};

module.exports = Round;
