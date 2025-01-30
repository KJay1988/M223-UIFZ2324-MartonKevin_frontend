import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from './Api';

const Register = () => {
    const [formData, setFormData] = useState({ 
        vorname: '', 
        name: '', 
        username: '',  // ✅ Benutzername hinzugefügt
        password: '', 
        gender: 'MALE',  // ✅ Standardwert für Gender
        einsatzort: '',  // ✅ Einsatzort hinzugefügt
        role: { id: 3 }  // ✅ Standardmäßig "HELPER"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.post('/auth/register', formData);
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
                <input type="text" name="username" placeholder="Benutzername" onChange={handleChange} required /> {/* ✅ Benutzername */}
                <input type="password" name="password" placeholder="Passwort" onChange={handleChange} required />
                
                {/* Dropdown für Gender */}
                <select name="gender" onChange={handleChange} required>
                    <option value="MALE">Männlich</option>
                    <option value="FEMALE">Weiblich</option>
                    <option value="DIVERSE">Divers</option>
                </select>

                {/* Textfeld für Einsatzort */}
                <input type="text" name="einsatzort" placeholder="Einsatzort" onChange={handleChange} required />

                <button type="submit">Registrieren</button>
            </form>
        </div>
    );
};

export default Register;
