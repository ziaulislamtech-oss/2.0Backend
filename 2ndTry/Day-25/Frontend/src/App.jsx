import React from 'react'
// import FaceExpression from './Features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { AuthProvider } from './Features/auth/auth.context'


const App = () => {
  return (
    <div>
      <AuthProvider>

      <RouterProvider router={router} />
      </AuthProvider>
      
    </div>
  )
}

export default App
