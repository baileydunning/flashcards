const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/card');
const Deck = require('../src/deck');

describe('Deck', function() {
  let deck;

  beforeEach(function() {
    deck = new Deck();
  });

  it('should be a function', function() {
    expect(Deck).to.be.a('function');
  });

  it('should be an instance of Deck', function() {
    expect(deck).to.be.an.instanceof(Deck);
  });

  it('should contain an array of cards by default', function() {
    expect(deck.cards).to.be.an('array');
    expect(deck.cards.length).to.deep.equal(4);
  });

  it('should be able to have arguments passed in', function() {
    const card2 = new Card(2, 'What is the capitol of Minnesota?', ['Minneapolis', 'Duluth', 'St. Paul'], 'St. Paul');
    const card4 = new Card(4, 'Which country occupies half of South America\'s western coast?', ['Argentina', 'Venezuela', 'Chile'], 'Chile');
    const deck2 = new Deck([card2, card4]);

    expect(deck2.cards[0].correctAnswer).to.deep.equal('St. Paul');
    expect(deck2.cards.length).to.deep.equal(2);
  });

  it('should be able to count cards', function() {
    const card2 = new Card(2, 'What is the capitol of Minnesota?', ['Minneapolis', 'Duluth', 'St. Paul'], 'St. Paul');
    const card4 = new Card(4, 'Which country occupies half of South America\'s western coast?', ['Argentina', 'Venezuela', 'Chile'], 'Chile');
    const deck2 = new Deck([card2, card4]);

    expect(deck.countCards()).to.deep.equal(4);
    expect(deck2.countCards()).to.deep.equal(2);
  });


});
