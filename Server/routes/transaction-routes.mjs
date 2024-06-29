import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  mineTransactions,
  getTransactions, // Import the getTransactions controller
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transaction').post(addTransaction);
router.route('/transactions/pool').get(getTransactionPool); // Rename this route to make it more descriptive
router.route('/transactions').get(getTransactions); // Add this route to get all transactions from the database
router.route('/mine').post(mineTransactions);
router.route('/info').get(getWalletBalance);

export default router;
