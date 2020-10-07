const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/card');
const Turn = require('../src/turn');
const Deck = require('../src/deck');

describe('Deck', function() {

  it('should be a function', function() {
    const deck = new Deck();

    expect(Deck).to.be.a('function');
  });
});
