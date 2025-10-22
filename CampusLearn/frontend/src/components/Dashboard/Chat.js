import React, { useState, useEffect, useRef } from 'react';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Avatar
} from '@mui/material';
import { Send, AttachFile } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { currentUser, apiRequest } = useAuth();
    const messagesEndRef = useRef(null);

    // Sample chat room - in real app, this would come from props
    const roomId = 'general-room';

    useEffect(() => {
        loadPreviousMessages();
    }, [roomId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadPreviousMessages = async () => {
        // Sample messages for demo
        setMessages([
            {
                _id: 1,
                message: 'Welcome to CampusLearn chat! How can I help you today?',
                sender: { username: 'System', profile: { firstName: 'System' } },
                timestamp: new Date()
            },
            {
                _id: 2,
                message: 'Hi! I need help with calculus homework.',
                sender: { username: 'student123', profile: { firstName: 'John' } },
                timestamp: new Date(Date.now() - 300000)
            }
        ]);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            _id: Date.now(),
            message: newMessage,
            sender: currentUser,
            timestamp: new Date(),
            room: roomId
        };

        setMessages(prev => [...prev, messageData]);
        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Paper elevation={3} sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">Study Group Chat</Typography>
            </Box>

            {/* Messages Area */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                <List>
                    {messages.map((msg) => (
                        <ListItem key={msg._id} alignItems="flex-start">
                            <Avatar sx={{ mr: 2 }}>
                                {msg.sender?.profile?.firstName?.charAt(0) || 'U'}
                            </Avatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle2">
                                            {msg.sender?.profile?.firstName || msg.sender?.username || 'Unknown'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2">{msg.message}</Typography>
                                }
                            />
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        size="small"
                    />

                    <Button
                        variant="contained"
                        endIcon={<Send />}
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default Chat;