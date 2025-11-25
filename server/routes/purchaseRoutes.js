import express from 'express';
import { purchaseComponent, getUserPurchases, downloadComponent, verifyLicense } from '../controllers/purchaseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/purchase/:componentId', protect, purchaseComponent);
router.get('/my-purchases', protect, getUserPurchases);
router.get('/download/:purchaseId', protect, downloadComponent);
router.get('/verify/:licenseKey', verifyLicense);

export default router;
