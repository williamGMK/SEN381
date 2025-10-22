import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton
} from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const AdminPanel = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Sandhyaa Buhhu',
            email: 'sandy@campile.com',
            role: 'Tutor',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Lee',
            email: 'leo@campile.com',
            role: 'Tutor',
            status: 'Pending verification'
        },
        {
            id: 3,
            name: 'Blitz',
            email: 'blitz@campile.com',
            role: 'Learner',
            status: 'Active'
        }
    ]);

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
                    CampusLearn
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.secondary',
                        mb: 3
                    }}
                >
                    Admin Panel - Manage users and content
                </Typography>
            </Box>

            {/* Users Table */}
            <TableContainer
                component={Paper}
                elevation={2}
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 4
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: 'grey.50' }
                                }}
                            >
                                <TableCell sx={{ py: 2 }}>{user.name}</TableCell>
                                <TableCell sx={{ py: 2 }}>{user.email}</TableCell>
                                <TableCell sx={{ py: 2 }}>{user.role}</TableCell>
                                <TableCell sx={{ py: 2 }}>
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: '0.75rem',
                                            fontWeight: 'medium',
                                            backgroundColor: user.status === 'Active' ? 'success.light' : 'warning.light',
                                            color: user.status === 'Active' ? 'success.dark' : 'warning.dark'
                                        }}
                                    >
                                        {user.status}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                    <IconButton size="small" sx={{ mr: 1 }}>
                                        <ChatIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small">
                                        <ChatIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Divider */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        px: 4,
                        py: 1,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                >
                    Discard changes
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        px: 4,
                        py: 1,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                >
                    Save changes
                </Button>
            </Box>
        </Container>
    );
};

export default AdminPanel;