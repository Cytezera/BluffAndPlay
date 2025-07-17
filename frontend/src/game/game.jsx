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
    const handleCopy = () =>{
        navigator.clipboard.writeText(roomCode);
    };
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
        <div className={styles.game}>
            {game && game.start === false &&(
                <div className={styles.lobbyWrapper}>
                    <div>Waiting for players... </div>
                    <div className={styles.lobbyCode}>{roomCode} </div>
                    <div className={styles.playerList}>
                        {game.players.map((player,index) =>(
                            <div key={index} className={styles.playerName}> 👤  {player.name}</div>
                        ))} 
                    </div>
                    <button onClick={handleCopy} >  Copy Code </button>
                    {game && game.start === false && game.players.length >= 2 && socket.id === game.host && (
                        <button onClick={handleClick} className={styles.startButton}>Start Game</button>
                    )}
                </div>
            )}


            {game && game.start === true &&(
                <div className={styles.game}>
                    <Table game = {game}/>
                {game.gameState.active === true && (
                    <Player game = {game}/>
                )}
                </div>
            )}
        </div>
    )
}

export default Game;
