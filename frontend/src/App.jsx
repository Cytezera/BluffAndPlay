import { useState, useEffect } from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import "./App.css";
import Game from "./game/game.jsx";
import Lobby from "./lobby/lobby.jsx";

const App = () =>{
    return (
        <div>
            <Routes>
                 <Route path = "/lobby" element = {<Lobby/>}/>
                 <Route path = "/game/:roomCode" element = {<Game/>}/>
            </Routes>
        </div>
    )
}
export default App
