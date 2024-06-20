import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import PrivateRoute from './utils/PrivateRoute';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />{' '}
          {/* Default Route */}
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
            element={<PrivateRoute component={Profile} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
