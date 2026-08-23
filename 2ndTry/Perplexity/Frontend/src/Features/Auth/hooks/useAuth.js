import React from 'react'
import { useDispatch } from 'react-redux'
import { setError, setLoading } from '../auth.slice'
import { login, register } from '../service/auth.api'

const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister(username,email,password){

        try{

            dispatch(setLoading(true))
            const data = await register(username,email,password)
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "Registration field"))
        } finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin(email,password){

        try{
            console.log("handle login is receiving...")
            dispatch(setLoading(true))
            const data = await login(email,password)

        }
        catch(error){
            dispatch(setError(error?.response?.data?.message || "Login Failed"))
        }
        finally{

            dispatch(setLoading(false))
            
        }
    }

   


  return {
    handleRegister,
    handleLogin
  }
  
}

export default useAuth
