import {successSnackbar} from "../utils/showSnackbar";
import Axios from "../utils/axios";

export const submitCarLead = async (body) => {
    try{
    const res = await Axios.post("/api/car/leads/submission",body)
    successSnackbar("Request Submitted Successfully")
    return res.data
    }catch(err){
        return null;
    }
}