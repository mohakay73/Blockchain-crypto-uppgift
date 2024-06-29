import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Register from './Register';
import '../css/login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const data = await response.json();
      console.log(data); // Handle successful login response

      // Store the token and navigate to the profile page
      login(data.token, data.user); // Assuming data.user contains user details
      navigate('/mainpage');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5001/api/v1/auth/forgotpassword',
        { email: forgotPasswordEmail }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h1 className="title">Mine</h1>
      <div className="container">
        {isRegister ? (
          <Register />
        ) : isForgotPassword ? (
          <div>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="forgot-password"
              >
                Send Reset Link
              </button>
            </form>
            <button
              onClick={() => setIsForgotPassword(false)}
              className="back-to-login"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
            <button
              onClick={() => setIsForgotPassword(true)}
              className="forgot-password"
            >
              Forgot Password?
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className="register"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
