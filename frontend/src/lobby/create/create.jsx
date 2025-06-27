import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket.js";


const Create = () => {
    const navigate = useNavigate();
    const handleClick = () =>{
        socket.emit("createRoom");
        socket.once("roomCreated", (roomCode) =>{
            navigate(`/game/${roomCode}`);
        });
    }

    return(
        <div>
            <button onClick={handleClick}>Create Room</button>

        </div>

    );

}
export default Create;
