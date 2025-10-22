import React, { useState, useEffect, useRef } from 'react';
import './Messages.css';

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchUsers();
        fetchChats();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            const otherUsers = data.filter(user => user._id !== currentUser._id);
            setUsers(otherUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchChats = async () => {
        try {
            const response = await fetch(`/api/chat/${currentUser._id}`);
            if (!response.ok) throw new Error('Failed to fetch chats');
            const data = await response.json();
            setChats(data);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const selectUser = async (user) => {
        setSelectedUser(user);
        try {
            const response = await fetch(`/api/chat/${currentUser._id}/${user._id}`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            setMessages(data.messages || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !selectedFile) return;

        const formData = new FormData();
        formData.append('senderId', currentUser._id);
        formData.append('receiverId', selectedUser._id);
        formData.append('content', newMessage);

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            const response = await fetch('/api/chat/send', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to send message');
            const data = await response.json();

            setMessages(data.messages);
            setNewMessage('');
            setSelectedFile(null);
            fetchChats();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message: ' + error.message);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const renderMessage = (message) => {
        const isOwn = message.sender._id === currentUser._id;

        return (
            <div key={message._id} className={`message ${isOwn ? 'own-message' : 'other-message'}`}>
                <div className="message-header">
                    <img src={message.sender.profilePicture || '/default-avatar.png'} alt="Profile" />
                    <span>{message.sender.name}</span>
                </div>
                <div className="message-content">
                    {message.messageType === 'text' && <p>{message.content}</p>}
                    {message.messageType === 'image' && (
                        <img src={message.fileUrl} alt="Shared" className="message-image" />
                    )}
                    {(message.messageType === 'pdf' || message.messageType === 'word' || message.messageType === 'powerpoint') && (
                        <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="file-message">
                            📎 {message.fileName}
                        </a>
                    )}
                </div>
                <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString()}
                </div>
            </div>
        );
    };

    return (
        <div className="messages-container">
            <div className="users-sidebar">
                <h3>Chats</h3>
                <div className="users-list">
                    {users.map(user => (
                        <div
                            key={user._id}
                            className={`user-item ${selectedUser?._id === user._id ? 'selected' : ''}`}
                            onClick={() => selectUser(user)}
                        >
                            <img src={user.profilePicture || '/default-avatar.png'} alt="Profile" />
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-role">{user.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chat-area">
                {selectedUser ? (
                    <>
                        <div className="chat-header">
                            <img src={selectedUser.profilePicture || '/default-avatar.png'} alt="Profile" />
                            <div>
                                <h4>{selectedUser.name}</h4>
                                <span className="user-status">Online</span>
                            </div>
                        </div>

                        <div className="messages-list">
                            {messages.map(renderMessage)}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={sendMessage} className="message-input-form">
                            <div className="file-input">
                                <input type="file" onChange={handleFileSelect} accept="image/*,.pdf,.doc,.docx,.ppt,.pptx" />
                                {selectedFile && <span>{selectedFile.name}</span>}
                            </div>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="message-input"
                            />
                            <button type="submit" className="send-button">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <h3>Select a user to start chatting</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;