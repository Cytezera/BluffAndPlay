import { useParams } from "react-router-dom";
import styles from "./game.module.css";
import React, { useState,useEffect } from "react";
import socket from "../socket.js";
import Table from "./table/table.jsx";
import Player from "./player/player.jsx";
const Game = () => {
    const { roomCode } = useParams();
    const [game,setGame] = useState(null); 
    const handleClick = () =>{
        socket.emit("gameStart",roomCode);
    }
    const handleUpdate = (data) =>{
        setGame(data);
    }
    useEffect(() => {
        socket.emit("getInfo",(roomCode));
        socket.once("updateGame",handleUpdate);
        socket.on("updateGame",handleUpdate);
        return () =>{
            socket.off("updateGame",handleUpdate);
        }
        
    },[]);

    useEffect(()=>{
        console.log(game);
    },[game]);
    return (
        <div>
            {game && game.start === false &&(
                <div>
                    <div>Waiting for players... </div>
                    <div>Players in lobby : </div>
                    {game.players.map((player,index) =>(
                        <div key={index}> {player.name}</div>
                    ))} 
                </div>
            )}

            {game && game.start === false && game.players.length >= 2 && socket.id === game.host && (
                <button onClick={handleClick}>Here</button>
            )}
            {game && game.start === true &&(
                <div>
                    <Table game = {game}/>
                    <Player game = {game}/>
                </div>
            )}
        </div>
    )
}

export default Game;
