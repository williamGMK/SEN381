import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const { currentUser } = useAuth();

    const subjects = ['SEN381', 'LPR381', 'WPR381', 'DBD381', 'IOT381'];
    const reviews = [
        { name: 'Alex', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' },
        { name: 'Sarah', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' },
        { name: 'Emma', comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1
                    }}
                >
                    Dashboard Forum
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Left Column - Profile Content */}
                <Box sx={{ flex: 2 }}>
                    {/* About Me Section */}
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            About Me:
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                    </Paper>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} />

                    {/* Subjects Section */}
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Subjects I'm Studying
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {subjects.map((subject, index) => (
                                <Typography key={index} variant="body1" sx={{ ml: 2 }}>
                                    • {subject}
                                </Typography>
                            ))}
                        </Box>
                    </Paper>

                    {/* Schedule Section */}
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            My Schedule
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            January 2023
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Sun Mon Tue Wed Thu Fri Sat
                        </Typography>

                        <TableContainer component={Box}>
                            <Table sx={{ border: '1px solid', borderColor: 'divider' }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}></TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>2</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>3</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>4</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>5</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>6</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>7</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>1</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>10</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>11</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>12</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>13</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>14</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>15</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>16</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>17</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>18</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>19</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>20</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>21</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>22</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>23</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>24</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>25</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>26</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>27</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>28</TableCell>
                                        <TableCell sx={{ border: '1px solid', borderColor: 'divider', textAlign: 'center', py: 1 }}>29</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Session History & Tutor Reviews */}
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Session History & Tutor Reviews:
                        </Typography>

                        {reviews.map((review, index) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {review.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {review.comment}
                                </Typography>
                                {index < reviews.length - 1 && (
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 2 }} />
                                )}
                            </Box>
                        ))}
                    </Paper>
                </Box>

                {/* Right Column - Profile Info */}
                <Box sx={{ flex: 1 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    mb: 2,
                                    bgcolor: 'primary.main',
                                    fontSize: '2rem'
                                }}
                            >
                                {currentUser?.profile?.firstName?.charAt(0) || 'U'}
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                {currentUser?.profile?.firstName} {currentUser?.profile?.lastName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                                {currentUser?.role === 'tutor' ? 'Tutor' : 'Student'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Chip
                                label="Edit Profile"
                                variant="outlined"
                                clickable
                                sx={{ width: '100%', justifyContent: 'center' }}
                            />
                            <Chip
                                label="Update Schedule"
                                variant="outlined"
                                clickable
                                sx={{ width: '100%', justifyContent: 'center' }}
                            />
                            <Chip
                                label="View Progress"
                                variant="outlined"
                                clickable
                                sx={{ width: '100%', justifyContent: 'center' }}
                            />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;