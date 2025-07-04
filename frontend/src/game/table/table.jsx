import React , { useState, useEffect } from "react";
import styles from "./table.module.css";
import Players from "./players/players.jsx";
import socket from "../../socket.js";

const Table = ({game}) => {
    useEffect(() => {
    },[game]);

    return (
        <div>
            <div>
                Game Start 
            </div>
            <div>
                <div>Pot: {game.gameState.pot}</div>
            </div>
            <div>
                {!game.gameState.active && (
                    <div> Winner : {game.gameState.winner.map((player,index) =>(
                        <div key={index}>{player.name}</div>
                    ))}
                        <div>{ game.gameState.winner[0].desc}</div>
                    </div>
                )}
            </div>
            <div>
                Table:
            </div>
            {game.gameState.table.map((card,index) =>(
                <div key = {index}>
                    {card.value} of {card.suit}
                </div>
            ))}
            <Players game = {game}/>
            
        </div>
    )
}

export default Table;
