import { Link } from "react-router-dom";
import Button from "../../../components/shared/Button";
// import { useIsLogged, useAuthHandlers } from "../context";
import { logout } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../../store/actions";

function AuthButton({ className }) {
    const isLogged = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(authLogout());
    };

    const handleLogout = async () => {
        await logout();
        onLogout();
    };
    return isLogged ? (
        <Button onClick={handleLogout} className={className}>
            Logout
        </Button>
    ) : (
        <Button as={Link} to="/login" $variant="primary" className={className}>
            Login
        </Button>
    );
}

export default AuthButton;
