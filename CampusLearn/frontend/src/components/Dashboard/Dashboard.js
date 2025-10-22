import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Box, Grid, Card, CardContent,
    Button, Avatar, Chip, LinearProgress, Paper, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Snackbar, Alert, IconButton
} from '@mui/material';
import {
    CalendarToday, Book, Assignment, TrendingUp,
    Edit, Save, Cancel, Person, Schedule
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { currentUser, apiRequest } = useAuth();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedBio, setEditedBio] = useState('');
    const [openProgress, setOpenProgress] = useState(false);
    const [openSchedule, setOpenSchedule] = useState(false);
    const [scheduleData, setScheduleData] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [enrolledModules, setEnrolledModules] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, [currentUser]);

    useEffect(() => {
        if (currentUser.role === 'student') {
            fetchEnrolledModules();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const data = await apiRequest('/user/profile');
            setUserData(data.user);
            setEditedBio(data.user?.profile?.bio || '');
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Fallback to currentUser data if API fails
            setUserData(currentUser);
            setEditedBio(currentUser?.profile?.bio || '');
        }
    };

    const fetchEnrolledModules = async () => {
        try {
            const response = await fetch(`/api/enrollment/student/${currentUser._id}`);
            if (!response.ok) throw new Error('Failed to fetch enrollments');
            const data = await response.json();
            setEnrolledModules(data);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };

    const handleSaveBio = async () => {
        try {
            await apiRequest('/user/profile', {
                method: 'PUT',
                body: JSON.stringify({ bio: editedBio })
            });
            setUserData(prev => ({
                ...prev,
                profile: { ...prev.profile, bio: editedBio }
            }));
            setEditMode(false);
            showSnackbar('Profile updated successfully!', 'success');
        } catch (error) {
            showSnackbar('Error updating profile', 'error');
        }
    };

    const handleDiscard = () => {
        setEditedBio(userData?.profile?.bio || '');
        setEditMode(false);
    };

    const handleSaveSchedule = async () => {
        try {
            await apiRequest('/user/schedule', {
                method: 'PUT',
                body: JSON.stringify({ schedule: scheduleData })
            });
            setUserData(prev => ({
                ...prev,
                schedule: scheduleData
            }));
            setOpenSchedule(false);
            showSnackbar('Schedule updated successfully!', 'success');
        } catch (error) {
            showSnackbar('Error updating schedule', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const getCurrentWeek = () => {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const days = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push({
                date: day,
                dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
                fullDay: day.toLocaleDateString('en-US', { weekday: 'long' })
            });
        }
        return days;
    };

    const getCurrentTopic = () => {
        return userData?.progress?.currentTopics?.[0] || null;
    };

    const calculateOverallProgress = () => {
        if (!userData?.progress?.currentTopics?.length) return 0;
        const total = userData.progress.currentTopics.reduce((sum, topic) => sum + topic.progress, 0);
        return Math.round(total / userData.progress.currentTopics.length);
    };

    const isAvailableToday = (day) => {
        return userData?.schedule?.availability?.some(a => a.day === day.fullDay);
    };

    if (!userData) {
        return (
            <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6">Loading your dashboard...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2
                }}>
                    Welcome back, {userData.profile?.firstName}!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {currentUser.role === 'tutor' ? 'Manage your courses and students' : 'Continue your learning journey'}
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Left Column - Main Content */}
                <Grid item xs={12} lg={8}>
                    {/* Progress Overview */}
                    <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    Learning Progress
                                </Typography>
                                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={calculateOverallProgress()}
                                sx={{
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: 'white'
                                    }
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="body2">
                                    Overall Progress
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {calculateOverallProgress()}%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* About Me Section */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    About Me
                                </Typography>
                                {!editMode ? (
                                    <Button
                                        startIcon={<Edit />}
                                        onClick={() => setEditMode(true)}
                                        variant="outlined"
                                    >
                                        Edit
                                    </Button>
                                ) : (
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            startIcon={<Save />}
                                            onClick={handleSaveBio}
                                            variant="contained"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            startIcon={<Cancel />}
                                            onClick={handleDiscard}
                                            variant="outlined"
                                        >
                                            Discard
                                        </Button>
                                    </Box>
                                )}
                            </Box>

                            {editMode ? (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={editedBio}
                                    onChange={(e) => setEditedBio(e.target.value)}
                                    placeholder="Tell us about yourself, your learning goals, or teaching philosophy..."
                                    variant="outlined"
                                />
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, minHeight: '100px' }}>
                                    {userData.profile?.bio || 'No bio added yet. Click edit to tell us about yourself.'}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>

                    {/* Current Topic */}
                    {getCurrentTopic() && (
                        <Card sx={{ mb: 4 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                                    Currently Studying
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Book sx={{ fontSize: 40, color: 'primary.main' }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {getCurrentTopic().topicId?.title || 'Current Topic'}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={getCurrentTopic().progress}
                                            sx={{ height: 8, borderRadius: 4, mb: 1 }}
                                        />
                                        <Typography variant="body2" color="text.secondary">
                                            {getCurrentTopic().progress}% Complete
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    )}

                    {/* Recent Activity */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Recent Activity
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Book color="primary" />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                            Started new topic: {getCurrentTopic()?.topicId?.title || 'Introduction to Calculus'}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            2 hours ago
                                        </Typography>
                                    </Box>
                                </Paper>
                                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Assignment color="secondary" />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                            Completed assignment: Basic Algebra
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Yesterday
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Sidebar */}
                <Grid item xs={12} lg={4}>
                    {/* Profile Summary */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: 'primary.main',
                                    fontSize: '2rem'
                                }}
                            >
                                {userData.profile?.firstName?.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {userData.profile?.firstName} {userData.profile?.lastName}
                            </Typography>
                            <Chip
                                label={currentUser.role}
                                color={currentUser.role === 'tutor' ? 'primary' : 'secondary'}
                                sx={{ mt: 1, mb: 2 }}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => setOpenProgress(true)}
                                    startIcon={<TrendingUp />}
                                >
                                    View Progress
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => {
                                        setScheduleData(userData.schedule || {});
                                        setOpenSchedule(true);
                                    }}
                                    startIcon={<Schedule />}
                                >
                                    Update Schedule
                                </Button>
                                <Button variant="outlined" fullWidth>
                                    Edit Profile
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Weekly Calendar */}
                    <Card sx={{ mb: 4 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        This Week
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {getCurrentWeek().map((day, index) => (
                                    <Paper
                                        key={index}
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            backgroundColor: day.date.getDate() === new Date().getDate() ? 'primary.main' :
                                                isAvailableToday(day) ? 'success.light' : 'grey.50',
                                            color: day.date.getDate() === new Date().getDate() ? 'white' : 'inherit',
                                            border: day.date.getDate() === new Date().getDate() ? '2px solid' : 'none',
                                            borderColor: 'primary.main'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {day.dayName}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {day.date.getDate()}
                                                </Typography>
                                            </Box>
                                            {isAvailableToday(day) && (
                                                <Chip
                                                    label="Available"
                                                    size="small"
                                                    color="success"
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        height: '24px',
                                                        color: 'white'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                                Quick Stats
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Completed Topics</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {userData.progress?.completedModules?.length || 0}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Current Topics</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {userData.progress?.currentTopics?.length || 0}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Study Hours</Typography>
                                    <Typography variant="body2" fontWeight="bold">12h</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Achievements</Typography>
                                    <Typography variant="body2" fontWeight="bold">3</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Progress Dialog */}
            <Dialog open={openProgress} onClose={() => setOpenProgress(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Learning Progress
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        {userData.progress?.currentTopics?.map((topic, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h6">{topic.topicId?.title || `Topic ${index + 1}`}</Typography>
                                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                        {topic.progress}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={topic.progress}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        backgroundColor: 'grey.200',
                                        '& .MuiLinearProgress-bar': {
                                            borderRadius: 5,
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        }
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                    Last accessed: {topic.lastAccessed ? new Date(topic.lastAccessed).toLocaleDateString() : 'Never'}
                                </Typography>
                            </Box>
                        ))}
                        {(!userData.progress?.currentTopics || userData.progress.currentTopics.length === 0) && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Book sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No active topics
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Start learning to see your progress here!
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenProgress(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Schedule Dialog */}
            <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Update Your Schedule
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Set your availability for the week. Students will see when you're available for sessions.
                        </Typography>
                        <TextField
                            fullWidth
                            label="Timezone"
                            value={scheduleData.timezone || 'UTC'}
                            onChange={(e) => setScheduleData({...scheduleData, timezone: e.target.value})}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant="body2" sx={{ mb: 2, fontWeight: 'medium' }}>
                            Set your weekly availability:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <Box key={day} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="body2" sx={{ minWidth: 100 }}>{day}</Typography>
                                    <TextField
                                        size="small"
                                        placeholder="9:00 AM - 5:00 PM"
                                        fullWidth
                                        onChange={(e) => {
                                            const newAvailability = [...(scheduleData.availability || [])];
                                            const existingIndex = newAvailability.findIndex(a => a.day === day);

                                            if (existingIndex >= 0) {
                                                newAvailability[existingIndex].slots = [e.target.value];
                                            } else {
                                                newAvailability.push({ day, slots: [e.target.value] });
                                            }

                                            setScheduleData({
                                                ...scheduleData,
                                                availability: newAvailability
                                            });
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button onClick={() => setOpenSchedule(false)}>Cancel</Button>
                    <Button
                        onClick={handleSaveSchedule}
                        variant="contained"
                    >
                        Save Schedule
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Dashboard;