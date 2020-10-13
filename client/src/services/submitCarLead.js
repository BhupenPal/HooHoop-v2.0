import Axios from "axios";

export const submitCarLead = async (body) => {
    const res = await Axios.post("/api/car/leads/submission",body)
    return res.data
}