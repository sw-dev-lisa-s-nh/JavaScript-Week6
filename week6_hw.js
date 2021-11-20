// *********************************
// JavaScript Week6 -- Game of War
// *********************************

// *********************
//      Deck class
// *********************

class Deck {
    constructor() {
        this.cards = [];
    }

    populateCards() {
        var newDeck = []
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
                newDeck.push(card);
            }
        }
        return newDeck;
    }

    describe() {
        var counter = 1;
        for (let card of this.cards) {
            console.log(`${counter}) ${card.describe()}`);
            counter++;
            // debug code:
            //      card.describe();
        }
    }


}

// *********************
//      Card class
// *********************
class Card {
    constructor(suit, value, description, representation) {
        this.suit = suit;
        this.value = value;
        this.description = description;
        this.representation = representation;
    }

    describe() {
        // debug code:
        //      console.log(`The ${this.description} has a value of ${this.value}`);
        return(`the ${this.description} has a value of ${this.value} ${this.representation}`);
    }

   
}

// *********************
//      Player class
// *********************
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
        // debug code:
        //      console.log(`Player ${this.name} has a score of ${this.score}`);
        return `\t${this.name} has a score of ${this.score}`;
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

    getName() {
        return this.name;
    }
}

// *********************
//      PlayGame class
// *********************
class PlayGame {
    constructor() {
        this.selectedDeck = [];
    }
    
    // START OF GAME
    // Call this method to start the game!
    start() {
        // Instatiate a deck!
        let deck = new Deck();
        // Populate a Deck with 52 cards and then sort them.
        deck.cards = deck.populateCards();
        console.log("\n------------------------------------\n");
        console.log("     SORTED DECK ");
        console.log("------------------------------------\n");
        // Sort the Deck
        deck.cards.sort((a,b) => 0.5 - Math.random());
        // debug code:
        //      deck.describe();
        console.log(`Deck has ${deck.cards.length} cards!`);


        //  Prompt for userNames, and set to defaults if not provided!
        let player1Name = prompt("The name for Player 1 is: ", "Player 1");
        if (player1Name == null) {
            player1Name = "Player 1";
        }

        let player2Name = prompt("The name for Player 2 is: ", "Player 2");
        if (player2Name == null) {
            player2Name = "Player 2";
        }

        //Instatiate the players (player1 and player2)
        let player1 = new Player(player1Name);
        let player2 = new Player(player2Name);

        // ANNOUNCE:  Start Of Game in the console.
        console.log(`The game is starting with ${player1Name} and ${player2Name}`);

        // Deal the deck to both players
        for (let index = 0; index < 26; index++) {
            player1.draw(deck);
            player2.draw(deck);
        }

        // ANNOUNCE:  Start of Game in an ALERT!
        alert(`
        --------------------------------------------
        Starting the GAME OF WAR: with 2 Players:
        --------------------------------------------
        ${player1.describe()} 
        \t\tAND
        ${player2.describe()}
        --------------------------------------------`);

        // debug code:
        // console.log(`Player 1: ${player1.describe()}`);
        // for (let card of player1.hand) {
        //     console.log(`${card.describe()}`);
        // }

        // debug code:
        // console.log(`Player 2: ${player2.describe()}`);
        // for (let card of player2.hand) {
        //     console.log(`${card.describe()}`);
        // }


        // Each player has 26 cards == The game is 26 rounds!
        for (let index = 0; index < 26; index++) {
            // Each player flips a card
            let player1Card = player1.flip();
            let player2Card = player2.flip();

            // debug code: 
            //      console.log(player1Card);
            //      console.log(player2Card);
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
                // debug code:
                //      console.log('No score -- cards are equal!');
            }

            // Print the result of each hand out to the console!
            console.log(`
            ${player1.name} has ${player1Card.describe()} 
                        VS. 
                ${player2.name} has ${player2Card.describe()}
            ---------------------------------------------------------
                    ${win}
            `);
        } // End of for loop for the 26 turns!

        // END OF GAME
        // Compare final score, and set the winner variable!
        if (player1.score > player2.score) {
            var winner = `The WINNER is: ${player1.name}!`
        } else if (player2.score > player1.score) {
            var winner = `The WINNER is: ${player2.name}!`
        } else {
            var winner = `This GAME OF WAR is a draw!`;
        }

        // Announce the winner in the console
        console.log(`--------------------------------------------
        The game has ended.
        \t${player1.describe()}
        \t${player2.describe()}
        The game has ended.  ${winner}
        --------------------------------------------`);

        // Announce the winner in an alert as well!
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
    }
} 


// START THE GAME
let playGame = new PlayGame();
playGame.start();
