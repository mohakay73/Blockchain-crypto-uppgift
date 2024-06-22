import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1/auth';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserDetails = async (userData, token) => {
  const response = await axios.put(`${API_URL}/updateuser`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updatePassword = async (passwordData, token) => {
  const response = await axios.put(`${API_URL}/updatepassword`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgotpassword`, { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.put(`${API_URL}/resetpassword/${token}`, {
    password,
  });
  return response.data;
};
