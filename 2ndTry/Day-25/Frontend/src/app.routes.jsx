import {createBrowserRouter} from 'react-router-dom'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import Home from './Features/Home/pages/Home'


export const router = createBrowserRouter([

    {
        path : "/",
        element : <Home/>
    },
    {
        path : '/login',
        element : <Login/>
    },
    {
        path : "/register",
        element : <Register/>
    }
])