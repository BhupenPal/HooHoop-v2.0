import { openSnackbar } from "../redux/actions/snackbarActions";
import store from '../redux/store'

import Axios from "../utils/axios";

export const submitCarLead = async (body) => {
    try{
    const res = await Axios.post("/api/car/leads/submission",body)
    store.dispatch(openSnackbar("Request Submitted Successfully"))

    return res.data
    }catch(err){
        return null;
    }
}