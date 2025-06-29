const { changeStage,gameEnd } = require("./logicMiddleware");


const changeBet = (player,amount) =>{
    player.chips -= amount - player.bet;
    player.bet = amount;
    game.gameState.pot += amount;
}

const nextTurn = (game,io) =>{
    const activePlayers = game.players.filter(p => !p.folded);
    if (activePlayers.length <= 1){
        gameEnd(game,io);
        return;
    }
    let curIndex = game.players.findIndex(p => p.id === game.gameState.round.curTurn);;
    let ori = curIndex;
    do{
        curIndex = (curIndex + 1) % game.players.length;
    }while(game.players[curIndex].folded === true);
    game.gameState.round.curTurn = game.players[curIndex].id;
    if (game.gameState.round.curTurn === game.gameState.round.lastTurn){
        changeStage(game);                
    }
}


const playerCheck = (socketid,game,io) =>{
    let curPlayer = game.players.find(p=> p.id === socketid);
    const highestBet = game.gameState.highestBet;
    changeBet(curPlayer, highestBet);
    nextTurn(game,io);
    io.to(game.code).emit("updateGame",game);
}

const playerFold = async (socketid, game, io) =>{
    let curPlayer = game.players.find(p=> p.id === socketid);
    curPlayer.folded = true;
    await nextTurn(game,io);
    io.to(game.code).emit("updateGame",game);
}
const playerRaise = (socketid, game, io, amount) =>{
    let curPlayer = game.players.find(p=> p.id === socketid);
    game.gameState.highestBet +=  amount;
    changeBet(curPlayer, game.gameState.highestBet);
    game.gameState.round.lastTurn = socketid;
    nextTurn(game,io);
    io.to(game.code).emit("updateGame",game);
}
module.exports = { changeBet, nextTurn,playerCheck,playerFold,playerRaise };
