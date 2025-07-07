import React, { useState, useEffect } from "react" ;
import axios from "axios"
import { useNavigate , Link } from "react-router-dom";
import styles from "./login.module.css";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () =>{
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const checkValid = () =>{
        axios.post(`${API_URL}/api/login`, {username, password})
            .then((response) =>{
                if(response.data.loggedIn){
                    navigate("/dashboard");
                }else{
                    setPassword("");
                    setMessage(response.data.message);
                }
            });
    };
    return(
        <div>
            <div>
                <input 
                    type = "text"
                    placeholder = "Username"
                    value = {username} 
                    onChange ={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type = "password"
                    placeholder = "Password"
                    value = {password} 
                    onChange ={(e) => setPassword(e.target.value)} 
                />
            </div>
            {message && (
                <div>{message}</div>
            )}
            <div>
                <button onClick={checkValid}>Login</button>
                <Link to="/register">Register Account</Link>
            </div>
        </div>
    )
}
export default Login

