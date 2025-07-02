const {generateRoomCode, joinRoom} = require("../middleware/roomMiddleware");
const { generateDeck, distributeCards }=  require ("../middleware/deckMiddleware");
const { roundStart } = require("../middleware/gameMiddleware");
const { playerCheck, playerFold,playerRaise } = require ("../middleware/roundMiddleware");

module.exports = ( io, activeGames) =>{
    io.on("connection", (socket) =>{
        console.log(`${socket.id} has joined the table`);
       
        socket.on("createRoom",() =>{
            const roomCode = generateRoomCode(activeGames);  
            activeGames[roomCode] = {
                code: roomCode,
                host: socket.id,
                start: false,
                minBet: 100,
                gameState: {
                    active: false,
                    sb: null,
                    bb: null,
                    deck: [],
                    pot: 0,
                    highestBet:null,
                    stage:0,
                    table: [],
                    winner:{id:[], name:[], desc:[],},
                    round:{
                        curTurn:null,
                        lastTurn:null,
                    },
                },
                players: []
            };
            const game = activeGames[roomCode]
            playerName = "Test"
            joinRoom(io,socket,game,roomCode, playerName);
            socket.emit("roomCreated", roomCode);
        });
        socket.on("checkRoom",(roomCode) =>{
            if (activeGames[roomCode]){
                playerName = "Test 1";
                let game = activeGames[roomCode];
                joinRoom(io,socket,game,roomCode,playerName);
                socket.emit("roomCreated", roomCode);
            }else {
                socket.emit("roomDontExists");
            }
        })
        socket.on("getInfo",(roomCode) =>{
            if (activeGames[roomCode]){
                const gameData = activeGames[roomCode];    
                socket.emit("updateGame", gameData);
            }else {
                socket.emit("updateGame",null);
            }
        });

        socket.on("gameStart",(roomCode) =>{
            if(activeGames[roomCode]){
                game = activeGames[roomCode];
                roundStart(game,io);
                activeGames[roomCode].start = true
                io.to(roomCode).emit("updateGame",activeGames[roomCode]);
            }
        });

        socket.on("check",(roomCode) =>{
            game = activeGames[roomCode];
            if (!game){
                return;
            }
            playerCheck(socket.id,game,io);
        });
        socket.on("fold",(roomCode) =>{
            game = activeGames[roomCode];
            if (!game){
                return;
            }
            playerFold(socket.id,game,io);
        });
        socket.on("raise",({roomCode,raiseAmount}) =>{
            game = activeGames[roomCode];
            if (!game){
                return;
            }
            playerRaise(socket.id,game,io,raiseAmount);
        });
    })
}
