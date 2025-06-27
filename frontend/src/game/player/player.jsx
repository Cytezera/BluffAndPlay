import React, { useState , useEffect } from "react"
import styles from "./player.module.css";
import Hand from "./hand/hand.jsx";
import Button from "./button/button.jsx";

const Player = ({game}) =>{
    return (
        <div>
            <Hand game={game}/>
            <Button game={game}/>
        </div>
    )
}
export default Player;
