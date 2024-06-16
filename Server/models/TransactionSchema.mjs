import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  outputMap: {
    type: Map,
    of: Number,
    required: true,
  },
  inputMap: {
    timestamp: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
  },
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);
export default TransactionModel;
