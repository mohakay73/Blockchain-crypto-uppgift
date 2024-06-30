import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      console.log(data);

      setFormData({ name: '', email: '', password: '' });
      setMessage('Registration successful! Redirecting to login...');

      setTimeout(() => {
        setMessage('');
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Registration failed. Please try again.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form
        className="registerForm"
        onSubmit={onSubmit}
      >
        <div className="form-groupRegister">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-groupRegister">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-groupRegister">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button
          className="bRegister"
          type="submit"
        >
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
      <button
        className="bLogin"
        onClick={handleGoToLogin}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Register;
