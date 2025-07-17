import React, { useState,useEffect } from "react"
import socket from "../../../socket.js"
import styles from "./hand.module.css";

const Hand = ({game}) => {
    const [hand,setHand] = useState([]);

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
    useEffect(() =>{
        if (game && game.players){
            const player = game.players.find(p => p.id === socket.id);
            if (player && player.hand){
                setHand(player.hand);

            }else {
                setHand([]);
            }
        }
    },[game]);
    const player = game.players.find(p => p.id === socket.id);

    return (
        <div>
        <div> Your Hand : </div>
        {hand.map((card,index) =>{
            const code = getCardCode(card.value,card.suit);
            const imagePath = `/Images/${code}.webp`;
        
            return (
                <img key={index} src={imagePath} alt={`${card.value} of ${card.suit}`} className={styles.cardImage}/>
            );

        })}
        </div>
    )
}

export default Hand;
