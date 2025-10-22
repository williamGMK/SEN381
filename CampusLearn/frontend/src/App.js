import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { theme } from './styles/theme';

// Components
import Navbar from './components/Layout/Navbar';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TopicManagement from './components/Topics/TopicManagement';
import Profile from './components/Profile/Profile';
import AdminPanel from './components/Admin/AdminPanel';
import Forum from './components/Forum/Forum';
import Messages from './components/Messages/Messages';
import MyModules from './components/Tutor/MyModules';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/topics" element={<TopicManagement />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/admin" element={<AdminPanel />} />
                            <Route path="/forum" element={<Forum />} />
                            <Route path="/messages" element={<Messages />} /> {/* Add this route */}
                            <Route path="/tutor/modules" element={<MyModules />} />
                            <Route path="/messages" element={<Messages />} />
                            <Route path="/forum" element={<Forum />} />
                            <Route path="/tutor/modules" element={<MyModules />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;