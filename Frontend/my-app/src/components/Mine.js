// src/components/MineTransactions.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/mineBlock.css'; // Import the CSS file for styling

const MineTransactions = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMineTransactions = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        'http://localhost:5001/api/v1/wallet/mine'
      );
      setMessage('Mining successful: ');
    } catch (error) {
      setMessage('Mining failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mine-container">
      <h2>Mine Transactions</h2>
      <button
        onClick={handleMineTransactions}
        disabled={loading}
      >
        {loading ? 'Mining...' : 'Mine Transactions'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MineTransactions;
