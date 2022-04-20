// import React from 'react';
import ResponsiveNavbar from '../ResponsiveNavbar/ResponsiveNavbar';
import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import AddJourney from '../AddJourney/AddJourney';
import Dashboard from '../Dashboard/Dashboard';
import Edit from '../Edit/Edit';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";


function App() {


  return (
    <div className='App'>
      <Router>
        <ResponsiveNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addjourney" element={<AddJourney />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<Edit/>} />
        </Routes>
        {/* <Home /> */}
        {/* <Register /> */}
        {/* <Login /> */}
      </Router>
    </div>



  );
}

export default App;
