import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Willkommen zur Helferverwaltung</h1>
            <p>Bitte logge dich ein oder registriere dich, um fortzufahren.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Login</button>
                </Link>
                <Link to="/register">
                    <button style={{ margin: '10px', padding: '10px 20px' }}>Registrieren</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
