import React, { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { login,register } from '../service/auth.api'

const useAuth = () => {

    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context

    const handleLogin = async (data)=>{
       
        try {
          setLoading(true)
          const response = await login(data)
          setUser(response.user)

          console.log(`response from auth ${response}`)
          return response

        } catch (error) {
          console.log(error.response.data.message)
          
          return {
            success : false,
            message : error.response.data.message
          }

        }finally{

          setLoading(false)
        }
    }

    const handleRegister= async (data)=>{

      try{

        setLoading(true)
        const response = await register(data)
        setUser(response.user)
        return response

      }catch(error){
        console.log(error)
        throw error

      }finally{
        setLoading(false)
      }
    }


  return{
    user,loading,handleLogin,handleRegister
  }
}

export default useAuth
