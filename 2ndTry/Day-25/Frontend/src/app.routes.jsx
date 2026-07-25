import { createBrowserRouter } from 'react-router-dom'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import Home from './Features/Home/pages/Home'
import UploadNasheed from './Features/Home/pages/UploadNasheed'
import Profile from './Features/Profile/Pages/Profile'
import Protected from './Features/auth/components/Protected'


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Protected>
            <Home />
        </Protected>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element:
            <Protected>
                <Register />
            </Protected>
    },
    {
        path: "/uploadsong",

        element:
            <Protected>
                <UploadNasheed />
            </Protected>
    },
    {
        path: "profile",
        element:
            <Protected>
                <Profile />
            </Protected>
    }

])