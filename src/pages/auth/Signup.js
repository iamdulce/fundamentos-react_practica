import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup } from "./service";
import Button from "../../components/shared/Button";
import FormInput from "../../components/shared/FormInput";
import "./styles/SessionPages.css";
import Layout from "../../components/layout/Layout";

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
        <Layout>
            <div className="sessionPage">
                <h1 className="sessionPage-title">Signup</h1>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        name="email"
                        label="email"
                        className="sessionForm-field"
                        onChange={handleChange}
                        value={email}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        label="password"
                        className="sessionForm-field"
                        onChange={handleChange}
                        value={password}
                    />
                    <FormInput
                        type="text"
                        name="username"
                        label="username"
                        className="sessionForm-field"
                        onChange={handleChange}
                        value={username}
                    />
                    <FormInput
                        type="text"
                        name="name"
                        label="name"
                        className="sessionForm-field"
                        onChange={handleChange}
                        value={name}
                    />
                    <Button
                        type="submit"
                        $variant="primary"
                        className="sessionForm-submit"
                    >
                        Sign up
                    </Button>
                    {error && (
                        <div className="sessionPage-error">{error.message}</div>
                    )}
                </form>
            </div>
        </Layout>
    );
}

export default SignupPage;
