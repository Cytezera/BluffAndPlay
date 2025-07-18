import React , { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import API from "../api/axiosInstances";

const Register = () =>{
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword ] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [message, setMessage] = useState("");

    const handleClick = () => {
        if (password !== retypePassword){
            setPassword("");
            setRetypePassword("");
            setMessage("Password does not match");
            return;
        }
        API.post("/api/register", {username,password,email})
        .then((response) =>{
            if(response.data.registered){
                navigate("/login");
            }else{
                setMessage(response.data.message);
            }
        });
       
    }
    return(
        <div className={styles.registerPage}>
            <div className={styles.registerBox}>
                <input 
                    type = "text"
                    placeholder = "Username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
                <input 
                    type = "text"
                    placeholder = "Email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <input 
                    type = "password"
                    placeholder = "Password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
                <input 
                    type = "password"
                    placeholder = "Retype Password"
                    value = {retypePassword}
                    onChange = {(e) => setRetypePassword(e.target.value)}
                />
            {message &&(
                <div className={styles.message}>{message}</div>
            )}
            <div>
                <button onClick={handleClick}> Register </button> 
            </div>
            </div>
            
        </div>
    )
}
export default Register;
