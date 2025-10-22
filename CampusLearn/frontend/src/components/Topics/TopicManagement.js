import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Box
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const TopicManagement = () => {
    const [topics, setTopics] = useState([
        {
            id: 1,
            title: 'Introduction to Calculus',
            subject: 'Mathematics',
            difficulty: 'intermediate',
            description: 'Learn the basics of differential and integral calculus.',
            tutor: 'Dr. Smith'
        },
        {
            id: 2,
            title: 'Organic Chemistry Basics',
            subject: 'Chemistry',
            difficulty: 'advanced',
            description: 'Understanding carbon compounds and their reactions.',
            tutor: 'Prof. Johnson'
        }
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [newTopic, setNewTopic] = useState({
        title: '',
        subject: '',
        difficulty: 'beginner',
        description: ''
    });

    const { currentUser } = useAuth();

    const handleCreateTopic = () => {
        const topic = {
            id: topics.length + 1,
            ...newTopic,
            tutor: currentUser.profile.firstName
        };
        setTopics([...topics, topic]);
        setOpenDialog(false);
        setNewTopic({ title: '', subject: '', difficulty: 'beginner', description: '' });
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'error';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Topics</Typography>
                {currentUser?.role === 'tutor' && (
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenDialog(true)}
                    >
                        Create Topic
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {topics.map((topic) => (
                    <Grid item xs={12} md={6} lg={4} key={topic.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {topic.title}
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        label={topic.subject}
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1 }}
                                    />
                                    <Chip
                                        label={topic.difficulty}
                                        color={getDifficultyColor(topic.difficulty)}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {topic.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Tutor: {topic.tutor}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Details</Button>
                                {currentUser?.role === 'student' && (
                                    <Button size="small" variant="contained">
                                        Enroll
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Create Topic Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Topic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Topic Title"
                        fullWidth
                        variant="outlined"
                        value={newTopic.title}
                        onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Subject"
                        fullWidth
                        variant="outlined"
                        value={newTopic.subject}
                        onChange={(e) => setNewTopic({...newTopic, subject: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        value={newTopic.description}
                        onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateTopic} variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TopicManagement;