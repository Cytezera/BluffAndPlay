import React, { useState , useEffect } from "react"
import styles from "./button.module.css"
import socket from "../../../socket.js";

const Button = ({game}) =>{

    const curPlayer = game.players.find(p => p.id === socket.id);
    const minBet = game.gameState.highestBet > curPlayer.bet ? game.gameState.highestBet - curPlayer.bet : game.minBet;
    
    const [raiseAmount, setRaiseAmount] = useState(minBet);

    useEffect(() =>{
        setRaiseAmount(minBet); 
    },[game]);


    const maxBet = curPlayer ? curPlayer.chips : minBet;
    const gameCheck = () =>{
        socket.emit("check",(game.code));
    }
    const gameRaise = () =>{
        console.log("works here ");
        socket.emit("raise",{roomCode: game.code, raiseAmount:raiseAmount});
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
                        <button onClick={gameCheck} className={styles.button}> Call/Check </button>
                        <button onClick={gameRaise} className={styles.button}> Raise: {raiseAmount} </button>
                        <button onClick={gameFold}  className={styles.button}> Fold </button>
                    </div>
                    <input type="range" min={minBet} max={maxBet} value={raiseAmount} onChange={(e) => setRaiseAmount(Number(e.target.value))}/>
                </div>
            )}

        </div>
    )
}
export default Button;
