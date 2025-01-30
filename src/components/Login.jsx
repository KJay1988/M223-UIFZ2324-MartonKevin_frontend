import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Api.post("/auth/login", credentials);
            localStorage.setItem("token", response.data.token); // Speichert das JWT
            navigate("/dashboard"); // Nach erfolgreichem Login zur Dashboard-Seite
        } catch (err) {
            setError("Login fehlgeschlagen! Überprüfe Benutzername & Passwort.");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Benutzername:
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                </label>
                <label>
                    Passwort:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
