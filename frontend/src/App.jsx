import React, { useState, useEffect } from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import "./App.css";
import Game from "./game/game.jsx";
import Lobby from "./lobby/lobby.jsx";
import Login from "./login/login.jsx";

const App = () =>{
    return (
        <div>
            <Routes>
                 <Route path = "/lobby" element = {<Lobby/>}/>
                 <Route path = "/game/:roomCode" element = {<Game/>}/>
                 <Route path = "/login" element = {<Login/>}/> 
            </Routes>
        </div>
    )
}
export default App
