// AuthInitializer.jsx

import { useEffect } from "react";
import useAuth from "../hooks/useAuth";



const AuthInitializer = () => {

    const { handleGetMe } = useAuth();

    useEffect(() => {
        handleGetMe();
    }, []);

    return null;
};

export default AuthInitializer;