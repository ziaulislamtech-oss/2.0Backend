import { Navigate } from "react-router-dom";

import useAuth from "./features/auth/hooks/useAuth";
import AuthLoading from "./features/auth/components/AuthLoading";
const ProtectedRoute = ({ children }) => {

    const { user, authLoading } = useAuth();

    if (authLoading) {
        return <AuthLoading/>
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;