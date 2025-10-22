const Message = require('../models/Message');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join room for tutor-student communication
        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        // Handle chat messages
        socket.on('send-message', async (data) => {
            try {
                // Save message to database
                const message = new Message({
                    room: data.room,
                    sender: data.senderId,
                    receiver: data.receiverId,
                    message: data.message,
                    fileUrl: data.fileUrl,
                    fileName: data.fileName
                });

                await message.save();

                // Populate sender info before emitting
                await message.populate('sender', 'username profile');

                io.to(data.room).emit('receive-message', {
                    ...data,
                    _id: message._id,
                    timestamp: message.timestamp,
                    sender: message.sender
                });
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('message-error', { error: 'Failed to send message' });
            }
        });

        // Handle file sharing
        socket.on('share-file', (data) => {
            io.to(data.room).emit('file-shared', data);
        });

        // Handle typing indicators
        socket.on('typing-start', (data) => {
            socket.to(data.room).emit('user-typing', { userId: data.userId });
        });

        socket.on('typing-stop', (data) => {
            socket.to(data.room).emit('user-stopped-typing', { userId: data.userId });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};