const { getBestHand } = require ("./cardsMiddleware");


const checkWinner = (game) =>{
        const playersLeft = game.players.filter(p => !p.folded);
        if (playersLeft.length === 1){
            game.gameState.winner.id = playersLeft[0].id;
            game.gameState.winner = [
                {
                    id: playersLeft[0].id,
                    name: playersLeft[0].name,
                    desc: "Fold"
                }
            ];
            playersLeft[0].chips += game.gameState.pot;
            return
        }
        let winner = [];
        while(game.gameState.table.length < 5){
            game.gameState.table.push(game.gameState.deck.pop());
        }
        const table = game.gameState.table;
        let bestScore = -1;
        for (const player of playersLeft){
            const fullHand = [...player.hand,...table]; 
            const bestFive = getBestHand(fullHand);
            console.log(bestFive);
            if ( bestFive.bestScore > bestScore ){
                console.log(`best Five has ${bestFive.bestScore} , while bestScore has ${bestScore} `);
                bestScore = bestFive.bestScore
                winner = [
                    {
                        id: player.id,
                        name: player.name,
                        desc: bestFive.bestDesc
                    }
                ];
            }else if (bestScore === bestFive.bestScore){
                winner.push({
                    id: player.id,
                    name: player.name,
                    desc: bestFive.bestDesc
                })

                
            }

        }
        for (const w of winner){ //split pot 
            let player = game.players.find(p=> p.id === w.id);
            player.chips += game.gameState.pot / winner.length;
        }
        game.gameState.winner = winner;
    }

module.exports = { checkWinner};
