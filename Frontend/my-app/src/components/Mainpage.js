import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MakeTransaction from './MakeTransaction';
import ListTransactions from './ListTransactions';
import ListBlocks from './ListBlocks';
import Mine from './Mine';
import Layout from './Layout';
import '../css/mainPage.css';

const Mainpage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
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
      </Route>
    </Routes>
  );
};

export default Mainpage;
