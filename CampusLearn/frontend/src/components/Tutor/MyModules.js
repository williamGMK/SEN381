import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Box, Grid, Card, CardContent,
    Button, Chip, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Snackbar, Alert, IconButton,
    LinearProgress, Fab
} from '@mui/material';
import { Add, Edit, Delete, People, Book } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const MyModules = () => {
    const { currentUser } = useAuth();
    const [modules, setModules] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [moduleData, setModuleData] = useState({
        title: '',
        description: '',
        subject: ''
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        // Sample modules for demo
        setModules([
            {
                id: 1,
                title: 'Introduction to Calculus',
                subject: 'Mathematics',
                description: 'Learn the fundamentals of differential and integral calculus with practical examples.',
                students: ['1', '2', '3'],
                materials: ['1', '2'],
                createdAt: new Date()
            },
            {
                id: 2,
                title: 'Organic Chemistry Basics',
                subject: 'Chemistry',
                description: 'Understanding carbon compounds and their reactions in biological systems.',
                students: ['1', '2'],
                materials: ['1'],
                createdAt: new Date()
            }
        ]);
    }, [currentUser]);

    const handleCreateModule = () => {
        const module = {
            id: modules.length + 1,
            ...moduleData,
            tutor: currentUser.profile.firstName,
            students: [],
            materials: [],
            createdAt: new Date()
        };
        setModules([...modules, module]);
        setOpenDialog(false);
        setEditingModule(null);
        setModuleData({ title: '', description: '', subject: '' });
        showSnackbar('Module created successfully!', 'success');
    };

    const handleEditModule = (module) => {
        setEditingModule(module);
        setModuleData({
            title: module.title,
            description: module.description,
            subject: module.subject
        });
        setOpenDialog(true);
    };

    const handleDeleteModule = (moduleId) => {
        if (window.confirm('Are you sure you want to delete this module?')) {
            setModules(modules.filter(module => module.id !== moduleId));
            showSnackbar('Module deleted successfully!', 'success');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const calculateAverageProgress = (module) => {
        return Math.floor(Math.random() * 100);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2
                }}>
                    My Teaching Modules
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Create and manage your courses
                </Typography>
            </Box>

            {/* Modules Grid */}
            <Grid container spacing={3}>
                {modules.map((module) => (
                    <Grid item xs={12} md={6} lg={4} key={module.id}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 12px 35px rgba(0,0,0,0.15)'
                            }
                        }}>
                            <CardContent sx={{ flex: 1, p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" sx={{
                                        fontWeight: 'bold',
                                        flex: 1,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent'
                                    }}>
                                        {module.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEditModule(module)}
                                            color="primary"
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteModule(module.id)}
                                            color="error"
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Chip
                                    label={module.subject}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ mb: 2, fontWeight: 'bold' }}
                                />

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, minHeight: '60px' }}>
                                    {module.description}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <People fontSize="small" color="action" />
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                            {module.students?.length || 0} students
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Book fontSize="small" color="action" />
                                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                            {module.materials?.length || 0} materials
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Create/Edit Module Dialog */}
            <Dialog open={openDialog} onClose={() => {
                setOpenDialog(false);
                setEditingModule(null);
                setModuleData({ title: '', description: '', subject: '' });
            }} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingModule ? 'Edit Module' : 'Create New Module'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                        <TextField
                            label="Module Title"
                            value={moduleData.title}
                            onChange={(e) => setModuleData({...moduleData, title: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            label="Subject"
                            value={moduleData.subject}
                            onChange={(e) => setModuleData({...moduleData, subject: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={moduleData.description}
                            onChange={(e) => setModuleData({...moduleData, description: e.target.value})}
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button
                        onClick={handleCreateModule}
                        variant="contained"
                        disabled={!moduleData.title || !moduleData.description || !moduleData.subject}
                    >
                        {editingModule ? 'Update' : 'Create'}
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

export default MyModules;