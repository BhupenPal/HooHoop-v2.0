import axios from 'axios'
import store from '../redux/store'
import { refreshUserToken } from '../redux/actions/authActions'

axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			store.dispatch(refreshUserToken())
		}
		return Promise.reject(error)
	}
)

export default axios