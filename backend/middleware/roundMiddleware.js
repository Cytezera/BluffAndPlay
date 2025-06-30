const {  checkWinner} = require("./logicMiddleware");
const { generateDeck, distributeCards  } = require("./deckMiddleware");
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
const changeBet = (player,amount) =>{
    player.chips -= amount;
    player.bet += amount;
    game.gameState.pot += amount;
}
const gameEnd = async(game,io) =>{
    checkWinner(game);
    game.gameState.active = false;
    io.to(game.code).emit("updateGame",game);
    await sleep(3000);
    resetRound(game);
    io.to(game.code).emit("updateGame",game);
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
    amount = highestBet - curPlayer.bet;
    changeBet(curPlayer, amount);
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

    game.gameState.highestBet +=  (amount - (game.gameState.highestBet - curPlayer.bet));
    changeBet(curPlayer, amount);
    game.gameState.round.lastTurn = socketid;
    nextTurn(game,io);
    io.to(game.code).emit("updateGame",game);
}
const resetRound = (game) =>{
    const gameState = game.gameState;
    for(const player of game.players){
        player.folded = false;
        player.hand = [];
        player.bet = null
        player.action = null;
    };
    gameState.pot = 0;
    gameState.stage = 0;
    gameState.table = [];
    gameState.winner = [];
    gameState.active = true;

    gameState.deck = generateDeck();
    distributeCards(game);
    const sbIndex = players.findIndex ( p => p.id === game.gameState.sb);
    let newSbIndex = (sbIndex + 1 ) % players.length;
    let newBbIndex = (sbIndex + 2) % players.length;
    gameState.sb = game.players[newSbIndex].id;
    gameState.bb = game.players[newBbIndex].id;
    changeBet(game.players[newSbIndex],game.minBet / 2);
    changeBet(game.players[newBbIndex],game.minBet);
    gameState.round.curTurn = game.players[(newBbIndex + 1) % players.length].id;
    gameState.highestBet = game.minBet;
    gameState.round.lastTurn = game.gameState.round.curTurn;


}
module.exports = { changeBet, nextTurn,playerCheck,playerFold,playerRaise };
