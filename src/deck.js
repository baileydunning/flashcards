const Card = require('../src/card');

class Deck {
  constructor(cards) {
    const card1 = new Card(1, 'What does the "R" stand for in Roy G. Biv?', ['red', 'retro', 'razzle dazzle'], 'red');
    const card2 = new Card(2, 'What is the capitol of Minnesota?', ['Minneapolis', 'Duluth', 'St. Paul'], 'St. Paul');
    const card3 = new Card(3, 'Which ocean is the Bermuda Triangle located in?', ['Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'], 'Atlantic Ocean');
    const card4 = new Card(4, 'Which country occupies half of South America\'s western coast?', ['Argentina', 'Venezuela', 'Chile'], 'Chile');
    this.cards = cards || [card1, card2, card3, card4]
  };

  countCards() {
    return this.cards.length
  };
};

module.exports = Deck;
