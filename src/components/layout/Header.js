import { Link, NavLink } from "react-router-dom";
import AuthButton from "../../pages/auth/components/AuthButton";
import logo from "../../assets/logo.svg";
import "./styles/Header.css";
import clsx from "clsx";

const navItemClassName = ({ isActive }) =>
    clsx("header-nav_item", { active: isActive });

function Header() {
    return (
        <header className="header">
            <Link to="/">
                <div>
                    <img src={logo} alt="moon-icon" />
                </div>
            </Link>
            <nav className="header-nav">
                <NavLink to="/adverts/new" className={navItemClassName}>
                    Create ad
                </NavLink>
                <NavLink to="/adverts" end className={navItemClassName}>
                    See all ads
                </NavLink>
                <AuthButton className="header-button" />
            </nav>
        </header>
    );
}

export default Header;
