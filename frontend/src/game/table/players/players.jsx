import React, { useState, useEffect } from "react";
import styles from "./players.module.css";


const Players = ({game}) => {
    return (
        <div>
        <div> Players: </div>
        {game.players.map((player,index) =>{
            let role = ' ';
            let turn = ' ';
            let bet = ' ' ;
            let folded = ' ';
            if (game.gameState.active && player.id === game.gameState.bb) role = ' - Big Blind';
            if (game.gameState.active && player.id === game.gameState.round.sb) role = ' - Small Blind';
            if (game.gameState.active && player.id === game.gameState.round.curTurn) turn = ' (Player\'s Turn)'
            if (player.bet) bet = player.bet
            if (player.folded === true) folded = "FOLDED"
            return (
                <div key ={index}>({player.chips}) {player.name}  {role}  Bet: {bet} {folded} {turn}</div>
            )

        })}
        </div>
    )
}
export default Players;
