import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";
import SavedPosts from "./features/posts/pages/SavedPosts";
import Layout from "./layout/Layout";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "./features/users/pages/Profile";


const Router = createBrowserRouter([
    {
        path: '/login',

        element:
            (
                <PublicRoute>
                    <Login />
                </PublicRoute>
            )
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>

        )
    },

    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>

        ),
        children: [
            {
                index: true,
                element: <Feed />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: '/createpost',
                element: <CreatePost />
            },
            {
                path: "/savedposts",
                element: <SavedPosts />
            }
        ]
    },


])

export default Router