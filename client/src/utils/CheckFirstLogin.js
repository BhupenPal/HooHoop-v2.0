import { setCurrentUser } from '../actions/authActions'
import axios from '../axios'
import store from '../store'

const CheckFirstLogin = () => {
    axios.get('/api/user/check-login')
        .then(res => {
            store.dispatch(setCurrentUser(res.data))
        })
        .catch(err => {
            console.log(err)
        })
}

export default CheckFirstLogin