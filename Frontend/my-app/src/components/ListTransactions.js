import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/listTransactions.css';

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
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blockchain-container">
      <h1 className="title">Transactions</h1>
      {transactions.length === 0 ? (
        <p className="no-blocks">No transactions found</p>
      ) : (
        <ul>
          {transactions.map((transaction) => {
            const sender = transaction.inputMap.address;
            const [recipient, amount] = Object.entries(
              transaction.outputMap
            )[0];

            return (
              <li
                key={transaction.id}
                className="block"
              >
                <p className="block-title">Transaction ID: {transaction.id}</p>
                <div className="block-content">
                  <p>Sender: {sender}</p>
                  <p>Recipient: {recipient}</p>
                  <p>Amount: {amount}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListTransactions;
