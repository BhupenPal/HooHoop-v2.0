import { openLoginModel } from "../redux/actions/loginModelActions";
import store from '../redux/store'

export const showLoginModel = () => {
    store.dispatch(openLoginModel())
}

