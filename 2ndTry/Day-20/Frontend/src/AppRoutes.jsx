import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import CreatePost from "./features/posts/pages/CreatePost";
import SavedPosts from "./features/posts/pages/SavedPosts";
import Layout from "./layout/Layout";


const Router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Feed />
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