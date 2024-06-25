// src/components/Mainpage.js
import React, { useState } from 'react';
import MakeTransaction from './MakeTransaction';
import ListTransactions from './ListTransactions';
import ListBlocks from './ListBlocks';
import Mine from './Mine';

const Mainpage = () => {
  const [activeView, setActiveView] = useState('transaction');

  const renderActiveView = () => {
    switch (activeView) {
      case 'transaction':
        return <MakeTransaction />;
      case 'transactions':
        return <ListTransactions />;
      case 'blocks':
        return <ListBlocks />;
      case 'mine':
        return <Mine />;
      default:
        return <MakeTransaction />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setActiveView('transaction')}>
          Make a Transaction
        </button>
        <button onClick={() => setActiveView('transactions')}>
          List Transactions
        </button>
        <button onClick={() => setActiveView('blocks')}>List Blocks</button>
        <button onClick={() => setActiveView('mine')}>Mine</button>
      </nav>
      <h1>Main Page</h1>
      {renderActiveView()}
    </div>
  );
};

export default Mainpage;
