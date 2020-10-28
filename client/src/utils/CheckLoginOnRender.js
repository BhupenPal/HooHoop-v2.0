import { setCurrentUser, logoutUser, refreshUserToken } from '../actions/authActions'
import { GetLSWithExpiry } from '../utils/validations'
import axios from '../axios'
import store from '../store'

const CheckLoginOnRender = () => {

    GetLSWithExpiry('isAuthenticated')
        ?
        // Dispatch user loader here
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
        :
        null

}

export default CheckLoginOnRender