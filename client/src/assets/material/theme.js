import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    shadows: Array(25).fill('none'),
    palette: {
        primary: {
            main: '#7E7E7E',
        },
        secondary: {
            main: '#FFB6C1',
        }
    },
    typography: {
        fontFamily: 'Poppins',
        h1: {
            fontSize: '2rem', //32px
            fontWeight: 600
        },
        h2: {
            fontSize: '1.75rem', //28px
            fontWeight: 600
        },
        h3: {
            fontSize: '1.50rem', //24px
            fontWeight: 500
        },
        h4: {
            fontSize: '1.25rem', //20px
            fontWeight: 500
        },
        h5: {
            fontSize: '1rem', //16px
            fontWeight: 500
        },
        h6: {
            fontSize: '0.75rem', //12px
            fontWeight: 500
        }
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
        },
        MuiFormControl: {
            variant: 'outlined',
            fullWidth: true
        }
    },
});

export default theme;
