import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Router from './AppRoutes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <RouterProvider router={Router}/>
  </AuthProvider>
)
