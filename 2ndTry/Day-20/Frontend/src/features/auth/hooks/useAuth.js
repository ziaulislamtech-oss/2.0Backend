import React, { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { getMe, login, register } from '../service/auth.api'

const useAuth = () => {

  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading, authLoading, setAuthLoading } = context

  const handleLogin = async (data) => {

    try {
      setLoading(true)
      const response = await login(data)
      setUser(response.user)

      console.log(`response from auth ${response}`)
      return response

    } catch (error) {

      console.log("Data:", error.response?.data.message);

      return {
        success: false,
        message: error.response?.data.message
      }

    } finally {

      setLoading(false)
    }
  }

  const handleRegister = async (data) => {
    try {
      setLoading(true);

      const response = await register(data);

      setUser(response.user);

      return {
        success: true,
        user: response.user,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    try {

      setAuthLoading(true);

      const response = await getMe();

      setUser(response.user);

    } catch (error) {

      setUser(null);

    } finally {

      setAuthLoading(false);

    }
  }


  return {
    user, loading, handleLogin, handleRegister, handleGetMe, authLoading
  }
}

export default useAuth
