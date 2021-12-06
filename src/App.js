import React from 'react'; 
import './App.css';
import Login from './components/login';
import Register from './components/register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from './components/profile';
import Speech_to_text from './components/speech_to_text';

function App() {

  return(
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={ <Profile />} /> 
        <Route path="/game" element={ <Speech_to_text />} />
      </Routes>
    </Router>
  );
}

export default App

// TODO: Authorized Validation