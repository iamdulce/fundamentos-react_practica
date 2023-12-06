import { Link } from "react-router-dom";
import AuthButton from "../../pages/auth/components/AuthButton";
import logo from "../../assets/logo.svg";
import "./styles/Header.css";

console.log(logo);

function Header() {
    return (
        <header className="header">
            <Link to="/">
                <div>
                    <img src={logo} alt="darth-vader-icon" />
                </div>
            </Link>
            <nav>
                <AuthButton className="header-button" />
            </nav>
        </header>
    );
}

export default Header;
