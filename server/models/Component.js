import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Component title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Component description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Component category is required'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Component code is required']
    },
    tokenPrice: {
        type: Number,
        default: 10,
        min: 0
    },
    isPremium: {
        type: Boolean,
        default: true
    },
    downloads: {
        type: Number,
        default: 0
    },
    tags: [String],
    previewImage: String,
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'intermediate'
    }
}, {
    timestamps: true
});

// Index for faster category queries
componentSchema.index({ category: 1 });

const Component = mongoose.model('Component', componentSchema);

export default Component;
