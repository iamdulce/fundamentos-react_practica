import { logout } from "../../pages/auth/service";
import { useAuth } from "../../pages/auth/context";
import { Link } from "react-router-dom";

console.log(logo);

function Header() {
    const { isLogged, onLogout } = useAuth();

    const handleLogoutClick = async () => {
        await logout();
        onLogout();
    };

    return (
        <header>
            <Link to="/">
                <div>
                    <p>Logo</p>
                </div>
            </Link>
            <nav>
                <p>Here will go a button</p>
            </nav>
        </header>
    );
}

export default Header;
