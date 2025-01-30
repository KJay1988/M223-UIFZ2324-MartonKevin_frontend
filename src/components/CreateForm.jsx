import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";

const CreateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vorname: "",
        name: "",
        geburtsdatum: "",
        gender: "MALE",
        einsatzort: "Bar"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.post("/volunteers", formData);
            alert("Helfer erfolgreich hinzugefügt!");
            navigate("/");
        } catch (error) {
            alert("Fehler beim Hinzufügen des Helfers.");
        }
    };

    return (
        <div className="form-container">
            <h2>Helferregistrierung</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Vorname:
                    <input type="text" name="vorname" value={formData.vorname} onChange={handleChange} required />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Geburtsdatum:
                    <input type="date" name="geburtsdatum" value={formData.geburtsdatum} onChange={handleChange} required />
                </label>
                <label>
                    Geschlecht:
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="MALE">Männlich</option>
                        <option value="FEMALE">Weiblich</option>
                        <option value="DIVERSE">Divers</option>
                    </select>
                </label>
                <label>
                    Einsatzort:
                    <select name="einsatzort" value={formData.einsatzort} onChange={handleChange}>
                        <option value="Bar">Bar</option>
                        <option value="Küche">Küche</option>
                        <option value="Service">Service</option>
                    </select>
                </label>
                <button type="submit">Helfer hinzufügen</button>
            </form>
        </div>
    );
};

export default CreateForm;
