import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @desc    Get wallet balance and stats
// @route   GET /api/wallet/balance
// @access  Private
export const getWalletBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            tokens: user.tokens,
            totalSpent: user.totalSpent,
            totalEarned: user.totalEarned
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Purchase tokens (Mock payment)
// @route   POST /api/wallet/purchase-tokens
// @access  Private
export const purchaseTokens = async (req, res) => {
    try {
        const { amount, packageId } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid token amount' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const balanceBefore = user.tokens;
        user.tokens += amount;
        user.totalEarned += amount; // Track total tokens acquired

        await user.save();

        // Create transaction record
        await Transaction.create({
            user: user._id,
            type: 'purchase',
            amount: amount,
            description: `Purchased ${amount} tokens`,
            balanceBefore,
            balanceAfter: user.tokens
        });

        res.json({
            message: 'Tokens purchased successfully',
            tokens: user.tokens,
            added: amount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get transaction history
// @route   GET /api/wallet/transactions
// @access  Private
export const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
