import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const CreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vorname: '',
    name: '',
    geburtsdatum: '',
    geschlecht: '',
    einsatzort: 'Bar'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to create a new volunteer
      await axios.post('http://localhost:8080/api/volunteers', formData);
      alert('Helfer erfolgreich hizugefügt :)');
      navigate('/');
    } catch (error) {
      console.error('Helfer NICHT hizugefügt:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        alert(`Helfer NICHT hizugefügt: ${error.response.data.message || 'unbekannter Fehler'}`);
      } else if (error.request) {
        // Request was made but no response was received
        alert('Helfer NICHT hizugefügt: Keine rückmeldung vom Server');
      } else {
        // Something else happened in setting up the request
        alert(`Helfer NICHT hizugefügt: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Helferregistrierung</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vorname:
          <input
            type="text"
            name="vorname"
            value={formData.vorname}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Geburtsdatum:
          <input
            type="date"
            name="geburtsdatum"
            value={formData.geburtsdatum}
            onChange={handleChange}
          />
        </label>
        <label>
          Geschlecht:
          <select
            name="geschlecht"
            value={formData.geschlecht}
            onChange={handleChange}
          >
            <option value="männlich">männlich</option>
            <option value="weiblich">weiblich</option>
            <option value="divers">divers</option>
          </select>
        </label>
        <label>
          Einsatzort:
          <select
            name="einsatzort"
            value={formData.einsatzort}
            onChange={handleChange}
          >
            <option value="Bar">Bar</option>
            <option value="Küche">Küche</option>
            <option value="Service">Service</option>
          </select>
        </label>
        <button type="submit">Abschicken</button>
      </form>
    </div>
  );
};

export default CreateForm;
