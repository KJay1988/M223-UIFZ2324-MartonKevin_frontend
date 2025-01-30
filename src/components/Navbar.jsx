import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', background: '#f4f4f4', textAlign: 'center' }}>
            <Link to="/" style={{ margin: '10px' }}>Startseite</Link>
            <Link to="/login" style={{ margin: '10px' }}>Login</Link>
            <Link to="/register" style={{ margin: '10px' }}>Registrieren</Link>
        </nav>
    );
};

export default Navbar;
