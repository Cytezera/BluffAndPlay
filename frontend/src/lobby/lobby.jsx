import React, { useState, useEffect} from "react";
import styles from "./lobby.module.css";
import Suggestion from "./suggestion/suggestion.jsx";
import Searchbar from "./searchbar/searchbar.jsx";
import Create from "./create/create.jsx"; 
import Navbar from "../dashboard/navbar/navbar.jsx";

const Lobby = () =>{
    return (
            <div className={styles.lobby}>
                <Navbar/>
                <div>Lobby </div>
                <div className={styles.search}>
                    <Searchbar/>
                    <Create/>
                </div>
            </div>
    );
};

export default Lobby;
