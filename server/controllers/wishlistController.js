import Wishlist from '../models/Wishlist.js';

// @desc    Add component to wishlist
// @route   POST /api/wishlist/add/:componentId
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { componentId } = req.params;
        const userId = req.user._id;

        // Check if already in wishlist
        const exists = await Wishlist.findOne({ user: userId, component: componentId });
        if (exists) {
            return res.status(400).json({ message: 'Already in wishlist' });
        }

        await Wishlist.create({
            user: userId,
            component: componentId
        });

        res.status(201).json({ message: 'Added to wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/remove/:componentId
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const { componentId } = req.params;
        const userId = req.user._id;

        const result = await Wishlist.findOneAndDelete({ user: userId, component: componentId });

        if (!result) {
            return res.status(404).json({ message: 'Not found in wishlist' });
        }

        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user wishlist
// @route   GET /api/wishlist/my-wishlist
// @access  Private
export const getUserWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user._id })
            .populate('component', 'title description category previewImage tokenPrice')
            .sort({ addedAt: -1 });

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Check if component is in wishlist
// @route   GET /api/wishlist/check/:componentId
// @access  Private
export const checkIfWishlisted = async (req, res) => {
    try {
        const exists = await Wishlist.exists({
            user: req.user._id,
            component: req.params.componentId
        });

        res.json({ isWishlisted: !!exists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
