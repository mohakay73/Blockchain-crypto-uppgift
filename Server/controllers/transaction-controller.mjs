// controllers/blockchain-controller.mjs
import TransactionModel from '../models/TransactionSchema.mjs';
import { transactionPool } from '../server.mjs';
import { wallet } from '../server.mjs';
import { blockchain } from '../server.mjs';
import Miner from '../models/Miner.mjs';
import { pubnubServer } from '../server.mjs';
import Wallet from '../models/Wallet.mjs';
import ResponseModel from '../utilities/ResponseModel.mjs';

export const addTransaction = async (req, res, next) => {
  const { amount, recipient } = req.body;

  let transaction = transactionPool.transactionExist({
    address: wallet.publicKey,
  });

  try {
    if (transaction) {
      transaction.update({ sender: wallet, recipient, amount });
    } else {
      transaction = wallet.createTransaction({ recipient, amount });
    }

    // Save the transaction to MongoDB
    const transactionDoc = new TransactionModel({
      id: transaction.id,
      outputMap: transaction.outputMap,
      inputMap: transaction.inputMap,
    });

    await transactionDoc.save();
  } catch (error) {
    return res
      .status(400)
      .json(new ResponseModel({ statusCode: 400, error: error.message }));
  }

  transactionPool.addTransaction(transaction);
  pubnubServer.broadcastTransaction(transaction);

  res
    .status(201)
    .json(new ResponseModel({ statusCode: 201, data: transaction }));
};

export const getWalletBalance = (req, res, next) => {
  const address = wallet.publicKey;
  const balance = Wallet.calculateBalance({
    chain: blockchain,
    address,
  });

  res.status(200).json(
    new ResponseModel({
      statusCode: 200,
      data: { address: address, balance: balance },
    })
  );
};

export const getTransactionPool = (req, res, next) => {
  res.status(200).json(
    new ResponseModel({
      statusCode: 200,
      data: transactionPool.transactionMap,
    })
  );
};

export const mineTransactions = (req, res, next) => {
  const miner = new Miner({
    blockchain,
    transactionPool,
    wallet,
    pubsub: pubnubServer,
  });

  miner.mineTransaction();

  res.status(200).json(
    new ResponseModel({
      statusCode: 200,
      data: 'mineTransactions is working',
    })
  );
};

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await TransactionModel.find({});
    res.status(200).json(
      new ResponseModel({
        statusCode: 200,
        data: transactions,
      })
    );
  } catch (error) {
    res.status(500).json(
      new ResponseModel({
        statusCode: 500,
        error: error.message,
      })
    );
  }
};
