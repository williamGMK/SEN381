import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#667eea',
            light: '#a3b1ff',
            dark: '#5a6fd8',
        },
        secondary: {
            main: '#764ba2',
            light: '#a67fd4',
            dark: '#5a387a',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        grey: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '0.9rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.8rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 20px',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                        background: alpha('#667eea', 0.04),
                    },
                },
                sizeSmall: {
                    padding: '6px 16px',
                    fontSize: '0.8rem',
                },
                sizeLarge: {
                    padding: '10px 24px',
                    fontSize: '1rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                },
                elevation2: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover fieldset': {
                            borderColor: '#667eea',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                            borderWidth: '1.5px',
                        },
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 500,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export const homeStyles = {
    heroSection: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    heroTitle: {
        fontWeight: 700,
        fontSize: { xs: '2rem', md: '2.5rem' },
        mb: 2,
        lineHeight: 1.2,
    },
    heroSubtitle: {
        mb: 3,
        maxWidth: '600px',
        margin: '0 auto',
        fontSize: { xs: '0.9rem', md: '1rem' },
        opacity: 0.9,
        lineHeight: 1.6,
    },
    primaryButton: {
        background: 'white',
        color: 'primary.main',
        px: 3,
        py: 1,
        fontSize: '0.9rem',
        fontWeight: 600,
        '&:hover': {
            background: alpha('#fff', 0.9),
            transform: 'translateY(-1px)',
        },
    },
    secondaryButton: {
        borderColor: 'white',
        color: 'white',
        px: 3,
        py: 1,
        fontSize: '0.9rem',
        fontWeight: 600,
        '&:hover': {
            borderColor: 'white',
            background: alpha('#fff', 0.1),
        },
    },
    sectionTitle: {
        fontWeight: 600,
        textAlign: 'center',
        mb: 2,
        fontSize: '1.75rem',
    },
    sectionSubtitle: {
        textAlign: 'center',
        color: 'text.secondary',
        mb: 4,
        maxWidth: '600px',
        margin: '0 auto',
        fontSize: '0.9rem',
        lineHeight: 1.6,
    },
};