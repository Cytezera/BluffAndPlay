import React, { useState, useEffect } from "react" ;
import { useNavigate , Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./login.module.css";
import API from "../api/axiosInstances.jsx";

const Login = () =>{
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUser} = useAuth();
    const navigate = useNavigate();
    const checkValid = () =>{
        API.post("/api/login/", {username, password})
            .then((response) =>{
                if(response.data.loggedIn){
                    localStorage.setItem("token", response.data.token);
                    setUser(response.data.user);
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

