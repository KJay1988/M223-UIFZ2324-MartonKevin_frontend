import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background_infostand.PNG"; // ✅ Hintergrundbild importieren

const Infostand = () => {
    const [volunteers, setVolunteers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        if (userRole !== "OK") {
            alert("Zugriff verweigert! Diese Seite ist nur für OK-Nutzer.");
            navigate("/home");
            return;
        }

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await axios.get("http://localhost:8080/api/volunteers", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // ✅ Nur Helfer mit Einsatzort "Infostand" anzeigen
                const filteredVolunteers = result.data.filter(volunteer => volunteer.einsatzort === "Infostand");
                setVolunteers(filteredVolunteers);
            } catch (error) {
                console.error("Fehler beim Abrufen der Ressort-Liste", error);
            }
        };
        fetchData();
    }, [navigate]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/volunteers/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            alert("Helfer erfolgreich entfernt");
            setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
        } catch (error) {
            alert("Helfer konnte NICHT entfernt werden");
        }
    };

    // ✅ Funktion zur Ermittlung der Farbe basierend auf der Rolle (1, 2, 3)
    const getRoleColor = (roleId) => {
        switch (roleId) {
            case 1:
                return "#8E44AD"; // Violett für ADMIN
            case 2:
                return "#F4A62A"; // Senfgelb für OK
            case 3:
                return "#27AE60"; // Grün für HELFER
            default:
                return "#27AE10";
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Helfer im Ressort Infostand</h2>
            <ul style={styles.list}>
                {volunteers.map(volunteer => (
                    <li key={volunteer.id} style={{ ...styles.listItem, borderLeft: `10px solid ${getRoleColor(volunteer.role.id)}` }}>
                        <span style={styles.volunteerName}>{volunteer.vorname} {volunteer.name}</span>
                        <div style={styles.buttonContainer}>
                            <button style={styles.editButton} onClick={() => navigate(`/edit/${volunteer.id}`)}>✏️</button>
                            <button style={styles.deleteButton} onClick={() => handleDelete(volunteer.id)}>🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ✅ Stile für moderne, farbcodierte Helfer-Liste mit linksbündigem Layout
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
    list: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
        width: "350px",
    },
    listItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px",
        marginBottom: "6px",
        borderRadius: "8px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        borderLeft: "10px solid #BDC3C7", // Standard-Fallback-Farbe
    },
    volunteerName: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        paddingLeft: "10px", // 🔹 Namen leicht nach rechts verschieben
    },
    buttonContainer: {
        display: "flex",
        gap: "5px",
    },
    editButton: {
        backgroundColor: "#FFB266", // Pastellorange
        color: "#fff",
        padding: "5px 8px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 0.3s ease",
    },
    deleteButton: {
        backgroundColor: "#FF6666", // Leichtes Rot
        color: "#fff",
        padding: "5px 8px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 0.3s ease",
    },
};

// ✅ Hover-Effekt für Delete-Button (Satt-Rot)
styles.deleteButton[":hover"] = { backgroundColor: "#D32F2F" };

export default Infostand;
