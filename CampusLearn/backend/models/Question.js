const mongoose = require('mongoose');

const forumQuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: null
    },
    answeredBy: {
        type: String,
        enum: ['ai', 'tutor'],
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('ForumQuestion', forumQuestionSchema);