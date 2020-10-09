const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/card');
const Turn = require('../src/turn');
const Deck = require('../src/deck');
const Round = require('../src/round');

describe('Round', function() {
  let round;
  beforeEach(() => {
    card1 = new Card(1,
      'What does the "R" stand for in Roy G. Biv?',
      ['red', 'retro', 'razzle dazzle'],
      'red');
    card2 = new Card(2,
      'What is the capitol of Minnesota?',
      ['Minneapolis', 'Duluth', 'St. Paul'],
      'St. Paul');
    card3 = new Card(3,
      'Which ocean is the Bermuda Triangle located in?',
      ['Pacific Ocean', 'Atlantic Ocean', 'Arctic Ocean'],
      'Atlantic Ocean');
    card4 = new Card(4,
      'Which country occupies half of South America\'s western coast?',
      ['Argentina', 'Venezuela', 'Chile'],
      'Chile');
    round = new Round([card1, card2, card3, card4]);
  });

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should start with no incorrect guesses', function() {
    expect(round.incorrectGuesses).to.deep.equal([]);
  });

  it('should contain a deck', function(){
    expect(round.deck).to.be.an.instanceof(Deck);
  });

  it('should have a current card', function() {
    expect(round.currentCard.id).to.deep.equal(1);
  });

  it('should make the first card in the deck the current card', function() {
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

  it('should remove the card from the deck', function() {
    expect(round.deck.cards.length).to.deep.equal(4);
    round.takeTurn('red');
    expect(round.deck.cards.length).to.deep.equal(3);
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

  it('should end the round', function() {
    round.takeTurn('razzle dazzle');
    round.takeTurn('St. Paul');
    round.takeTurn('Atlantic Ocean');
    round.takeTurn('Chile');
    round.endRound();
    expect(round.calculatePercentCorrect()).to.deep.equal(75);
    expect(round.active).to.deep.equal(false);
  });
});
