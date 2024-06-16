// models/BlockModel.mjs
import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  lastHash: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  nonce: { type: Number, required: true },
  difficulty: { type: Number, required: true },
});

const BlockModel = mongoose.model('Block', BlockSchema);

export default BlockModel;
