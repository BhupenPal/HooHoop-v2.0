import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR
} from "./types";

export const openSnackbar = ({message,severity}) => ({
    type:OPEN_SNACKBAR,
    payload:{
        message,
        severity
    }
})
export const closeSnackbar = () => ({
    type:CLOSE_SNACKBAR
})