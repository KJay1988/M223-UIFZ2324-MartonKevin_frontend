import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== "ADMIN") {
      alert("Zugriff verweigert! Nur Admins dürfen die Helferliste sehen.");
      navigate("/dashboard"); // Falls kein Admin, dann Dashboard anzeigen
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

  return (
      <div className="list-container">
        <h2>Helferliste</h2>
        <ul>
          {volunteers.map(volunteer => (
              <li key={volunteer.id}>
                {volunteer.vorname} {volunteer.name}
                <button className="delete-button" onClick={() => handleDelete(volunteer.id)}>Löschen</button>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default List;
