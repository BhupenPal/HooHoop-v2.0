import axios from 'axios'
import store from './store'
import { refreshUserToken } from './actions/authActions'

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