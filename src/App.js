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
                <Route path="/ressort" element={<Ressort />} />
                <Route path="/deployment" element={<Deployment />} />

            </Routes>
        </Router>
    );
};

export default App;
