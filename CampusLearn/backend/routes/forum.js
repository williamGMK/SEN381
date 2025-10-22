const express = require('express');
const router = express.Router();
const ForumQuestion = require('../models/ForumQuestion');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Get all forum questions
router.get('/', async (req, res) => {
    try {
        const questions = await ForumQuestion.find({ isPublic: true })
            .populate('user', 'name profilePicture role')
            .sort({ timestamp: -1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ask a question
router.post('/ask', async (req, res) => {
    try {
        const { userId, question } = req.body;

        const forumQuestion = new ForumQuestion({ user: userId, question: question });
        await forumQuestion.save();

        // Get AI response
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful tutor assistant. Provide clear, educational answers to student questions." },
                { role: "user", content: question }
            ],
            max_tokens: 500
        });

        const aiAnswer = completion.choices[0].message.content;
        forumQuestion.answer = aiAnswer;
        forumQuestion.answeredBy = 'ai';
        await forumQuestion.save();
        await forumQuestion.populate('user', 'name profilePicture role');

        res.json(forumQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tutor can answer questions
router.post('/answer/:questionId', async (req, res) => {
    try {
        const { answer } = req.body;
        const question = await ForumQuestion.findById(req.params.questionId);
        question.answer = answer;
        question.answeredBy = 'tutor';
        await question.save();
        await question.populate('user', 'name profilePicture role');
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;