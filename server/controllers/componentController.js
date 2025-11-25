import Component from '../models/Component.js';

// @desc    Get all components
// @route   GET /api/components
// @access  Public
export const getComponents = async (req, res) => {
    try {
        const { category, search, premium } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (premium !== undefined) {
            query.isPremium = premium === 'true';
        }

        const components = await Component.find(query).sort({ createdAt: -1 });
        res.json(components);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single component
// @route   GET /api/components/:id
// @access  Public
export const getComponentById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);

        if (component) {
            res.json(component);
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new component
// @route   POST /api/components
// @access  Public (should be protected in production)
export const createComponent = async (req, res) => {
    try {
        const { title, description, category, code, tokenPrice, isPremium, tags, difficulty } = req.body;

        // Validation
        if (!title || !description || !category || !code) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const component = await Component.create({
            title,
            description,
            category,
            code,
            tokenPrice: tokenPrice || 10,
            isPremium: isPremium !== undefined ? isPremium : true,
            tags: tags || [],
            difficulty: difficulty || 'intermediate'
        });

        res.status(201).json(component);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update component
// @route   PUT /api/components/:id
// @access  Public (should be protected in production)
export const updateComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        res.json(component);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete component
// @route   DELETE /api/components/:id
// @access  Public (should be protected in production)
export const deleteComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        res.json({ message: 'Component deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
