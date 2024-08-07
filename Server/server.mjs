import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import blockRouter from '../Server/routes/block-routes.mjs';
import blockchainRouter from '../Server/routes/blockchain-routes.mjs';
import transactionRouter from '../Server/routes/transaction-routes.mjs';
import authRouter from '../Server/routes/auth-routes.mjs';
import PubNubServer from './pubnub-server.mjs';
import { connectDb } from './config/mongo.mjs';

dotenv.config({ path: './config/config.env' });

connectDb();

const credentials = {
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: process.env.USER_ID,
};

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer({
  blockchain: blockchain,
  transactionPool: transactionPool,
  wallet: wallet,
  credentials: credentials,
});

const app = express();
app.use(express.json());
app.use(mongoSanitize());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter);
app.use('/api/v1/wallet', transactionRouter);
app.use('/api/v1/auth', authRouter);

const synchronize = async () => {
  let response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    blockchain.replaceChain(result.data);
  }

  response = await fetch(`${ROOT_NODE}/api/v1/wallet/transactions`);
  if (response.ok) {
    const result = await response.json();
    transactionPool.replaceTransactionMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    synchronize();
  }
});
