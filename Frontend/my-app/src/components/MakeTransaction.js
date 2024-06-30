import React, { useState } from 'react';
import axios from 'axios';
import '../css/makeTransactions.css'; // Import the CSS file

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
      setAmount('');
      setRecipient('');

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('Transaction failed!');
      console.error(error.response ? error.response.data : error.message);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="transaction-container">
      <h1 className="titleTransaction">Make a Transaction</h1>
      <form
        onSubmit={handleSubmit}
        className="transaction-form"
      >
        <div className="form-group">
          <label>Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MakeTransaction;
