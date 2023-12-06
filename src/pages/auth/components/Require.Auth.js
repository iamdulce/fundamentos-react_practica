import { useAuth } from "../context";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    const location = useLocation(); //para que recuerde donde estaba anted del login
    const { isLogged } = useAuth();

    return isLogged ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default RequireAuth;
