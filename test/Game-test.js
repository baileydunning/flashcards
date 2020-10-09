const chai = require('chai');
const expect = chai.expect;

const data = require('../src/data');
const prototypeQuestions = data.prototypeData;
const Card = require('../src/card');
const Turn = require('../src/turn');
const Deck = require('../src/deck');
const Round = require('../src/round');
const Game = require('../src/game');

describe('Game', function() {
  let game;
  beforeEach(() => {
    game = new Game();
  });

  it('should be a function', function() {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', function() {
    expect(game).to.be.an.instanceof(Game);
  });

  it('should instantiate a current round', function() {
    game.start();
    expect(game.currentRound).to.be.an.instanceof(Round);
  });

  it('should modify data array into an array of the same length', function() {
    game.start();
    expect(game.cards).to.be.an('array');
    expect(game.cards.length).to.deep.equal(prototypeQuestions.length);
  });

  it('should contain a deck', function() {
    game.start();
    expect(game.currentRound.deck).to.be.an.instanceof(Deck);
    expect(game.currentRound.deck.cards[0].correctAnswer).to.deep.equal('object');
  });

  it('should create an instance of card in the deck', function() {
    game.start();
    expect(game.cards[0]).to.be.an.instanceof(Card);
  });

});
