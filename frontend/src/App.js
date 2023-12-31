import React from 'react';
import './App.css';
import Header from './components/header';
import LoginPage from './pages/loginPage';
import Dashboard from './pages/guard/dashboard';

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
            </Routes>
        </Router>
    </>
  )
}

export default App;
