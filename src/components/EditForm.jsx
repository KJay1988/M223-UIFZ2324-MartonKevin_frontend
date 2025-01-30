import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/background_edit.PNG"; // ✅ Hintergrundbild importieren

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vorname: "",
    name: "",
    geburtsdatum: "",
    einsatzort: "Bar",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/volunteers/${id}`);
        setFormData(result.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        setMessage({ type: "error", text: "Fehler beim Abrufen der Daten!" });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/volunteers/${id}`, formData);
      setMessage({ type: "success", text: "Helfer erfolgreich angepasst! 😊" });

      setTimeout(() => navigate("/list"), 2000);
    } catch (error) {
      console.error("Helfer NICHT angepasst:", error);
      setMessage({ type: "error", text: "Fehler beim Speichern der Änderungen!" });
    }
  };

  return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Helfer bearbeiten</h2>

        {/* ✅ Zeigt eine Erfolgsmeldung oder eine Fehlermeldung an */}
        {message && (
            <div style={message.type === "success" ? styles.successMessage : styles.errorMessage}>
              {message.text}
            </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="vorname" placeholder="Vorname" value={formData.vorname} onChange={handleChange} required style={styles.input} />
          <input type="text" name="name" placeholder="Nachname" value={formData.name} onChange={handleChange} required style={styles.input} />
          <input type="date" name="geburtsdatum" value={formData.geburtsdatum} onChange={handleChange} required style={styles.input} />

          <select name="einsatzort" value={formData.einsatzort} onChange={handleChange} required style={styles.input}>
            <option value="Bar">Bar</option>
            <option value="Kasse">Kasse</option>
            <option value="Hang">Hang</option>
            <option value="Infostand">Infostand</option>
            <option value="Chai">Chai</option>
          </select>

          <button type="submit" style={styles.button}>Änderungen speichern</button>
        </form>
      </div>
  );
};

// ✅ **100% identisches Design wie `Register.jsx`**
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
  },
};

export default EditForm;
