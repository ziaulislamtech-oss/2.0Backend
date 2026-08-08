import React from 'react'
import { useDispatch } from 'react-redux'
import { setError, setLoading } from '../auth.slice'
import { register } from '../service/auth.api'

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

   


  return {
    handleRegister
  }
  
}

export default useAuth
