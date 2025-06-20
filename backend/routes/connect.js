const {generateRoomCode, joinRoom} = require("../middleware/roomMiddleware");

module.exports = ( io, activeGames) =>{
    io.on("connection", (socket) =>{
        console.log(`${socket.id} has joined the table`);
        
        socket.on("createRoom",() =>{
            cosnt roomCode = generateRoomCode(activeGames);  
            activeGames[roomCode] = {
                players: [],
                deck: null,
                pot: 0,
                host: socket.id,
                start: false
            };
            const game = activeGames[roomCode]
            joinRoom(io,socket,game,roomCode, playerName);
        });
    }
}
