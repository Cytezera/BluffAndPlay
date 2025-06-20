require("dotenv").config()
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Sever(server, {
    cors: {
        origin: "http://localhost:5175",
        methods:["GET","POST"]
    }
});
app.use(cors());
app.use(express.json());

let activeGames = {};
require("./routes/connect")(io,activeGames);

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
