import React,{ useState, useEffect } from "react";
import styles from "./searchbar.module.css";
import { useNavigate } from "react-router-dom";
import socket from "../../socket.js";
import { useAuth } from "../../context/AuthContext";

const Searchbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [query,setQuery] = useState("");
    const handleChange = (e) =>{
        setQuery(e.target.value);
    }

    const handleClick = () =>{
        socket.emit("checkRoom", { roomCode: query, playerName: user.username});
        socket.once("roomCreated", (roomCode) =>{
            navigate(`/game/${roomCode}`);
        });
        socket.once("roomDontExists", () => {
            console.log("room doesnet exists bruh");
        });
        
    }
    return (
        <div className={styles.searchbar}>
            <input type="text" value ={query} onChange={handleChange} placeholder="Enter room key"/>
            <button onClick={handleClick} className={styles.button}>Enter</button>
        </div>
    );
};
export default Searchbar;
