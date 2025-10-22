require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Socket.io configuration
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(' MongoDB Atlas Connected Successfully');
        console.log(' Database: campuslearn');
    })
    .catch(err => {
        console.error(' MongoDB Connection Failed:', err.message);
        process.exit(1);
    });

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const moduleRoutes = require('./routes/modules');
const uploadRoutes = require('./routes/upload');
const forumRoutes = require('./routes/forum');
const userRoutes = require('./routes/user'); // Add this line
const chatRoutes = require('./routes/chat');
const enrollmentRoutes = require('./routes/enrollment');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./middleware/auth'), adminRoutes);
app.use('/api/modules', require('./middleware/auth'), moduleRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/forum', forumRoutes); // Make sure this line exists
app.use('/api/user', require('./middleware/auth'), userRoutes); // Add this line
app.use('/api/chat', chatRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/uploads', express.static('uploads'));


// Basic API route
app.get('/api', (req, res) => {
    res.json({
        message: 'CampusLearn API Running',
        database: 'MongoDB Atlas Connected',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Database test route
app.get('/api/test-db', async (req, res) => {
    try {
        const User = require('./models/User');
        const userCount = await User.countDocuments();
        res.json({
            success: true,
            message: ' Database connected successfully',
            database: 'MongoDB Atlas',
            userCount: userCount,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ' Database connection failed',
            error: error.message
        });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Socket.io setup
try {
    const chatSocket = require('./sockets/chatSocket');
    chatSocket(io);
    console.log(' Socket.io initialized successfully');
} catch (error) {
    console.log('  Socket.io not available:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 handler - MUST be last middleware
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(' CampusLearn Backend Server Started');
    console.log('='.repeat(50));
    console.log(` Port: ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄  Database: MongoDB Atlas`);
    console.log(` API URL: http://localhost:${PORT}/api`);
    console.log(` Socket.io: Enabled`);
    console.log('='.repeat(50));
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n Shutting down server gracefully...');
    await mongoose.connection.close();
    console.log(' MongoDB connection closed.');
    process.exit(0);
});