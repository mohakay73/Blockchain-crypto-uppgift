import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  mineTransactions,
  getTransactions,
} from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route('/transaction').post(addTransaction);
router.route('/transactions/pool').get(getTransactionPool);
router.route('/transactions').get(getTransactions);
router.route('/mine').post(mineTransactions);
router.route('/info').get(getWalletBalance);

export default router;
