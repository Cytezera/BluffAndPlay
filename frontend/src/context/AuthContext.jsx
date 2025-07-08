import { createContext, useContext, useState ,useEffect } from "react";
import checkAuth from "../utils/auth";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkAuth().then((u) =>{
                if (u){
                    setUser(u);
                }
        });
    },[]);
    return(
        <AuthContext.Provider value ={{user,setUser}}>      
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);
