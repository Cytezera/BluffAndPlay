import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket.js";
import { useAuth } from "../../context/AuthContext";
import styles from "./create.module.css";


const Create = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleClick = () =>{
        socket.emit("createRoom", (user.username));
        socket.once("roomCreated", (roomCode) =>{
            navigate(`/game/${roomCode}`);
        });
    }

    return(
        <div>
            <button onClick={handleClick} className={styles.button}>Create Room</button>

        </div>

    );

}
export default Create;
