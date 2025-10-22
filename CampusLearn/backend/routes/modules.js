const express = require('express');
const Module = require('../models/Module');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all modules
router.get('/', auth, async (req, res) => {
    try {
        const modules = await Module.find()
            .populate('tutor', 'username profile')
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            modules: modules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get modules by tutor
router.get('/tutor/:tutorId', auth, async (req, res) => {
    try {
        const modules = await Module.find({ tutor: req.params.tutorId })
            .populate('tutor', 'username profile')
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            modules: modules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Create new module (Tutor only)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, subject } = req.body;

        // Validate required fields
        if (!title || !description || !subject) {
            return res.status(400).json({
                success: false,
                message: 'Title, description, and subject are required'
            });
        }

        const module = new Module({
            title,
            description,
            subject,
            tutor: req.userId
        });

        await module.save();
        await module.populate('tutor', 'username profile');

        res.status(201).json({
            success: true,
            module: module,
            message: 'Module created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update module (Tutor only)
router.put('/:id', auth, async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (module.tutor.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only edit your own modules.'
            });
        }

        const updatedModule = await Module.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        ).populate('tutor', 'username profile');

        res.json({
            success: true,
            module: updatedModule,
            message: 'Module updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete module (Tutor only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (module.tutor.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only delete your own modules.'
            });
        }

        await Module.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: 'Module deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Enroll in module (Student only)
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (module.students.includes(req.userId)) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this module'
            });
        }

        module.students.push(req.userId);
        await module.save();

        res.json({
            success: true,
            message: 'Enrolled successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get tutor's own modules
router.get('/tutor/my-modules', auth, async (req, res) => {
    try {
        const modules = await Module.find({ tutor: req.userId })
            .populate('tutor', 'username profile firstName lastName')
            .populate('students', 'username profile firstName lastName')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            modules: modules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;