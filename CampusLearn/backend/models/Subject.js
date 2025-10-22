const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Subject code is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: [true, 'Subject name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    popularity: {
        type: Number,
        default: 0
    },
    questionCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Update popularity based on question count
subjectSchema.methods.updatePopularity = function() {
    this.popularity = this.questionCount * 2; // You can adjust this formula
};

module.exports = mongoose.model('Subject', subjectSchema);