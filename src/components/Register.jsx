import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from './Api';

const Register = () => {
    const [formData, setFormData] = useState({
        vorname: '',
        name: '',
        geburtsdatum: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Automatische Generierung des Benutzernamens
        const generatedUsername = formData.vorname.toLowerCase() + '.' + formData.name.toLowerCase();

        const requestData = {
            ...formData,
            username: generatedUsername
        };

        try {
            await Api.post('/auth/register', requestData);
            alert('Registrierung erfolgreich! Jetzt einloggen.');
            navigate('/login');
        } catch (error) {
            console.error('Registrierungsfehler:', error);
            alert('Registrierung fehlgeschlagen: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>Registrieren</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="vorname" placeholder="Vorname" onChange={handleChange} required />
                <input type="text" name="name" placeholder="Nachname" onChange={handleChange} required />
                <input type="date" name="geburtsdatum" placeholder="Geburtsdatum" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Passwort" onChange={handleChange} required />
                <button type="submit">Registrieren</button>
            </form>
        </div>
    );
};

export default Register;
