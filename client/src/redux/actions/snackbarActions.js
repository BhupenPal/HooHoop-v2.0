import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR
} from "./types";

export const openSnackbar = (message) => ({
    type:OPEN_SNACKBAR,
    payload:message
})
export const closeSnackbar = () => ({
    type:CLOSE_SNACKBAR
})