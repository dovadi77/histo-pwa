import React from 'react'; 
import './App.css';
import Login from './components/login';
import Register from './components/register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from './components/profile';
import Edit_Profile from './components/edit_profile';
import Speech_To_Text from './components/speech_to_text';

function App() {

  return(
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={ <Profile />} /> 
        <Route path="/edit_profile" element={<Edit_Profile />} />
        <Route path="/game" element={<Speech_To_Text />} />

      </Routes>
    </Router>
  );
}

export default App

// TODO: Authorized Validation