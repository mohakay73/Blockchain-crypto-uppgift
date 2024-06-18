import Blockchain from '../models/Blockchain.mjs';
import ResponseModel from '../utilities/ResponseModel.mjs';

export const listBlock = async (req, res, next) => {
  try {
    const blockchain = new Blockchain();
    await blockchain.load();

    res
      .status(200)
      .json(new ResponseModel({ statusCode: 200, data: blockchain.chain }));
  } catch (err) {
    console.error('Error retrieving blockchain data:', err);
    res.status(500).json(
      new ResponseModel({
        statusCode: 500,
        message: 'Failed to retrieve blockchain data',
      })
    );
  }
};
