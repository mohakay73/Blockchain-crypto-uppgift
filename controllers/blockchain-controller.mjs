import { blockchain } from '../server.mjs';
import ResponseModel from '../utilities/ResponseModel.mjs';

export const listBlock = (req, res, next) => {
  res
    .status(200)
    .json(new ResponseModel({ statusCode: 200, data: blockchain.chain }));
};
