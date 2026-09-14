import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-dark">
    <div className="h-8 w-8 rounded-full border-2 border-glass-border-dark border-t-primary animate-spin" />
  </div>
)

const PublicOnlyRoute = () => {
  const { user, authChecked } = useSelector((state) => state.auth)

  if (!authChecked) {
    return <FullScreenLoader />
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicOnlyRoute
