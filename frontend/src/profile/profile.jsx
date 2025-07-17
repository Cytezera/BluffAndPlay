import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import Navbar from "../dashboard/navbar/navbar.jsx";
import { useAuth } from "../context/AuthContext";


const Profile = () =>{
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }
    return (
        <div className={styles.profile}>
            <Navbar/>
            <button onClick={logout} className={styles.logout}>Log out</button>
        </div>
    )


}
export default Profile;
