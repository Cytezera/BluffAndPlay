import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket.js";

const Searchbar = () => {
    const navigate = useNavigate();
    const [query,setQuery] = useState("");
    const handleChange = (e) =>{
        setQuery(e.target.value);
    }

    const handleClick = () =>{
        socket.emit("checkRoom",query);
        socket.once("roomCreated", (roomCode) =>{
            navigate(`/game/${roomCode}`);
        });
        socket.once("roomDontExists", () => {
            console.log("room doesnet exists bruh");
        });
        
    }
    return (
        <div>
            <input type="text" value ={query} onChange={handleChange} placeholder="Enter room key"/>
            <button onClick={handleClick}>Enter</button>
        </div>
    );
};
export default Searchbar;
