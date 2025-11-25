import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    component: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
        required: true
    },
    tokensPaid: {
        type: Number,
        required: true
    },
    licenseKey: {
        type: String,
        unique: true,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    lastDownloaded: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for faster queries
purchaseSchema.index({ user: 1, component: 1 });

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
