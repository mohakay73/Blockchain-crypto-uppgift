import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
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
        if (response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
        );
      }

      const data = await response.json();
      console.log(data);

      login(data.token, data.user);
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

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="wrapper">
      <h1 className="title">MintX</h1>
      <div className="container">
        {isForgotPassword ? (
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
            {error && <p className="error">{error}</p>}{' '}
            {/* Display error message */}
            <button
              onClick={() => setIsForgotPassword(true)}
              className="forgot-password"
            >
              Forgot Password?
            </button>
            <button
              onClick={handleRegister}
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
