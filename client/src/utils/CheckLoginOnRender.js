import { logoutUser, refreshUserToken } from '../actions/authActions'
import { GetLSWithExpiry } from '../utils/validations'
import store from '../store'

const CheckLoginOnRender = () => {

    GetLSWithExpiry('isAuthenticated')
        ?
        store.dispatch(refreshUserToken())
        :
        store.dispatch(logoutUser())

}

export default CheckLoginOnRender