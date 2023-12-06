import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context";
import { login } from "./service";
import { useState } from "react";

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={handleChange}
                    value={email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    value={password}
                />
                <button type="submit">Submit</button>
                {error && <div>{error.message}</div>}
            </form>
        </div>
    );
}

export default LoginPage;
