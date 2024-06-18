import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/resetpassword/${token}`, { password });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
