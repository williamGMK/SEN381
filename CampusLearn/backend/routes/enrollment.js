const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// Enroll in a module
router.post('/enroll', async (req, res) => {
    try {
        const { studentId, moduleId } = req.body;

        const existingEnrollment = await Enrollment.findOne({
            student: studentId,
            module: moduleId
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this module' });
        }

        const enrollment = new Enrollment({
            student: studentId,
            module: moduleId
        });

        await enrollment.save();
        await enrollment.populate('module');
        await enrollment.populate('student', 'name email');

        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get student's enrolled modules
router.get('/student/:studentId', async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.params.studentId })
            .populate('module')
            .sort({ enrolledAt: -1 });

        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all enrollments (admin view)
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('student', 'name email role')
            .populate('module', 'name code')
            .sort({ enrolledAt: -1 });

        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;