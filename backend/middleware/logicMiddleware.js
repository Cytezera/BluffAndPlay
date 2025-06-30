const { getBestHand } = require ("./cardsMiddleware");


const checkWinner = (game) =>{
    const playersLeft = game.players.filter(p => !p.folded);
    if (playersLeft.length === 1){
        game.gameState.winner = playersLeft[0];
        playersLeft[0].chips += game.gameState.pot;
        return
    }
    while(game.gameState.table.length < 5){
        game.gameState.table.push(deck.pop());
    }
    const table = game.gameState.table;
    let winner = [];
    let bestScore = -1;
    for (const player of playersLeft){
        const fullHand = [...player.hand,...game.table]; 
        const bestFive = getBestHand(fullHand);
        if (!bestRank || bestFive.score > bestRank.score){
            besteScore = bestFive.score
            winner = [player];
        }else if (bestScore === bestFive.score){
            winner.push(player);
        }

    }
    for (const player of winner){
        player.chips += game.gameState.pot / winner.length;
    }
    game.gameState.winner = winner;
}

module.exports = { checkWinner};
