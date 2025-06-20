import React, { useState, useEffect} from "react";
import styles from "./lobby.module.css";
import Suggestion from "./suggestion/suggestion.jsx";
import Searchbar from "./searchbar/searchbar.jsx";


const Lobby = () =>{
    return (
            <div >
                <div>Lobby </div>
                <Searchbar/>
            </div>
    );
};

export default Lobby;
