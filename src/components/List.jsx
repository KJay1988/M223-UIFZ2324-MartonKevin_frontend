import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background_list.PNG'; // ✅ Hintergrundbild importieren

const List = () => {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== "ADMIN") {
      alert("Zugriff verweigert! Nur Admins dürfen die Helferliste sehen.");
      navigate("/dashboard");
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get('http://localhost:8080/api/volunteers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVolunteers(result.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Helferliste", error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/volunteers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert('Helfer erfolgreich entfernt');
      setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
    } catch (error) {
      alert('Helfer konnte NICHT entfernt werden');
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
        return "#27AE10"; // Standardfarbe
    }
  };

  return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Helferliste</h2>
        <ul style={styles.list}>
          {volunteers.map(volunteer => (
              <li key={volunteer.id} style={{ ...styles.listItem, borderLeft: `11px solid ${getRoleColor(volunteer.role?.id)}` }}>
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

// ✅ Stildefinitionen für eine moderne, farbcodierte Liste mit größerem Farbbalken & mehr Abstand
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Links ausrichten
    justifyContent: 'flex-start',
    height: '100vh',
    padding: '20px',
    backgroundImage: `url(${backgroundImage})`, // ✅ Hintergrundbild
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    width: '350px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '8px',
    marginBottom: '6px',
    borderRadius: '8px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    borderLeft: '11px solid #BDC3C7', // Standard-Fallback-Farbe, jetzt 11px breit
  },
  volunteerName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    paddingLeft: '10px', // 🔹 Namen etwas weiter nach rechts verschoben
  },
  buttonContainer: {
    display: 'flex',
    gap: '5px',
  },
  editButton: {
    backgroundColor: '#FFB266', // Pastellorange
    color: '#fff',
    padding: '5px 8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#FF6666', // Leichtes Rot
    color: '#fff',
    padding: '5px 8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.3s ease',
  },
};

// ✅ Hover-Effekt für Delete-Button (Satt-Rot)
styles.deleteButton[":hover"] = { backgroundColor: "#D32F2F" };

export default List;
