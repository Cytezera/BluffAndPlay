require("dotenv").config()
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const http = require("http");

const app = express();
const server = http.createServer(app);
const API_URL = process.env.API_URL;

const corsOptions = {
    origin: API_URL,
    methods: ["GET","POST"],
    credentials:true
};
const io = new Server(server, {
    cors: corsOptions
    
});
app.use(cors(corsOptions));
app.use(express.json());

let activeGames = {};
require("./routes/connect")(io,activeGames);

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
