import React from "react";
import { Navigate , Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () =>{
    const { user,loading } = useAuth();
    const location = useLocation()

    if (loading){
        return <div> Loading ... </div>
    }
    if (!user){
        return <Navigate to="/login" state={{ from:location}} replace />;

    }
    return <Outlet/>;

};
export default ProtectedRoutes;

