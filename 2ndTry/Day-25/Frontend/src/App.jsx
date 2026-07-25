import React from 'react'
// import FaceExpression from './Features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { AuthProvider } from './Features/auth/auth.context'
import { HomeProvider } from './Features/Home/home.context'


const App = () => {
  return (
    <div>

      <HomeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HomeProvider>

    </div>
  )
}

export default App
