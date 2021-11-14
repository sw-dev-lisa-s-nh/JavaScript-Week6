// *********************************
// JavaScript Week6 -- Game of War
// *********************************

class Deck {
    constructor() {
        this.cards = [];
    }

    populateCards() {
        var suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
        var values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        var descriptions = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
        for (let suit of suits) {
            var representation = '';
            const blackHeart = '\u2665';
            const blackspade = '\u2660';
            const blackclub = '\u2663';
            const blackdiamond = '\u2666';
            if (suit == "Hearts") {
                representation = blackHeart;
            } else if  (suit == "Spades") {
                representation = blackspade;
            } else if  (suit == "Diamonds") {
                representation = blackdiamond;
            } else if  (suit == "Clubs") {
                representation = blackclub;
            }
            for (let index = 0; index < values.length; index++) {
                let card = new Card(suit, values[index], `${descriptions[index]} of ${suit}`, representation);
                this.cards.push(card);
            }
        }

        this.cards
    }

    describe() {
        var counter = 1;
        for (let card of this.cards) {
            console.log(`${counter}) ${card.describe()}`);
            counter++;
            //card.describe();
        }
    }


}


class Card {
    constructor(suit,value,description, representation) {
        this.suit = suit;
        this.value = value;
        this.description = description;
        this.representation = representation;
    }

    describe() {
        //console.log(`The ${this.description} has a value of ${this.value}`);
        return(`the ${this.description} has a value of ${this.value} ${this.representation}`);
    }

   
}

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.hand = [];
    }

    incrementScore() {
        this.score++;
    }

    describe() {
        //  do I want to return this, or console.log this??
        // console.log(`Player ${this.name} has a score of ${this.score}`);
        return `Player: ${this.name} has a score of ${this.score}`;
    }

    flip() {
        return this.hand.shift()
    }

    draw(deck) {
        this.hand.push(deck.cards.shift());
    }

    setsScore(score) {
        this.score = score;
    }

    getScore() {
        return this.score;
    }
}

// START OF GAME
// Populate a Deck with 52 cards and then sort them.
let deck = new Deck();
deck.populateCards();
console.log("\n------------------------------------\n");
console.log("     SORTED DECK ");
console.log("------------------------------------\n");
deck.cards.sort((a,b) => 0.5 - Math.random());
//deck.describe();
console.log(`Deck has ${deck.cards.length} cards!`);


// I'd like to prompt the user for the names???
let player1 = new Player(prompt("The name for Player 1 is: ", "Player 1"));
let player2 = new Player(prompt("The name for Player 2 is: ", "Player 2"));


// deal the deck to both players
for (let index = 0; index < 26; index++) {
    player1.draw(deck);
    player2.draw(deck);
}

alert(`
--------------------------------------------
  Starting the GAME OF WAR: with 2 Players:
--------------------------------------------
${player1.describe()} 
\t\tAND
${player2.describe()}
--------------------------------------------`);

// console.log(`Player 1: ${player1.describe()}`);
// for (let card of player1.hand) {
//     console.log(`${card.describe()}`);
// }

// console.log(`Player 2: ${player2.describe()}`);
// for (let card of player2.hand) {
//     console.log(`${card.describe()}`);
// }


// Each player flips a card
for (let index = 0; index < 26; index++) {
    let player1Card = player1.flip();
    let player2Card = player2.flip();

   
    console.log(player1Card);
    console.log(player2Card);
    var win;
    // Compare the value
    // increment the score of the card with the highest value
    if (player1Card.value > player2Card.value) {     
        player1.incrementScore();
        win = `Point goes to ${player1.name}!`;
    } else if (player2Card.value > player1Card.value) {
        player2.incrementScore();
        win = `Point goes to ${player2.name}!`;
    } else {
        win = `No score -- cards are equal!`;
        console.log('No score -- cards are equal!');
    }
    alert(`
    ${player1.name} has ${player1Card.describe()} 
                VS. 
        ${player2.name} has ${player2Card.describe()}
    ---------------------------------------------------------
            ${win}
    `)
}

if (player1.score > player2.score) {
    var winner = `The WINNER is: ${player1.name}!`
} else if (player2.score > player1.score) {
    var winner = `The WINNER is: ${player2.name}!`
} else {
    var winner = `This GAME OF WAR is a draw!`;
}


// END OF GAME

alert(`
--------------------------------------------
         The GAME OF WAR is over:
--------------------------------------------
\t${winner}
--------------------------------------------
${player1.describe()} 
\t\t AND
${player2.describe()}
--------------------------------------------`);
