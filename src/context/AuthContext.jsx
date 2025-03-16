import toast from "react-hot-toast";

import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children})=>{
    let [authUser,setauthUser] = useState(null);
    let [loading,setloading] = useState(true);

    useEffect(()=>{
        const CheckUserLoggedin = async()=>{
            setloading(true);
            try {
                const res = await fetch("https://mern-github-backend.onrender.com/api/auth/check" , {credentials:"include"});
                const data = await res.json();
                setauthUser(data.user);
                // setloading(true);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setloading(false);
            }
        };
        CheckUserLoggedin();
     },[])
    return(
        <AuthContext.Provider value={{authUser,setauthUser,loading}} >
            {children}
        </AuthContext.Provider>
    )
}