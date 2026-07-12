import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "./features/auth/hooks/useAuth";
import AuthLoading from "./features/auth/components/AuthLoading";

const PublicRoute = ({ children }) => {

    const navigate = useNavigate()
    const { user, loading } = useAuth();

    if (loading) {
        return <AuthLoading/>
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;