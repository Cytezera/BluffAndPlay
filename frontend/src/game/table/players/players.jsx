import React, { useState, useEffect } from "react";
import styles from "./players.module.css";


const Players = ({game}) => {
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

    return (
        <div>
        <div className={styles.pokerTable}>
        {game.players.map((player,index) =>{
            let role = ' ';
            let turn = ' ';
            let bet = ' ' ;
            let folded = ' ';
            let revealCards = ' ';
            if (game.gameState.active && player.id === game.gameState.bb) role = ' - Big Blind';
            if (game.gameState.active && player.id === game.gameState.round.sb) role = ' - Small Blind';
            if (game.gameState.active && player.id === game.gameState.round.curTurn) turn = ' (Player\'s Turn)'
            if (player.bet) bet = player.bet
            if (player.folded === true) folded = "FOLDED"
            return (
                <div className={styles.player} key ={index}>
                <div className={styles.playerInfo}>
                ({player.chips}) {player.name}  {role}  Bet: {bet} {folded} {turn} {revealCards}
                </div>
                {!player.folded && !game.gameState.active && (
                    <div className={styles.playerCards}>
                    {player.hand && player.hand.map((card,index) =>{
                        const code = getCardCode(card.value,card.suit);
                        const imagePath = `/Images/${code}.webp`;
                        return (
                            <img key={index} src={imagePath} alt={`${card.value} of ${card.suit}`} className={styles.cardImage}/>
                        );
                    })}
                    </div>
                )}

                </div>
            )

        })}
        </div>
        </div>
    )
}
export default Players;
