import React, { useState, useEffect} from "react";
import styles from "./lobby.module.css";
import Suggestion from "./suggestion/suggestion.jsx";
import Searchbar from "./searchbar/searchbar.jsx";
import Create from "./create/create.jsx"; 


const Lobby = () =>{
    return (
            <div>
                <div>Lobby </div>
                <Searchbar/>
                <Create/>
            </div>
    );
};

export default Lobby;
