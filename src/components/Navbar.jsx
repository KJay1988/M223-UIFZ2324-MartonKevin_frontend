import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Startseite</Link>
    <p></p>
    <Link to="/add">Helferregistrierung</Link>
  </nav>
);

export default Navbar;
