import { createContext, useEffect, useState } from "react";
import { getMe } from "./service/auth.api";


export const Authcontext = createContext()

export const AuthProvider = ({ children }) => {

    

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function checkAuth() {

            console.log('auth function is checking...')
            try {
                const data = await getMe()

                console.log('check auth data : ',data)

                setUser(data.user)

                console.log("Check auth user : ",user)

            } catch (error) {

                console.log('check auth Error',error)
                console.log('response ',error?.response)
                
                setUser(null)
            } finally {

                setLoading(false)

            }

        }

        checkAuth()

    }, [])

    return (
        <Authcontext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </Authcontext.Provider>
    )
}