import ResponseModel from '../utilities/ResponseModel.mjs';
import { pubnubServer } from '../server.mjs';
import { blockchain } from '../server.mjs';
import Block from '../models/Block.mjs';

export const mineBlock = async (req, res, next) => {
  const { data } = req.body;

  try {
    const block = await Block.mineBlock({
      lastBlock: blockchain.latestBlock(),
      data,
    });

    await block.save();

    pubnubServer.broadcast();

    res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
  } catch (err) {
    res
      .status(500)
      .json(new ResponseModel({ statusCode: 500, error: err.message }));
  }
};
