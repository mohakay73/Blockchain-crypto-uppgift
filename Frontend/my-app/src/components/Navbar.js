// components/Navbar.js
import React from 'react';

const Navbar = ({ setActiveView }) => {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => setActiveView('transaction')}>
            Make a Transaction
          </button>
        </li>
        <li>
          <button onClick={() => setActiveView('transactions')}>
            List Transactions
          </button>
        </li>
        <li>
          <button onClick={() => setActiveView('blocks')}>List Blocks</button>
        </li>
        <li>
          <button onClick={() => setActiveView('mine')}>Mine</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
