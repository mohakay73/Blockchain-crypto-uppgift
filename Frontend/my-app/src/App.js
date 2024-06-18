import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import Home from './components/Home'; // Import the Home component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />{' '}
        {/* Add this line */}
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword />}
        />
        <Route
          path="/resetpassword/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </Router>
  );
};

export default App;
