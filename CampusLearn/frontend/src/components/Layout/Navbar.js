import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    Chip,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleMenuClose();
    };

    const handleProfile = () => {
        navigate('/profile');
        handleMenuClose();
    };

    const handleDashboard = () => {
        navigate('/dashboard');
        handleMenuClose();
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 2 }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: 'primary.main',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}
                        >
                            CL
                        </Box>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent'
                            }}
                        >
                            CampusLearn
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {currentUser ? (
                            <>
                                <Button color="inherit" onClick={() => navigate('/dashboard')} size="small">
                                    Dashboard
                                </Button>
                                {currentUser.role === 'tutor' && (
                                    <Button color="inherit" onClick={() => navigate('/tutor/modules')} size="small">
                                        My Modules
                                    </Button>
                                )}
                                <Button color="inherit" onClick={() => navigate('/topics')} size="small">
                                    Topics
                                </Button>
                                <Button color="inherit" onClick={() => navigate('/forum')} size="small">
                                    Forum
                                </Button>
                                <Button color="inherit" onClick={() => navigate('/messages')} size="small">
                                    Messages
                                </Button>

                                {/* User Profile with Dropdown */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                                    <Avatar
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: 'primary.main',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleMenuOpen}
                                    >
                                        {currentUser.profile?.firstName?.charAt(0) || 'U'}
                                    </Avatar>
                                    <Box sx={{ cursor: 'pointer' }} onClick={handleMenuOpen}>
                                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1 }}>
                                            {currentUser.profile?.firstName} {currentUser.profile?.lastName}
                                        </Typography>
                                        <Chip
                                            label={currentUser.role}
                                            size="small"
                                            color={currentUser.role === 'admin' ? 'secondary' :
                                                currentUser.role === 'tutor' ? 'primary' : 'default'}
                                            sx={{ height: 20, fontSize: '0.6rem' }}
                                        />
                                    </Box>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                minWidth: 160,
                                                borderRadius: 2,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <MenuItem onClick={handleProfile}>
                                            <Typography variant="body2">Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleDashboard}>
                                            <Typography variant="body2">Dashboard</Typography>
                                        </MenuItem>
                                        {currentUser.role === 'admin' && (
                                            <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>
                                                <Typography variant="body2">Admin Panel</Typography>
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={handleLogout}>
                                            <Typography variant="body2" color="error">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" onClick={() => navigate('/login')} size="small">
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/register')}
                                    size="small"
                                    sx={{
                                        ml: 1,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;