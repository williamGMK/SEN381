const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = {
            'image/jpeg': 'image',
            'image/png': 'image',
            'image/jpg': 'image',
            'application/pdf': 'pdf',
            'application/msword': 'word',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
            'application/vnd.ms-powerpoint': 'powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'powerpoint'
        };

        if (allowedTypes[file.mimetype]) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }
});

// Get all chats for a user
router.get('/:userId', async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.params.userId })
            .populate('participants', 'name email profilePicture')
            .populate('messages.sender', 'name profilePicture')
            .sort({ lastMessage: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Send a message
router.post('/send', upload.single('file'), async (req, res) => {
    try {
        const { senderId, receiverId, content, messageType = 'text' } = req.body;

        let fileUrl = null;
        let fileName = null;

        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
            fileName = req.file.originalname;
        }

        let chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });
        if (!chat) {
            chat = new Chat({ participants: [senderId, receiverId], messages: [] });
        }

        chat.messages.push({
            sender: senderId,
            receiver: receiverId,
            messageType: req.file ? getFileType(req.file.mimetype) : messageType,
            content: content,
            fileUrl: fileUrl,
            fileName: fileName
        });

        chat.lastMessage = new Date();
        await chat.save();
        await chat.populate('messages.sender', 'name profilePicture');

        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get messages between two users
router.get('/:userId1/:userId2', async (req, res) => {
    try {
        const chat = await Chat.findOne({ participants: { $all: [req.params.userId1, req.params.userId2] } })
            .populate('participants', 'name email profilePicture')
            .populate('messages.sender', 'name profilePicture');
        res.json(chat || { participants: [], messages: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function getFileType(mimetype) {
    const typeMap = {
        'image/jpeg': 'image',
        'image/png': 'image',
        'image/jpg': 'image',
        'application/pdf': 'pdf',
        'application/msword': 'word',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
        'application/vnd.ms-powerpoint': 'powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'powerpoint'
    };
    return typeMap[mimetype] || 'text';
}

module.exports = router;