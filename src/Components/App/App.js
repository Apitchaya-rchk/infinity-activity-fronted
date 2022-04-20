// import React from 'react';
import ResponsiveNavbar from '../ResponsiveNavbar/ResponsiveNavbar';
import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import AddJourney from '../AddJourney/AddJourney';
import Dashboard from '../Dashboard/Dashboard';
import Edit from '../Edit/Edit';
import { useEffect, useState } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  return (
    <div className='App'>
      <Router>
        <ResponsiveNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addjourney" element={<AddJourney />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
        {/* <Home /> */}
        {/* <Register /> */}
        {/* <Login /> */}
      </Router>

      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          🔝
        </button>
      )}

    </div>



  );
}

export default App;
