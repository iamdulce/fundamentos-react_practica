import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { login } from "../service";
import { useState } from "react";

function LoginPage() {
    const { onLogin } = useAuth();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const location = useLocation(); // este state es el mismo que se guardó en RequireAuth
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault(); //Esto evita que se recargue la pág antes del evento

        //gestion de errores
        try {
            await login(credentials);
            //está logeado
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

    const { username, password } = credentials;
    //const disabled = !(username && password);

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={username}
                />
                <input
                    type="password"
                    name="password"
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
