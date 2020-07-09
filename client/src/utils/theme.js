import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    shadows: Array(25).fill('none'),
    palette: {
        primary: {
            main: '#7E7E7E',
        },
        secondary: {
            main: '#FFB6C1',
        },
    },
    typography: {
        fontFamily: 'Poppins',
        h4: {
            fontSize: 36,
            fontWeight: 600,
        },
        body1: {
            fontSize: 13.5,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                transform: 'none'
            },
        },
    },
    props: {
        MuiButton: {
            disableRipple: true,
            variant: 'contained',
            color: 'primary',
            fullWidth: true
        },
        MuiCheckbox: {
            disableRipple: true,
        },
        MuiTextField: {
            variant: 'outlined',
            fullWidth: true,
            margin: 'normal'
        },
        MuiTab: {
            disableRipple: true
        }
    },
});

export default theme;
