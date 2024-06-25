// src/components/MakeTransaction.js
import React, { useState } from 'react';
import axios from 'axios';

const MakeTransaction = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/v1/wallet/transaction', {
        amount,
        recipient,
      });
      setMessage('Transaction successful!');
    } catch (error) {
      setMessage('Transaction failed!');
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>Make a Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MakeTransaction;
