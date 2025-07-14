import React, { useState, useEffect} from "react";
import styles from "./lobby.module.css";
import Suggestion from "./suggestion/suggestion.jsx";
import Searchbar from "./searchbar/searchbar.jsx";
import Create from "./create/create.jsx"; 
import Navbar from "../dashboard/navbar/navbar.jsx";

const Lobby = () =>{
    return (
            <div>
                <Navbar/>
                <div>Lobby </div>
                <Searchbar/>
                <Create/>
            </div>
    );
};

export default Lobby;
