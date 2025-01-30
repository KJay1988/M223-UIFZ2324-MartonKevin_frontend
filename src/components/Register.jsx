import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";
import backgroundImage from "../assets/background_register.PNG"; // ✅ Hintergrundbild importieren

const Register = () => {
    const [formData, setFormData] = useState({
        vorname: "",
        name: "",
        geburtsdatum: "",
        password: ""
    });
    const [message, setMessage] = useState(null); // ✅ Erfolgs- oder Fehlermeldung
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); // Zurücksetzen der Nachricht

        // ✅ Automatische Generierung des Benutzernamens
        const generatedUsername = formData.vorname.toLowerCase() + "." + formData.name.toLowerCase();

        const requestData = {
            ...formData,
            username: generatedUsername
        };

        try {
            await Api.post("/auth/register", requestData);
            setMessage({ type: "success", text: "Sie wurden erfolgreich registriert! 😊" });

            // Formularfelder leeren
            setFormData({
                vorname: "",
                name: "",
                geburtsdatum: "",
                password: ""
            });

            // ⏳ Weiterleitung nach 2 Sekunden zur Login-Seite
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Registrierungsfehler:", error);
            setMessage({ type: "error", text: "Registrierung fehlgeschlagen: " + (error.response?.data || error.message) });
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Helferregistrierung</h2>

            {/* ✅ Zeigt eine Erfolgsmeldung oder eine Fehlermeldung an */}
            {message && (
                <div style={message.type === "success" ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" name="vorname" placeholder="Vorname" onChange={handleChange} value={formData.vorname} required style={styles.input} />
                <input type="text" name="name" placeholder="Nachname" onChange={handleChange} value={formData.name} required style={styles.input} />
                <input type="date" name="geburtsdatum" onChange={handleChange} value={formData.geburtsdatum} required style={styles.input} />
                <input type="password" name="password" placeholder="Passwort" onChange={handleChange} value={formData.password} required style={styles.input} />
                <button type="submit" style={styles.button}>Registrieren</button>
            </form>
        </div>
    );
};

// ✅ Stildefinitionen für modernes Design mit Hintergrundbild
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
        backgroundColor: "rgba(255, 255, 255, 0.9)", // ✅ Leicht transparenter Hintergrund
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    input: {
        width: "300px",
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
        color: "green",
        backgroundColor: "#d4edda",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
    },
    errorMessage: {
        color: "red",
        backgroundColor: "#f8d7da",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
    }
};

export default Register;
