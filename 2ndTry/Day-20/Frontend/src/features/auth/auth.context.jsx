import { useEffect } from "react";
import { Children, createContext, useState } from "react";
import useAuth from "./hooks/useAuth";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

   
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)


    

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}