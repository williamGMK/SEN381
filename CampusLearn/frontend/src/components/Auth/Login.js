import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Divider
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: 4
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    height: '600px'
                }}
            >
                {/* Left Side - Empty Space for Image */}
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: 'grey.100',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: '1px solid',
                        borderColor: 'grey.200'
                    }}
                >
                    <Box
                        sx={{
                            width: '80%',
                            height: '80%',
                            bgcolor: 'grey.200',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed grey.400'
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Image Space
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side - Login Form */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 6
                    }}
                >
                    <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
                        {/* Welcome Back Title */}
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                mb: 1,
                                color: 'text.primary'
                            }}
                        >
                            Welcome back!
                        </Typography>

                        {/* Subtitle */}
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 4,
                                color: 'text.secondary'
                            }}
                        >
                            Sign into your account
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Email:
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                placeholder="Enter your student email..."
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ mb: 3 }}
                                size="medium"
                            />

                            {/* Password Field */}
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Password:
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                placeholder="Enter your password..."
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                sx={{ mb: 4 }}
                                size="medium"
                            />

                            {/* Sign In Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    mb: 3,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none'
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Sign in'}
                            </Button>

                            {/* OR CONTINUE WITH Divider */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Divider sx={{ flex: 1 }} />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        px: 2,
                                        color: 'text.secondary',
                                        fontWeight: 500
                                    }}
                                >
                                    OR CONTINUE WITH
                                </Typography>
                                <Divider sx={{ flex: 1 }} />
                            </Box>

                            {/* Microsoft Button */}
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                sx={{
                                    py: 1.5,
                                    mb: 4,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderColor: 'grey.300',
                                    color: 'text.primary',
                                    '&:hover': {
                                        borderColor: 'grey.400',
                                        bgcolor: 'grey.50'
                                    }
                                }}
                            >
                                Microsoft Belgium Campus
                            </Button>

                            {/* Links Section */}
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                                    Don't have an account?{' '}
                                    <Link
                                        to="/register"
                                        style={{
                                            color: '#667eea',
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        Sign up here
                                    </Link>
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <Link
                                        to="/forgot-password"
                                        style={{
                                            color: '#667eea',
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        Forget your password?
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;