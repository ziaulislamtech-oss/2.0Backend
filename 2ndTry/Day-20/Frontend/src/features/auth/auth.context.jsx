import { useEffect } from "react";
import { Children, createContext, useState } from "react";
import useAuth from "./hooks/useAuth";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

   
    const [user,setUser] = useState(null)

    const [authLoading,setAuthLoading] = useState(true)
    const [loading,setLoading] = useState(false)


    

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading,authLoading,setAuthLoading}}>
            {children}
        </AuthContext.Provider>
    )
}