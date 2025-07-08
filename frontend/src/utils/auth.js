import API from "../api/axiosInstances";

export const checkAuth = async () =>{
    try{
        const res = await API.get("/api/authentication");
        return res.data.user;
    }catch (err){
        return null;
    }
}

export default checkAuth;
