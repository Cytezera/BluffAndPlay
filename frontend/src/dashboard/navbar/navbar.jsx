import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const Navbar = () =>{
    const { user } = useAuth();
    console.log(user);
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li><Link to="/lobby">Lobby</Link></li>
                <li><Link to="/leaderboards">Leaderboards</Link></li>
                <li><Link to="/profile">{user.username}</Link></li>
            </ul>
        </nav>
    )

}
export default Navbar;
