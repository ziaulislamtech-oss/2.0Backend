import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Router from './AppRoutes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/posts/post.context.jsx'
import { UserContextProvider } from './features/users/users.context.jsx'
import AuthInitializer from './features/auth/pages/AuthInitializer.jsx'


createRoot(document.getElementById('root')).render(
  <UserContextProvider>

  <PostContextProvider>
    <AuthProvider>
      <AuthInitializer/>
    <RouterProvider router={Router}/>
  </AuthProvider>
  </PostContextProvider>
  </UserContextProvider>
)
