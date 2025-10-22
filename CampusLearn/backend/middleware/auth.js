const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

        // Remove 'Bearer ' prefix if present
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        // Verify user still exists
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found, token invalid'
            });
        }

        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
};

module.exports = auth;