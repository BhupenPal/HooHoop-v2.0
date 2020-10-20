import axios from 'axios'

const GoogleLoginService = async tokenId => {
    console.log(tokenId)
    return axios.post('/api/user/googlelogin', { tokenId })
        .then(res => res.data)
        .catch(() => null)
}

const FacebookLoginService = async code => {
    return axios.post('/api/user/googlelogin', code)
        .then(res => res.data)
        .catch(() => null)
}

export { GoogleLoginService, FacebookLoginService }