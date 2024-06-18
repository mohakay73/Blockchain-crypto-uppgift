import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  lastHash: { type: String, required: true },
  hash: { type: String, required: true },
  data: { type: Array, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: Number, required: true },
});

const blockchainSchema = new mongoose.Schema({
  chain: { type: [blockSchema], required: true },
});

const BlockchainModel = mongoose.model('Blockchain', blockchainSchema);

export default BlockchainModel;
