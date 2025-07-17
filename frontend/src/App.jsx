import React, { useState, useEffect } from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import "./App.css";
import Game from "./game/game.jsx";
import Lobby from "./lobby/lobby.jsx";
import Login from "./login/login.jsx";
import Register from "./register/register.jsx";
import Dashboard from "./dashboard/dashboard.jsx";
import Profile from "./profile/profile.jsx";
import Leaderboards from "./leaderboards/leaderboards.jsx";
import ProtectedRoutes from "./components/protectedRoutes";
import {useAuth} from "./context/AuthContext";

const App = () =>{
    const { user } = useAuth(); 

    useEffect(() => {
        const preloadCards = () =>{
            const suits = ['D','C','H','S']
            const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

            for (const v of values){
                for (const s of suits){
                    const img = new Image();        
                    img.src = `/Images/${v}${s}.webp`;
                    img.onload = () => console.log(`Preloaded: ${img.src}`);
                }
            }

        }
        preloadCards();
    },[]);

        
    return (
        <Routes>
             <Route path = "/login" element = {<Login/>}/> 
             <Route path = "/register" element = {<Register/>}/>

             <Route element ={<ProtectedRoutes user={user}/>}> 
                 <Route path = "/lobby" element = {<Lobby/>}/>
                 <Route path = "/game/:roomCode" element = {<Game/>}/>
                 <Route path = "/dashboard" element = {<Dashboard/>}/>
                 <Route path = "/leaderboards" element = {<Leaderboards/>}/>
                 <Route path = "/profile" element = {<Profile/>}/>
             </Route>
        </Routes>
    )
}
export default App
