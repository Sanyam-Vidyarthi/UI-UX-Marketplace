import express from 'express';
import { addToWishlist, removeFromWishlist, getUserWishlist, checkIfWishlisted } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add/:componentId', protect, addToWishlist);
router.delete('/remove/:componentId', protect, removeFromWishlist);
router.get('/my-wishlist', protect, getUserWishlist);
router.get('/check/:componentId', protect, checkIfWishlisted);

export default router;
