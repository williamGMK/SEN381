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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate all fields
        const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword'];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());

        if (emptyFields.length > 0) {
            setError(`Please fill in: ${emptyFields.join(', ')}`);
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                py: 3
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        minHeight: '600px'
                    }}
                >
                    {/* Left Side - Branding */}
                    <Box
                        sx={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            p: 4
                        }}
                    >
                        <Box textAlign="center">
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                CampusLearn
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Start your learning journey with us
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right Side - Registration Form */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: 4
                        }}
                    >
                        <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 1,
                                    color: '#1e293b',
                                    textAlign: 'center'
                                }}
                            >
                                Join CampusLearn
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 4,
                                    color: '#64748b',
                                    textAlign: 'center'
                                }}
                            >
                                Create your account to start learning or teaching
                            </Typography>

                            {error && (
                                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit}>
                                {/* Role Selection */}
                                <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                                    <FormLabel
                                        component="legend"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            color: '#1e293b',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        I want to register as:
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="role"
                                        value={formData.role}
                                        onChange={handleRoleChange}
                                        sx={{ justifyContent: 'space-between', gap: 1 }}
                                    >
                                        <FormControlLabel
                                            value="student"
                                            control={<Radio sx={{ color: '#667eea' }} />}
                                            label="Student"
                                            sx={{
                                                flex: 1,
                                                border: formData.role === 'student' ? '2px solid #667eea' : '1px solid #e2e8f0',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1,
                                                m: 0
                                            }}
                                        />
                                        <FormControlLabel
                                            value="tutor"
                                            control={<Radio sx={{ color: '#667eea' }} />}
                                            label="Tutor"
                                            sx={{
                                                flex: 1,
                                                border: formData.role === 'tutor' ? '2px solid #667eea' : '1px solid #e2e8f0',
                                                borderRadius: 2,
                                                px: 2,
                                                py: 1,
                                                m: 0
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>

                                {/* Name Fields */}
                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        required
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        size="small"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        size="small"
                                        sx={{ mb: 2 }}
                                    />
                                </Box>

                                {/* Username Field */}
                                <TextField
                                    fullWidth
                                    required
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    size="small"
                                    sx={{ mb: 2 }}
                                    helperText="This will be your unique identifier"
                                />

                                {/* Email Field */}
                                <TextField
                                    fullWidth
                                    required
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    size="small"
                                    sx={{ mb: 2 }}
                                />

                                {/* Password Fields */}
                                <TextField
                                    fullWidth
                                    required
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    size="small"
                                    sx={{ mb: 2 }}
                                    helperText="Minimum 6 characters"
                                />

                                <TextField
                                    fullWidth
                                    required
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    size="small"
                                    sx={{ mb: 3 }}
                                />

                                {/* Create Account Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="medium"
                                    disabled={loading}
                                    sx={{
                                        py: 1.2,
                                        mb: 2,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: 2,
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                                        }
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Create Account'}
                                </Button>

                                {/* Sign In Link */}
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                                        Already have an account?{' '}
                                        <Link
                                            to="/login"
                                            style={{
                                                color: '#667eea',
                                                textDecoration: 'none',
                                                fontWeight: 600
                                            }}
                                        >
                                            Sign in here
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;