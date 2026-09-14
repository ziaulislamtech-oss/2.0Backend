import { createBrowserRouter } from "react-router-dom";
import Login from "../Features/Auth/pages/Login";
import Register from "../Features/Auth/pages/Register";
import Dashboard from "../Features/chat/pages/Dashboard";
import ProtectedRoute from "../Features/Auth/components/ProtectedRoute";
import PublicOnlyRoute from "../Features/Auth/components/PublicOnlyRouter";


export const router = createBrowserRouter([
    {
        element: <PublicOnlyRoute />,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            },
        ]
    }
])
