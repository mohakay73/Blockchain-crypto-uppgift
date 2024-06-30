import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import MakeTransaction from './MakeTransaction';
import ListTransactions from './ListTransactions';
import ListBlocks from './ListBlocks';
import Mine from './Mine';
import '../css/mainPage.css'; // Import the CSS file

const Mainpage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="menu">
        <Link to="/mainpage/transaction">Make a Transaction</Link>
        <Link to="/mainpage/transactions">List Transactions</Link>
        <Link to="/mainpage/blocks">List Blocks</Link>
        <Link to="/mainpage/mine">Mine</Link>
        <button onClick={() => navigate('/login')}>Main Page</button>
      </nav>
      <div className="content">
        <Routes>
          <Route
            path="transaction"
            element={<MakeTransaction />}
          />
          <Route
            path="transactions"
            element={<ListTransactions />}
          />
          <Route
            path="blocks"
            element={<ListBlocks />}
          />
          <Route
            path="mine"
            element={<Mine />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Mainpage;
