import React, { useContext } from 'react'
import { Authcontext } from '../auth.context'
import { loginUser, registerUser } from '../service/auth.api'

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




  return ({
    handleLogin,handleRegister,user,setUser,loading,setLoading
})

}

export default useAuth
