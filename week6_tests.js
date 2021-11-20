// imports the chai expect method
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;

// takes a "name", and a function that sets up the test
describe('LisasWeek6Functions', function() {
    describe('#populateCards', function() {

        it('should create a 52 card array', function() {
            // actual call to function
            var deck = new Deck();
            var cards = deck.populateCards();
            expect(cards).length(52);
        });

        it('should create 4 of each card value', function() {
            // create an array with a place for each card value.
            var cardCount = [0,0,0,0,0,0,0,0,0,0,0,0,0];
            var deck = new Deck();
            var cards = deck.populateCards();
            // count each value, and increment the array position
            for (let card of cards) {
                cardCount[card.value-2]++;
            };
            var number = cardCount.reduce(function(previous,current) {
                return previous + current;
            }, 0);
            number = number/13;
            expect(number).to.equals(4);
        });

        it('should create 13 of each suit value', function() {
            // create an array with a place for each card value.
            var heartCount = 0;
            var spadeCount = 0;
            var clubCount = 0;
            var diamondCount = 0;
            var deck = new Deck();
            var cards = deck.populateCards();
            // count each value, and increment the array position
            for (let card of cards) {
                if (card.suit == "Hearts") {
                    heartCount++;
                } else if (card.suit == "Spades") {
                    spadeCount++;
                } else if (card.suit == "Diamonds") {
                    diamondCount++;
                } else if (card.suit == "Clubs") {
                    clubCount++;
                }
            };
            expect(heartCount).to.equals(13);
            expect(spadeCount).to.equals(13);
            expect(clubCount).to.equals(13);
            expect(diamondCount).to.equals(13);
        });

        it('should throw an error if Player(1234).getName does not return a String', function() {
            expect(function() {
                const newPlayer = new Player(1234);
                assert.typeOf(newPlayer.getName(),'string');
            }).to.throw(Error);
        });
    });

});