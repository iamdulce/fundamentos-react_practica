import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context";
import { login } from "./service";
import { useState } from "react";
import Button from "../../components/shared/Button";
import FormInput from "../../components/shared/FormInput";
import "./styles/SessionPages.css";

function LoginPage() {
    const { onLogin } = useAuth();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await login(credentials);
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

    const { email, password } = credentials;

    return (
        <div className="sessionPage">
            <h1 className="sessionPage-title">Log In</h1>
            <form onSubmit={handleSubmit}>
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
                <input label="Remeber me" type="checkbox" name="rememberUser" />
                <span>Remember me</span>
                <Button
                    type="submit"
                    $variant="primary"
                    className="sessionForm-submit"
                >
                    Log in
                </Button>
                {error && (
                    <div className="sessionPage-error">{error.message}</div>
                )}
            </form>
        </div>
    );
}

export default LoginPage;
