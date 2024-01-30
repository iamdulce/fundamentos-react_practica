import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "./context";
import { login } from "./service";
import { useState } from "react";
import Button from "../../components/shared/Button";
import FormInput from "../../components/shared/FormInput";
import "./styles/SessionPages.css";
import { NavLink } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { authLogin } from "../../store/actions";

function LoginPage() {
    const dispatch = useDispatch();
    // const { onLogin } = useAuth();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const onLogin = () => {
        dispatch(authLogin());
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await login(credentials, rememberUser);
            onLogin();

            const to = location?.state?.from.pathname || "/";
            navigate(to);
        } catch (error) {
            setError(error);
        }
    };

    const handleChange = event => {
        setCredentials(currentCredentials => ({
            ...currentCredentials,
            [event.target.name]: event.target.value,
        }));
    };

    const [rememberUser, setRememberUser] = useState(false);
    const { email, password } = credentials;
    const buttonDisabled = !(email && password);

    return (
        <Layout>
            <div className="sessionPage">
                <h1 className="sessionPage-title">Log In</h1>
                <form className="sessionForm" onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        name="email"
                        label="email"
                        className="sessionForm-field"
                        onChange={handleChange}
                        value={email}
                        autofocus
                    />
                    <FormInput
                        type="password"
                        name="password"
                        label="password"
                        className="sessionForm-field"
                        onChange={handleChange}
                        value={password}
                    />
                    <input
                        className="rememberCheck"
                        label="Remeber me"
                        type="checkbox"
                        name="rememberUser"
                        checked={rememberUser}
                        onChange={() => setRememberUser(!rememberUser)}
                    />
                    <span>Remember me</span>
                    <Button
                        type="submit"
                        $variant="primary"
                        className="sessionForm-submit"
                        disabled={buttonDisabled}
                    >
                        Log in
                    </Button>
                    {error && (
                        <div className="sessionPage-error">{error.message}</div>
                    )}
                </form>
                <br />
                <div>
                    Don't have an account?
                    <NavLink to="/signup"> Create one here!</NavLink>
                </div>
            </div>
        </Layout>
    );
}

export default LoginPage;
