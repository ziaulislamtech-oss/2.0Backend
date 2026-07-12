import { createContext, useState } from "react";


export const UserContext = createContext()

export const UserContextProvider = ({children})=>{

    const [loading,setLoading,] = useState(false)
    const [followedUsers,setFollowedUsers] = useState([])
    const [suggestUsers,setSuggestUsers] = useState([])


    return(
        <UserContext.Provider value={{loading,setLoading,followedUsers,setFollowedUsers,suggestUsers,setSuggestUsers}}>
            {children}
        </UserContext.Provider>
    )
    
}