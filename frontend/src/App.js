import React from 'react';
import './App.css';
import Header from './components/header';
import LoginPage from './pages/loginPage';
import Dashboard from './pages/guard/dashboard';
import Consultation from './pages/guard/consultation';
import Vaccination from './pages/guard/vaccination';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
        <Router>
            {<Header/>}
            <Routes>
                {/* Public pages */}
                <Route path='/' element={<LoginPage/>} />
                {/* Guarded pages */}
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/register_consultation' element={<Consultation/>} />
                <Route path='/register_vaccination' element={<Vaccination/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App;
