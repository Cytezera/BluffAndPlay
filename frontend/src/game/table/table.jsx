import React , { useState, useEffect } from "react";
import styles from "./table.module.css";
import Players from "./players/players.jsx";
import socket from "../../socket.js";

const Table = ({game}) => {

    const getCardCode = (value, suit ) =>{
        
        const suitMap ={
            "diamonds": 'D',
            "clubs": 'C',
            "hearts": 'H',
            "spades": 'S'
        };
        const newSuit = suitMap[suit];
        return `${value}${newSuit}`; 
    };

    useEffect(() => {
    },[game]);

    return (
        <div className={styles.pokerTable}>

            <div>
                {!game.gameState.active && (
                    <div className={styles.winnerBox}>
                        <div> Winner : {game.gameState.winner.map((player,index) =>(
                            <div key={index}>{player.name}</div>
                        ))}
                            <div>{ game.gameState.winner[0].desc}</div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.tableCentre}>
                <div className={styles.pot}>Pot: {game.gameState.pot}</div>
                <div className={styles.tableCards}>
                    {game.gameState.table.map((card,index) =>{
                        const code = getCardCode(card.value,card.suit); 
                        const imagePath = `/Images/${code}.webp`;
                        return (
                            <img key={index} src={imagePath} alt={`${card.value} of ${card.suit}`} className={styles.cardImage}/>
                        );

                    })}
                </div>
            </div>
            <Players game = {game}/>
            
        </div>
    )
}

export default Table;
