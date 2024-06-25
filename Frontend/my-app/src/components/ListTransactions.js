// src/components/ListTransactions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5001/api/v1/wallet/transactions'
        );
        setTransactions(res.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Transactions</h1>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>Transaction ID: {transaction.id}</p>
              <p>Amount: {transaction.outputMap.amount}</p>
              <p>Recipient: {transaction.outputMap.recipient}</p>
              <p>Sender: {transaction.inputMap.address}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListTransactions;
