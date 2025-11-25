import User from '../models/User.js';
import Component from '../models/Component.js';
import Purchase from '../models/Purchase.js';
import Transaction from '../models/Transaction.js';
import crypto from 'crypto';

// Generate a random license key
const generateLicenseKey = () => {
    return `UIUX-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
};

// @desc    Purchase a component
// @route   POST /api/purchases/purchase/:componentId
// @access  Private
export const purchaseComponent = async (req, res) => {
    try {
        const { componentId } = req.params;
        const userId = req.user._id;

        // 1. Check if component exists
        const component = await Component.findById(componentId);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        // 2. Check if already purchased
        const existingPurchase = await Purchase.findOne({ user: userId, component: componentId });
        if (existingPurchase) {
            return res.status(400).json({ message: 'You already own this component' });
        }

        // 3. Check user balance
        const user = await User.findById(userId);
        if (user.tokens < component.tokenPrice) {
            return res.status(400).json({
                message: 'Insufficient tokens',
                required: component.tokenPrice,
                current: user.tokens
            });
        }

        // 4. Process transaction
        const balanceBefore = user.tokens;
        user.tokens -= component.tokenPrice;
        user.totalSpent += component.tokenPrice;
        await user.save();

        // 5. Create purchase record
        const purchase = await Purchase.create({
            user: userId,
            component: componentId,
            tokensPaid: component.tokenPrice,
            licenseKey: generateLicenseKey()
        });

        // 6. Create transaction record
        await Transaction.create({
            user: userId,
            type: 'component_buy',
            amount: -component.tokenPrice,
            description: `Purchased component: ${component.title}`,
            relatedPurchase: purchase._id,
            balanceBefore,
            balanceAfter: user.tokens
        });

        // 7. Update component stats
        component.downloads += 1; // Increment "sales" count
        await component.save();

        res.status(201).json({
            message: 'Purchase successful',
            purchase,
            remainingTokens: user.tokens
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's purchases
// @route   GET /api/purchases/my-purchases
// @access  Private
export const getUserPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.user._id })
            .populate('component', 'title description category previewImage tokenPrice')
            .sort({ purchaseDate: -1 });

        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Download component (increment count)
// @route   GET /api/purchases/download/:purchaseId
// @access  Private
export const downloadComponent = async (req, res) => {
    try {
        const purchase = await Purchase.findOne({
            _id: req.params.purchaseId,
            user: req.user._id
        }).populate('component');

        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        purchase.downloadCount += 1;
        purchase.lastDownloaded = Date.now();
        await purchase.save();

        // In a real app, this would return a file stream or signed URL
        // For now, we return the code content
        res.json({
            code: purchase.component.code,
            licenseKey: purchase.licenseKey
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify license key
// @route   GET /api/purchases/verify/:licenseKey
// @access  Public
export const verifyLicense = async (req, res) => {
    try {
        const purchase = await Purchase.findOne({ licenseKey: req.params.licenseKey })
            .populate('user', 'username')
            .populate('component', 'title');

        if (!purchase) {
            return res.status(404).json({ valid: false, message: 'Invalid license key' });
        }

        res.json({
            valid: true,
            component: purchase.component.title,
            owner: purchase.user.username,
            purchaseDate: purchase.purchaseDate
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
