import React, { useState , useEffect } from "react"
import styles from "./button.module.css"
import socket from "../../../socket.js";

const Button = ({game}) =>{
    const gameCheck = () =>{
        socket.emit("check",(game.code));
    }
    const gameFold = () =>{
        socket.emit("fold",(game.code));
    }
    return (
        <div>
            {game.gameState.round.curTurn === socket.id &&(
                <div>
                    <div> Your Turn: </div>
                    <div>
                        <button onClick={gameCheck}> Check </button>
                        <button> Raise </button>
                        <button onClick={gameFold}> Fold </button>
                    </div>
                </div>
            )}

        </div>
    )
}
export default Button;
