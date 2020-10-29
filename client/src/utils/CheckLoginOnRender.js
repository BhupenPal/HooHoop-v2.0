import { refreshUserToken } from '../actions/authActions'
import { GetLSWithExpiry } from '../utils/validations'
import store from '../store'

const CheckLoginOnRender = () => {

    GetLSWithExpiry('isAuthenticated')
        ?
        store.dispatch(refreshUserToken())
        :
        null

}

export default CheckLoginOnRender