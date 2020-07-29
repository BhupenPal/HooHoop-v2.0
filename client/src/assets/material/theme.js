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
        h2: {
            fontSize: '2.00rem' //32px
        },
        h3: {
            fontSize: '1.75rem' //28px
        },
        h4: {
            fontSize: '1.50rem' //24px
        },
        h5: {
            fontSize: '1.25rem' //20px
        },
        h6: {
            fontSize: '1.00rem' //16px
        },
        body1: {

        },
        body2: {

        }
    },
    overrides: {
        MuiButton: {
            root: {
                transform: 'none',
                textTransform: 'none'
            },
        },
    },
    props: {
        MuiButton: {
            disableRipple: true,
            variant: 'contained',
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
