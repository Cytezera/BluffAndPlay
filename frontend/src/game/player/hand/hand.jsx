import React, { useState,useEffect } from "react"
import socket from "../../../socket.js"
import styles from "./hand.module.css";

const Hand = ({game}) => {
    const [hand,setHand] = useState([]);

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
            {hand.map((card,index) =>(
                <div key = {index}>
                {card.value} of {card.suit}
                </div>
            ))}
        </div>
    )
}

export default Hand;
