import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'; 

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vorname: '',
    name: '',
    geburtsdatum: '',
    geschlecht: '',
    einsatzort: 'Bar'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/volunteers/${id}`);
        setFormData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', formData); // Log the data being sent
    try {
      const response = await axios.put(`http://localhost:8080/api/volunteers/${id}`, formData);
      alert('Helfer erfolgreich angepasst');
      navigate('/');
    } catch (error) {
      console.error('Helfer NICHT angepasst:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Helfer NICHT angepasst: ${error.response.data.message || error.response.data || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Request data:', error.request);
        alert('Helfer NICHT angepasst: Keine Rückmeldung vom Server :`(');
      } else {
        // Something else happened in setting up the request
        console.error('Fehlermeldung:', error.message);
        alert(`Helfer NICHT angepasst: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Helfer bearbeiten</h2>
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

export default EditForm;
