const changeBet = (player,amount) =>{
    player.bet = amount;
    player.chips -= amount;
}

const nextTurn = (game) =>{
    curIndex = game.players.findIndex(p => p.id === game.gameState.round.curTurn);;
    curIndex = (curIndex + 1) % game.players.length;
    game.gameState.round.curTurn = game.players[curIndex].id;
}


const playerCheck = (socketid,game,io) =>{
    let curPlayer = game.players.find(p=> p.id === socketid);
    const highestBet = game.gameState.round.highestBet;
    changeBet(curPlayer, highestBet);
    nextTurn(game);
    io.to(game.code).emit("updateGame",game);
}

module.exports = { changeBet, nextTurn,playerCheck };
