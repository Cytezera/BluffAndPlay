import React , { useState, useEffect } from "react";
import styles from "./table.module.css";
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
                {!game.active && (
                    <div> Winner : {game.gameState.winner.name} </div>
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

export default Table;
