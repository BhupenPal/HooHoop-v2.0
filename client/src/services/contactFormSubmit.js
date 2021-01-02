import axios from "../utils/axios"

export const contactFormSubmit = async (payload) => {
	return axios.post("/api/contact", payload)
}