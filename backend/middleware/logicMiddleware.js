const { getBestHand } = require ("./cardsMiddleware");


const checkWinner = (game) =>{
        const playersLeft = game.players.filter(p => !p.folded);
        let winner = { id:[], name:[] ,desc:[]};
        if (playersLeft.length === 1){
            game.gameState.winner.id = playersLeft[0].id;
            playersLeft[0].chips += game.gameState.pot;
            return
        }
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
                bestScore = bestFive.bsetScore
                winner = { id: [] , name:[], desc: []};
                winner.id.push(player.id);
                winner.name.push(player.name);
                winner.desc.push(bestFive.bestDesc);
            }else if (bestScore === bestFive.bestScore){
                winner.id.push(player.id);
                winner.name.push(player.name);
                winner.desc.push(bestFive.bestDesc);
                
            }

        }
        for (const id of winner.id){
            let player = game.players.find(p=> p.id === id);
            player.chips += game.gameState.pot / winner.id.length;
        }
        game.gameState.winner = inner;
    }

module.exports = { checkWinner};
