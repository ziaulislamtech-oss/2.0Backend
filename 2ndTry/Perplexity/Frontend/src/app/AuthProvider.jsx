import { useEffect } from 'react'
import useAuth from '../Features/Auth/hooks/useAuth'

const AuthProvider = ({ children }) => {
  const { handleGetMe } = useAuth()

  useEffect(() => {
    handleGetMe()
  }, [])

  return children
}

export default AuthProvider
