import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup } from "./service";

function SignupPage() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        username: "",
        name: "",
    });
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await signup(credentials);

            const to = location?.state?.from.pathname || "/login";
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

    const { email, password, username, name } = credentials;

    return (
        <div>
            <h1>Signup</h1>
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
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={handleChange}
                    value={username}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                    value={name}
                />
                <button type="submit">Submit</button>
                {error && <div>{error.message}</div>}
            </form>
        </div>
    );
}

export default SignupPage;

// Data:
// dulce@kc.com
// 12345
// dulcekc
// dulcekc
