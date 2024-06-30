// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../css/mainPage.css';

const Layout = () => {
  return (
    <div className="mainpage-container">
      <nav className="menu">
        <Link to="/mainpage/transaction">Make a Transaction</Link>
        <Link to="/mainpage/transactions">List Transactions</Link>
        <Link to="/mainpage/blocks">List Blocks</Link>
        <Link to="/mainpage/mine">Mine</Link>
        <Link to="/login">Main Page</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
