import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import List from './components/List';
import EditForm from './components/EditForm';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/add" element={<Form />} />
      <Route path="/edit/:id" element={<EditForm />} />
    </Routes>
  </Router>
);

export default App;
