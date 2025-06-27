const { generateDeck , distributeCards } = require("./deckMiddleware");
const { changeBet } = require("./roundMiddleware");
const roundStart = (game,io) =>{
    players = game.players;
    game.gameState.deck = generateDeck();
    distributeCards(game);
    let newSbIndex = null;
    let newBbIndex = null;
    if (game.gameState.sb === null){
        newSbIndex = 0; 
        newBbIndex = 1;
    }else {
        const sbIndex = players.findIndex(p => p.id === game.gameState.sb);
        newSbIndex = (sbIndex + 1 ) % players.length;
        newBbIndex = (sbIndex + 2 ) % players.length;
        
    }
        game.gameState.sb = game.players[newSbIndex].id;
        game.gameState.bb = game.players[newBbIndex].id;
        changeBet(game.players[newSbIndex],game.minBet / 2);
        changeBet(game.players[newBbIndex],game.minBet);
        game.gameState.round.curTurn = game.players[(newBbIndex + 1) % players.length].id;
        game.gameState.round.highestBet = game.minBet;
        game.gameState.round.lastTurn = game.players[newBbIndex].id;
    
    io.to(game.id).emit("updateGame",game);
    
}

module.exports = { roundStart };
