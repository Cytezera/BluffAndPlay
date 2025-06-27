const changeBet = (player,amount) =>{
    player.chips -= amount - player.bet;
    player.bet = amount;
}

const nextTurn = (game) =>{
    let curIndex = game.players.findIndex(p => p.id === game.gameState.round.curTurn);;
    do{
        curIndex = (curIndex + 1) % game.players.length;
    }while(game.players[curIndex].folded === true);
    game.gameState.round.curTurn = game.players[curIndex].id;
}


const playerCheck = (socketid,game,io) =>{
    let curPlayer = game.players.find(p=> p.id === socketid);
    const highestBet = game.gameState.round.highestBet;
    changeBet(curPlayer, highestBet);
    nextTurn(game);
    io.to(game.code).emit("updateGame",game);
}

const playerFold = (socketid, game, io) =>{
    let curPlayer = game.players.find(p=> p.id === socketid);
    curPlayer.folded = true;
    nextTurn(game);
    io.to(game.code).emit("updateGame",game);
}
module.exports = { changeBet, nextTurn,playerCheck,playerFold };
