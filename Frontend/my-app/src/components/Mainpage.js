import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MakeTransaction from './MakeTransaction';
import ListTransactions from './ListTransactions';
import ListBlocks from './ListBlocks';
import Mine from './Mine';
import '../css/mainPage.css'; // Import the CSS file

const Mainpage = () => {
  const [activeView, setActiveView] = useState('transaction');
  const navigate = useNavigate();

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
    <div className="mainpage-container">
      <nav className="menu">
        <button onClick={() => setActiveView('transaction')}>
          Make a Transaction
        </button>
        <button onClick={() => setActiveView('transactions')}>
          List Transactions
        </button>
        <button onClick={() => setActiveView('blocks')}>List Blocks</button>
        <button onClick={() => setActiveView('mine')}>Mine</button>
        <button onClick={() => navigate('/login')}>Main Page</button>
      </nav>
      <div className="content">{renderActiveView()}</div>
    </div>
  );
};

export default Mainpage;
