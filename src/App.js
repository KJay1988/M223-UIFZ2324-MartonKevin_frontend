import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import List from './components/List';
import EditForm from './components/EditForm';
import Ressort from './components/Ressort';
import Deployment from './components/Deployment';

import Bar from './components/Bar';
import Chai from './components/Chai';
import Hang from './components/Hang';
import Infostand from './components/Infostand';
import Kasse from './components/Kasse';


const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/list" element={<List />} />
                <Route path="/edit/:id" element={<EditForm />} />
                <Route path="/ressort/:ressort" element={<Ressort />} /> {/* ✅ Korrekt */}
                <Route path="/deployment" element={<Deployment />} />

                <Route path="/ressort/bar" element={<Bar />} />
                <Route path="/ressort/chai" element={<Chai />} />
                <Route path="/ressort/hang" element={<Hang />} />
                <Route path="/ressort/infostand" element={<Infostand />} />
                <Route path="/ressort/kasse" element={<Kasse />} />
            </Routes>
        </Router>
    );
};

export default App;
