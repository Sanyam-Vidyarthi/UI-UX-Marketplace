import Component from '../models/Component.js';

// @desc    Get all components or filter by category
// @route   GET /api/components?category=CategoryName
// @access  Public
export const getComponents = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const components = await Component.find(filter).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: components.length,
            data: components
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error while fetching components',
            message: error.message
        });
    }
};

// @desc    Get single component by ID
// @route   GET /api/components/:id
// @access  Public
export const getComponentById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.json({
            success: true,
            data: component
        });
    } catch (error) {
        // Handle invalid MongoDB ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Server error while fetching component',
            message: error.message
        });
    }
};

// @desc    Create new component
// @route   POST /api/components
// @access  Public (should be protected in production)
export const createComponent = async (req, res) => {
    try {
        const { title, description, category, code } = req.body;

        // Validation
        if (!title || !description || !category || !code) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields: title, description, category, code'
            });
        }

        const component = await Component.create({
            title,
            description,
            category,
            code
        });

        res.status(201).json({
            success: true,
            data: component
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Error creating component',
            message: error.message
        });
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
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.json({
            success: true,
            data: component
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.status(400).json({
            success: false,
            error: 'Error updating component',
            message: error.message
        });
    }
};

// @desc    Delete component
// @route   DELETE /api/components/:id
// @access  Public (should be protected in production)
export const deleteComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.json({
            success: true,
            data: {},
            message: 'Component deleted successfully'
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Error deleting component',
            message: error.message
        });
    }
};
