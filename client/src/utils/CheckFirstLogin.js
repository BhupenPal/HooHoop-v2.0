import { setCurrentUser, logoutUser, refreshUserToken } from '../actions/authActions'
import axios from '../axios'
import store from '../store'

const CheckFirstLogin = () => {
    axios.get('/api/user/check-login')
        .then(res => {
            store.dispatch(setCurrentUser(res.data))
        })
        // .catch(err => {
        //     store.dispatch(refreshUserToken())
        // })
        .catch(err => {
            store.dispatch(logoutUser())
        })
}

export default CheckFirstLogin