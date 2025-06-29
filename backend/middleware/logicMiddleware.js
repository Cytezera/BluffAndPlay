const { getBestHand } = require ("./cardsMiddleware");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const changeStage = (game) => {
    stage = game.gameState.stage
    deck = game.gameState.deck;
    table = game.gameState.table;
    switch(stage){
        case 0:
            for(let i = 0 ; i < 3; i ++){
                table.push(deck.pop());
            }
            break;
        case 1:case 2:
            table.push(deck.pop());
            break;
        case 3:
            gameEnd(deck);
            break;
        default:
            console.log("Error during stages");
    }
    game.gameState.stage += 1 ;
}

const gameEnd = (game,io) =>{
    checkWinner(game);
    game.gameState.active = false;
    console.log("walao");
    io.to(game.code).emit("updateGame",game);
}
const checkWinner = (game) =>{
    const playersLeft = game.players.filter(p => !p.folded);
    if (playersLeft.length === 1){
        game.gameState.winner = playersLeft[0];
        playersLeft[0].chips += game.gameState.pot;
        return
    }
    /*while(game.gameState.table.length < 5){
        game.gameState.table.length.push(deck.pop());
    }
    const table = game.gameState.table;
    let winner = null;
    let bestRank = null;
    for (const player of playersLeft){
        const fullHouse = [...player.hand,...game.table]; 
        const bestFive = getBestHand(fullHand);

    }
    */
}

module.exports = { changeStage,gameEnd };
