import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({adminOnly = false}){
    const auth = useSelector(state => state.auth)

    if(!auth.isLoggedIn){
        return <Navigate to="/login" replace />
    }

    if(adminOnly && auth.role !== "admin"){
        return <Navigate to="/" replace />
    }

    return <Outlet />
}