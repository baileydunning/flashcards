const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/card');
const Turn = require('../src/turn');
const Deck = require('../src/deck');
const Round = require('../src/round');

describe('Round', function() {
  let round;
  beforeEach(() => {
    round = new Round()
  });

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should contain a deck', function(){
    expect(round.deck).to.be.an.instanceof(Deck);
  });

  it('should have a current card', function() {
    expect(round.currentCard.id).to.deep.equal(1);
    expect(round.deck.cards[0] === round.currentCard).to.deep.equal(true);
  });

  it('should return the current card', function() {
    expect(round.returnCurrentCard()).to.deep.equal(round.currentCard);
    expect(round.returnCurrentCard()).to.be.an.instanceof(Card);
  })

  it('should add to the turn count', function() {
    round.takeTurn('razzle dazzle');
    expect(round.turns).to.deep.equal(1);
  });

  it('should create a new Turn instance when a guess is made', function() {
    round.takeTurn('red');
    expect(round.turn).to.be.an.instanceof(Turn);
    expect(round.turn.guess).to.deep.equal('red');
  });

  it('should make the next card the current card', function() {
    round.takeTurn('red');
    expect(round.deck.cards[0].id).to.deep.equal(2);
  });

  it('should evaluate the guess and give feedback', function() {
    round.takeTurn('retro');
    expect(round.turn.evaluateGuess()).to.deep.equal(false);
    expect(round.turn.giveFeedback()).to.deep.equal('incorrect!');

    round.takeTurn('St. Paul');
    expect(round.turn.evaluateGuess()).to.deep.equal(true);
    expect(round.turn.giveFeedback()).to.deep.equal('correct!');
  });

  it('should store incorrect guesses', function() {
    round.takeTurn('razzle dazzle');
    expect(round.incorrectGuesses.length).to.deep.equal(1);
    round.takeTurn('St. Paul');
    expect(round.incorrectGuesses.length).to.deep.equal(1);
  });

  it('should return feedback', function() {
    expect(round.takeTurn('red')).to.deep.equal('correct!')
    expect(round.takeTurn('Minneapolis')).to.deep.equal('incorrect!')
  });

  it('should calculate the percentage of correct answers', function() {
    round.takeTurn('red');
    round.takeTurn('Duluth');
    round.takeTurn('Arctic Ocean');
    round.takeTurn('Argentina');
    expect(round.calculatePercentCorrect()).to.deep.equal(25);
  });

  it('should interpolate the correct percentage into the logged statement', function() {
    round.takeTurn('razzle dazzle');
    round.takeTurn('St. Paul');
    round.takeTurn('Atlantic Ocean');
    round.takeTurn('Chile');
    round.endRound();
    expect(round.calculatePercentCorrect()).to.deep.equal(75);
  });
});
