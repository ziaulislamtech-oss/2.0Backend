import React from 'react'
import { useDispatch } from 'react-redux'
import { setError, setLoading, setUser, setAuthChecked } from '../auth.slice'
import { login, register, getMe } from '../service/auth.api'

const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister(username,email,password){

        try{

            dispatch(setLoading(true))
            dispatch(setError(null))
            // Registration does NOT log the user in (no session cookie is issued) —
            // they still need to verify their email, then log in separately.
            // So we do NOT dispatch setUser here.
            const data = await register(username,email,password)
            return data
        }
        catch(err){
            dispatch(setError(err.response?.data?.message || "Registration field"))
            throw err
        } finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin(email,password){

        try{
            console.log("handle login is receiving...")
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await login(email,password)
            dispatch(setUser(data.user))

        }
        catch(error){
            dispatch(setError(error?.response?.data?.message || "Login Failed"))
            throw error
        }
        finally{

            dispatch(setLoading(false))
            
        }
    }

    async function handleGetMe(){

        try{
            const data = await getMe()
            dispatch(setUser(data.user))
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