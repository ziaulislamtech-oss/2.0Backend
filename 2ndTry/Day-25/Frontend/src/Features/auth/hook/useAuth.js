import React, { useContext } from 'react'
import { Authcontext } from '../auth.context'
import { getMe, loginUser, logOut, registerUser } from '../service/auth.api'

const useAuth = () => {

    const context = useContext(Authcontext)
    const {loading,setLoading,user,setUser} = context

    const handleLogin =async(data)=>{

        setLoading(true)
        const response = await loginUser(data)
        setUser(response.user)

        setLoading(false)

    }


    const handleRegister = async (data)=>{

        setLoading(true)
        const response = await registerUser(data)

        setUser(response.user)
        
        setLoading(false)
    }

    const handleGetMe = async ()=>{

        const response = await getMe()
        setUser(response.user)

        return response
    }

    const handleLogout = async()=>{
        setLoading(true)
        await logOut()
        setUser(null)
        setLoading(false)
    }


  return ({
    handleLogin,handleRegister,user,setUser,loading,setLoading,handleGetMe,handleLogout
})

}

export default useAuth
