import { MINING_REWARD, REWARD_ADDRESS } from '../config/settings.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';
import Transaction from './Transaction.mjs';
import BlockchainModel from '../models/BlockchainSchema.mjs';
import BlockModel from './BlockSchema.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
  }

  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain.at(-1),
      data: data,
    });
    this.chain.push(newBlock);
    return newBlock;
  }
  async save() {
    try {
      const blockchain = new BlockchainModel({ chain: this.chain });
      await blockchain.save();
    } catch (err) {
      console.error('Error saving blockchain to MongoDB:', err);
    }
  }

  async load() {
    try {
      console.log('Loading blockchain from MongoDB...');
      const blocksData = await BlockModel.find().sort({ timestamp: 1 });
      if (blocksData.length > 0) {
        this.chain = blocksData;
      } else {
        console.log('No blocks found in MongoDB, starting with genesis block');
      }
    } catch (err) {
      console.error('Error loading blockchain from MongoDB:', err);
    }
  }

  async save() {
    try {
      for (const block of this.chain) {
        const blockExists = await BlockModel.findOne({ hash: block.hash });
        if (!blockExists) {
          const newBlock = new BlockModel(block);
          await newBlock.save();
        }
      }
    } catch (err) {
      console.error('Error saving blockchain to MongoDB:', err);
    }
  }

  replaceChain(chain, shouldValidate, callback) {
    if (chain.length <= this.chain.length) return;
    if (!Blockchain.validateChain(chain)) return;

    if (shouldValidate && !this.validateTransactionData({ chain })) return;

    if (callback) callback();

    this.chain = chain;
  }

  validateTransactionData({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let counter = 0;

      for (let transaction of block.data) {
        if (transaction.inputMap.address === REWARD_ADDRESS.address) {
          counter++;

          if (counter > 1) return false;

          if (Object.values(transaction.outputMap)[0] !== MINING_REWARD)
            return false;
        } else {
          if (!Transaction.validate(transaction)) {
            return false;
          }

          if (transactionSet.has(transaction)) {
            return false;
          } else {
            transactionSet.add(transaction);
          }
        }
      }
    }

    return true;
  }

  static validateChain(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data, nonce, difficulty } =
        chain.at(i);
      const currentLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      if (lastHash !== currentLastHash) return false;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;

      const validHash = createHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validHash) return false;
    }

    return true;
  }
}
