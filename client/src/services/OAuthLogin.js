import axios from 'axios'

const GoogleLoginService = async tokenId => {
    return axios.post('/api/user/googlelogin', { tokenId })
        .then(res => res.data)
        .catch(() => null)
}

const FacebookLoginService = async (accessToken, userID) => {
    return axios.post('/api/user/facebooklogin', { accessToken, userID })
        .then(res => res.data)
        .catch(() => null)
}

export { GoogleLoginService, FacebookLoginService }