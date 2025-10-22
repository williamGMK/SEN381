const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Module title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters']
    },
    description: {
        type: String,
        required: [true, 'Module description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    materials: [{
        title: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileType: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
moduleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for better query performance
moduleSchema.index({ tutor: 1, createdAt: -1 });
moduleSchema.index({ subject: 1 });

module.exports = mongoose.model('Module', moduleSchema);