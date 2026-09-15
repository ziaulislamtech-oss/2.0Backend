import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setLoading, setUser, setAuthChecked } from '../auth.slice'
import { login, register, getMe } from '../service/auth.api'

const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister(username,email,password){

        try{

            dispatch(setLoading(true))
            const data = await register(username,email,password)
            dispatch(setUser(data.user))
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
            dispatch(setUser(data.user))

        }
        catch(error){
            dispatch(setError(error?.response?.data?.message || "Login Failed"))
        }
        finally{

            dispatch(setLoading(false))
            
        }
    }

    async function handleGetMe(){

        try{
            const data = await getMe()
            dispatch(setUser(data.user))
            console.log('user handled')
            

        }
        catch(error){
            // Not logged in / session expired — that's fine, ProtectedRoute
            // will redirect based on user being null.
            console.log("handleGetMe failed:", error?.response?.data?.message || error.message)
        }
        finally{
            dispatch(setAuthChecked(true))
        }
    }


  return {
    handleRegister,
    handleLogin,
    handleGetMe
  }
  
}

export default useAuth