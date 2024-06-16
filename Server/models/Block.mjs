import hexToBinary from 'hex-to-binary';
import { GENESIS_DATA, MINE_RATE } from '../config/settings.mjs';
import { createHash } from '../utilities/crypto-lib.mjs';
import BlockModel from './BlockSchema.mjs';

export default class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    return new this(GENESIS_DATA);
  }

  static async mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash;

    let { difficulty } = lastBlock;
    let hash, timestamp;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficultyLevel({ block: lastBlock, timestamp });
      hash = createHash(timestamp, lastHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    );

    const newBlockData = {
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty,
    };

    try {
      const block = await BlockModel.create(newBlockData);
      return new this(block);
    } catch (err) {
      throw new Error(
        `Failed to mine block and save to MongoDB: ${err.message}`
      );
    }
  }

  static adjustDifficultyLevel({ block, timestamp }) {
    const { difficulty } = block;

    if (timestamp - block.timestamp > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}
