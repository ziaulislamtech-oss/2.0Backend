import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router"
import Login from './features/auth/pages/login'
import Resgister from './features/auth/pages/resgister'

const AppRoutes = () => {
  return (
    <div>
      
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Resgister/>}  />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes
