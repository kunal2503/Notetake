import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/me");
            setUser(response.data.user);
        } catch (error) {
            console.error("Failed to fetch user info", error);
            setUser(null);
        }
    };

    const signout = async () => {
        try {
            await axiosInstance.get("/auth/signout");
            setUser(null);
            localStorage.removeItem("token");
            window.location.href = "/signin";
        } catch (error) {
            console.error("Failed to sign out", error);
            setUser(null);
            localStorage.removeItem("token");
            window.location.href = "/signin";
        }
    };

    useEffect(()=>{
        fetchUser();
    },[])

    return (
        <AuthContext.Provider value={{user,signout}}>
            {children}
        </AuthContext.Provider>
    )
}