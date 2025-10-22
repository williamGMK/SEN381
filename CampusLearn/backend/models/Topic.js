const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    materials: [{
        title: String,
        fileUrl: String,
        fileType: String,
        uploadedAt: { type: Date, default: Date.now }
    }],
    assignments: [{
        title: String,
        description: String,
        dueDate: Date,
        submissions: [{
            student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            fileUrl: String,
            submittedAt: Date,
            grade: Number
        }]
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', topicSchema);