import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background_deployment.PNG"; // ✅ Hintergrundbild importieren

const Deployment = () => {
    const [deployments, setDeployments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (userRole !== "HELFER") {
            alert("Zugriff verweigert! Diese Seite ist nur für Helfer.");
            navigate("/dashboard");
            return;
        }

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await axios.get("http://localhost:8080/api/deployments", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setDeployments(result.data); // ✅ Einsätze setzen
            } catch (error) {
                console.error("Fehler beim Abrufen der Arbeitseinsätze", error);
            }
        };
        fetchData();
    }, [navigate]);

    // ✅ Funktion zur Ermittlung der Farbe basierend auf dem Ressort
    const getRessortColor = (ressort) => {
        switch (ressort.toLowerCase()) {
            case "bar":
                return "#8E44AD"; // Violett für Bar
            case "kasse":
                return "#F4A62A"; // Senfgelb für Kasse
            case "hang":
                return "#27AE60"; // Grün für Hang
            case "infostand":
                return "#3498DB"; // Blau für Infostand
            case "chai":
                return "#E74C3C"; // Rot für Chai
            default:
                return "#BDC3C7"; // Grau als Standard
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Verfügbare Arbeitseinsätze</h2>
            <div style={styles.gridContainer}>
                {deployments.map(deployment => (
                    <div key={deployment.id} style={{ ...styles.card, borderLeft: `10px solid ${getRessortColor(deployment.ressort)}` }}>
                        <span style={styles.deploymentTitle}>{deployment.ressort}: {deployment.aufgabe}</span>
                        <p style={styles.deploymentTime}>{deployment.zeitraum}</p>
                        <button style={styles.joinButton}>Teilnehmen</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ✅ Stile für moderne, farbcodierte Kacheln mit grid layout
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Links ausrichten ✅
        justifyContent: "flex-start", // Oben links ✅
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "30px",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "15px",
        width: "100%",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        borderLeft: "10px solid #BDC3C7", // Standard-Fallback-Farbe
    },
    deploymentTitle: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
    },
    deploymentTime: {
        fontSize: "14px",
        color: "#555",
        marginTop: "5px",
    },
    joinButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "8px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "10px",
        transition: "background 0.3s ease",
    },
};

// ✅ Hover-Effekt für Join-Button
styles.joinButton[":hover"] = { backgroundColor: "#0056b3" };

export default Deployment;
