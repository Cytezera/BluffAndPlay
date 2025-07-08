require("dotenv").config()
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const http = require("http");

const app = express();
const server = http.createServer(app);
const API_URL = process.env.API_URL;
const db = require("./routes/database.js");


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

//socket
let activeGames = {};
require("./routes/connect")(io,activeGames);

//put all the routes here sia 
const login = require("./routes/login");
app.use("/api",login);

const authentication = require("./routes/authentication");
app.use("/api",authentication);

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
