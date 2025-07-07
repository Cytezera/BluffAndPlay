import React , { useState, useEffect } from "react";
import styles from "./winner.module.css";


const Winner = ({game}) => {
    return (
        <div> 
        {!game.gameState.active && (
            <div> Winner : {game.gameState.winner.map((player,index) =>(
                <div key={index}>{player.name}</div>
            ))}
            <div>{ game.gameState.winner[0].desc}</div>
            </div>
        )}
        </div>
    )

}
export default Winer;
