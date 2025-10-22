const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const updates = {};

        if (req.body.bio !== undefined) {
            updates['profile.bio'] = req.body.bio;
        }
        if (req.body.firstName !== undefined) {
            updates['profile.firstName'] = req.body.firstName;
        }
        if (req.body.lastName !== undefined) {
            updates['profile.lastName'] = req.body.lastName;
        }
        if (req.body.subjects !== undefined) {
            updates['profile.subjects'] = req.body.subjects;
        }
        if (req.body.education !== undefined) {
            updates['profile.education'] = req.body.education;
        }
        if (req.body.experience !== undefined) {
            updates['profile.experience'] = req.body.experience;
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: updates },
            { new: true }
        ).select('-password');

        res.json({
            success: true,
            user,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update user schedule
router.put('/schedule', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    schedule: req.body.schedule
                }
            },
            { new: true }
        ).select('-password');

        res.json({
            success: true,
            user,
            message: 'Schedule updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update user progress
router.put('/progress', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                $set: {
                    progress: req.body.progress
                }
            },
            { new: true }
        ).select('-password');

        res.json({
            success: true,
            user,
            message: 'Progress updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;