import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/festival.PNG';

const Home = () => {
    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Inhalt nach oben schieben
            alignItems: 'center',
            paddingTop: '10vh', // Abstand vom oberen Rand (anpassbar)
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            textAlign: 'center',
        },
        content: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Halbtransparenter Hintergrund für bessere Lesbarkeit
            padding: '20px',
            borderRadius: '10px',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        },
        buttonContainer: {
            marginTop: '20px',
        },
        button: {
            margin: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1>Willkommen zur Helferverwaltung</h1>
                <p>Bitte logge dich ein oder registriere dich, um fortzufahren.</p>
                <div style={styles.buttonContainer}>
                    <Link to="/login">
                        <button style={styles.button}>Login</button>
                    </Link>
                    <Link to="/register">
                        <button style={styles.button}>Registrieren</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
