import { useSelector } from "react-redux";
// import { useIsLogged } from "../context";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
    const location = useLocation(); //para que recuerde donde estaba antes del login
    const isLogged = useSelector(state => state.auth);

    return isLogged ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

export default RequireAuth;
