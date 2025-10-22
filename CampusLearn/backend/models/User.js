const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['student', 'tutor', 'admin'],
        required: true,
        default: 'student'
    },
    profile: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        },
        bio: { type: String, default: '' },
        subjects: [{ type: String }],
        avatar: { type: String, default: '' },
        education: { type: String, default: '' },
        experience: { type: String, default: '' }
    },
    schedule: {
        availability: [{
            day: String,
            slots: [String]
        }],
        timezone: { type: String, default: 'UTC' }
    },
    progress: {
        completedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
        currentTopics: [{
            topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
            progress: { type: Number, default: 0 },
            lastAccessed: Date
        }],
        overallProgress: { type: Number, default: 0 }
    },
    isVerified: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['Active', 'Pending verification'],
        default: 'Pending verification'
    },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Update updatedAt before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to find by email or username
userSchema.statics.findByCredentials = async function(emailOrUsername, password) {
    const user = await this.findOne({
        $or: [
            { email: emailOrUsername },
            { username: emailOrUsername }
        ]
    });

    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid login credentials');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);