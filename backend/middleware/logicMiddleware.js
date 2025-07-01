const { getBestHand } = require ("./cardsMiddleware");


const checkWinner = (game) =>{
        const playersLeft = game.players.filter(p => !p.folded);
        if (playersLeft.length === 1){
            game.gameState.winner = playersLeft[0];
            playersLeft[0].chips += game.gameState.pot;
            return
        }
        while(game.gameState.table.length < 5){
            game.gameState.table.push(game.gameState.deck.pop());
        }
        const table = game.gameState.table;
        let winner = [];
        let bestScore = -1;
        for (const player of playersLeft){
            const fullHand = [...player.hand,...table]; 
            const bestFive = getBestHand(fullHand);
            if ( bestFive.score > bestScore ){
                bestScore = bestFive.score
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
