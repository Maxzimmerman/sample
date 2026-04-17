import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        colors: {
            primary: string;
            secondary: string;
            background: string;
            text: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        colors?: {
            primary?: string;
            secondary?: string;
            background?: string;
            text?: string;
        };
    }
}

const theme = createTheme({
    colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        background: '#f5f5f5',
        text: '#333333',
    },
});

export default theme;