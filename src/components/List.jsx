import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; 


  const List = () => {
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('http://localhost:8080/api/volunteers');
        setVolunteers(result.data);
      };
      fetchData();
    }, []);

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/api/volunteers/${id}`);
        alert('Helfer erfolgreich entfernt');
        // Aktualisieren Sie die Liste der Volunteers nach dem Löschen
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
              <p class="edit">
                <Link to={`/edit/${volunteer.id}`}>Edit</Link>
              </p>
              <button className="delete-button" onClick={() => handleDelete(volunteer.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default List;
