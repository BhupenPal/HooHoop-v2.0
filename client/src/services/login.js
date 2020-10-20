import Axios from "axios";

export const googleLoginSuccess = (tokenId) => {
    return Axios.post("/api/user/googlelogin",{tokenId})
    .then(res => res.data)
    .catch(() => {
        return null
    })
}