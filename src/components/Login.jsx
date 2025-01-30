import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";
import backgroundImage from "../assets/background_login.PNG"; // ✅ Hintergrundbild importieren

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

        // ✅ Fehlermeldung nur bei neuer Eingabe löschen
        if (message?.type === "error") {
            setMessage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Api.post("/auth/login", credentials);

            // Debugging: API-Antwort in der Konsole anzeigen
            console.log("API Response:", response.data);

            // Speichere das Token und die Rolle
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            console.log("Gespeicherte Rolle:", localStorage.getItem("role"));

            // ✅ Erfolgreiche Anmeldung → Erfolgsmeldung anzeigen und weiterleiten
            if (response.data.role === "ADMIN") {
                setMessage({ type: "success", text: "Login erfolgreich! Weiterleitung zur Helferliste..." });
                setTimeout(() => navigate("/list"), 2000);
            } else {
                setMessage({ type: "success", text: "Login erfolgreich! Weiterleitung zum Dashboard..." });
                setTimeout(() => navigate("/dashboard"), 2000);
            }
        } catch (err) {
            setMessage({ type: "error", text: "Hoppla! Da ist was schiefgelaufen. :(" });
            console.error("Fehler beim Login:", err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Anmeldung</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" name="username" placeholder="Benutzername" onChange={handleChange} value={credentials.username} required style={styles.input} />
                <input type="password" name="password" placeholder="Passwort" onChange={handleChange} value={credentials.password} required style={styles.input} />
                <button type="submit" style={styles.button}>Login</button>

                {/* ✅ Fehlermeldung bleibt dauerhaft sichtbar */}
                {message && (
                    <div style={message.type === "success" ? styles.successMessage : styles.errorMessage}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

// ✅ Stildefinitionen für modernes Design mit Hintergrundbild & dauerhafter Fehlermeldung
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`, // ✅ Hintergrundbild
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Leicht transparenter Hintergrund
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "320px",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        outline: "none",
        transition: "border 0.3s ease",
    },
    button: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s ease",
    },
    successMessage: {
        color: "#155724",
        backgroundColor: "#d4edda", // Grüner Erfolgsbalken
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px", // Abstand unterhalb des Login-Buttons
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
    },
    errorMessage: {
        color: "#721c24",
        backgroundColor: "#f8d7da", // Pastellroter Balken
        padding: "10px",
        borderRadius: "5px",
        marginTop: "10px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
    }
};

export default Login;
