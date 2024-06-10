import { pubnubServer } from '../server.mjs';
import { blockchain } from '../server.mjs';
import ResponseModel from '../utilities/ResponseModel.mjs';

export const mineBlock = (req, res, next) => {
  const data = req.body;

  const block = blockchain.addBlock({ data: data });

  pubnubServer.broadcast();

  res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
};
