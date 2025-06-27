const generateDeck = () =>{
    const deckLength = 52;
    const suits = ["diamonds","clubs","hearts","spades"];
    const values = [  "2", "3", "4","5","6","7","8","9","10","J","Q","K","A"];
    const deck = []; 
    for ( let suit of suits){
        for (let value of values){
            deck.push({ suit,value});
        }}
    
    for (let i = deckLength -1; i>0 ; i-- ){
        const j = Math.floor(Math.random() * (i + 1) );
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

const distributeCards = (game) =>{
    let deck = game.gameState.deck;
    for (const player of game.players){
        player.hand.push(deck.pop())
        player.hand.push(deck.pop())
    }
}

module.exports = { generateDeck , distributeCards } ;
