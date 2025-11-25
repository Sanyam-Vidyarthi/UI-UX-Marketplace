import express from 'express';
import { getWalletBalance, purchaseTokens, getTransactionHistory } from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', protect, getWalletBalance);
router.post('/purchase-tokens', protect, purchaseTokens);
router.get('/transactions', protect, getTransactionHistory);

export default router;
