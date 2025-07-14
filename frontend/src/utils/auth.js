import API from "../api/axiosInstances";

export const checkAuth = async () =>{
    try{
        const token = localStorage.getItem("token");
        if (!token){
            return null;
        }
        const res = await API.get("/api/authentication");
        return res.data.user;
    }catch (err){
        return null;
    }
}

export default checkAuth;
