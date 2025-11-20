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
    }
}, {
    timestamps: true
});

// Index for faster category queries
componentSchema.index({ category: 1 });

const Component = mongoose.model('Component', componentSchema);

export default Component;
