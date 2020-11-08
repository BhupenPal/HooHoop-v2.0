import { openSnackbar } from "../redux/actions/snackbarActions";
import store from '../redux/store'

export const successSnackbar = (message) => {
    store.dispatch(openSnackbar({message,severity:"success"}))
}


export const errorSnackbar = (message) => {
    store.dispatch(openSnackbar({message,severity:"error"}))
}