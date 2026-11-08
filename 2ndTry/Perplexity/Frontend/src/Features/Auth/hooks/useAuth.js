import React from 'react'
import { useDispatch } from 'react-redux'
import { setError, setLoading, setUser, setAuthChecked } from '../auth.slice'
import { login, register, getMe } from '../service/auth.api'

const useAuth = () => {

    const dispatch = useDispatch()

  const handleRegister = async (username, email, password) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const data = await register(username, email, password);

    dispatch(setUser(data.user));   // ← ye line zaroori hai
    return data;
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Registration failed"));
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

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