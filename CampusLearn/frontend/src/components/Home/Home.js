import React from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { homeStyles } from '../../styles/theme';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const features = [
        {
            title: 'Browse tutors by subject, availability, and ratings.',
            description: 'Find the perfect peer who excels in your area of need.'
        },
        {
            title: 'Schedule a tutoring session that works for both of you.',
            description: 'Flexible timing for productive learning experiences.'
        },
        {
            title: 'Meet up for your tutoring session via Teams.',
            description: 'Share knowledge and build lasting academic relationships.'
        }
    ];

    return (
        <Box sx={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box sx={homeStyles.heroSection}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1" sx={homeStyles.heroTitle}>
                                Learn Together, Succeed Together
                            </Typography>
                            <Typography variant="h5" sx={homeStyles.heroSubtitle}>
                                Connect with high-achieving peers for free tutoring sessions. Share knowledge,
                                build friendships, and excel academically together on CampusLearn.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                    sx={homeStyles.primaryButton}
                                >
                                    Find a tutor
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/register?role=tutor')}
                                    sx={homeStyles.secondaryButton}
                                >
                                    Become a tutor
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '300px',
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed rgba(255,255,255,0.3)'
                                }}
                            >
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    Your Learning Journey Starts Here
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h2" sx={homeStyles.sectionTitle}>
                    How CampusLearn Works
                </Typography>
                <Typography variant="h5" sx={homeStyles.sectionSubtitle}>
                    Getting started with peer-to-peer tutoring is simple. Follow these three easy steps
                    to begin your collaborative learning journey.
                </Typography>

                <TableContainer
                    sx={{
                        mt: 4,
                        background: 'transparent',
                        boxShadow: 'none'
                    }}
                >
                    <Table sx={{ border: 'none' }}>
                        <TableBody>
                            <TableRow sx={{ border: 'none' }}>
                                {features.map((feature, index) => (
                                    <TableCell
                                        key={index}
                                        sx={{
                                            border: 'none',
                                            textAlign: 'center',
                                            verticalAlign: 'top',
                                            px: 2
                                        }}
                                    >
                                        <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                                            <Box sx={homeStyles.numberCircle}>
                                                {index + 1}
                                            </Box>

                                            <Typography variant="h6" sx={homeStyles.featureTitle}>
                                                {feature.title}
                                            </Typography>

                                            <Typography variant="body1" sx={homeStyles.featureDescription}>
                                                {feature.description}
                                            </Typography>
                                        </Paper>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* CTA Section */}
            {!currentUser && (
                <Container maxWidth="md" sx={{ py: 6 }}>
                    <Paper
                        elevation={4}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 3
                        }}
                    >
                        <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                            Start Your Learning Journey Today
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                            Join thousands of students and tutors using CampusLearn
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={homeStyles.primaryButton}
                        >
                            Get Started Free
                        </Button>
                    </Paper>
                </Container>
            )}
        </Box>
    );
};

export default Home;