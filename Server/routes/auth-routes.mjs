import express from 'express';
import {
  register,
  login,
  getMe,
  updateUserDetails,
  updatepassword,
  forgotPassword,
  resetPassword,
} from '../controllers/auth-controller.mjs';
import { protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.get('/me', protect, getMe);
router.put('/updateuser', protect, updateUserDetails);
router.put('/updatepassword', protect, updatepassword);
export default router;
