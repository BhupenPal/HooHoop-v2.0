import { refreshUserToken } from '../redux/actions/authActions'
import { GetLSWithExpiry } from '../utils/validations'
import store from '../redux/store'

const CheckLoginOnRender = () => {

    GetLSWithExpiry('isAuthenticated')
        ?
        store.dispatch(refreshUserToken())
        :
        null

}

export default CheckLoginOnRender