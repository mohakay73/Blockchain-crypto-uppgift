import jwt from 'jsonwebtoken';
import User from '../models/UserModel.mjs';
import { asyncHandler } from './asyncHandler.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(new ErrorResponse('Not authorized', 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);

  if (!req.user) {
    next(new ErrorResponse('Not authorized', 401));
  }

  next();
});

// authorize('manager','user')
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: `The ${req.user.role} roll have no authorization`,
      });
    }
    next();
  };
};
