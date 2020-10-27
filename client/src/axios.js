import axios from 'axios'
import store from './store'
import { refreshUserToken } from './actions/authActions'

axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (error.response.data.error.message === 'jwt expired') {
			store.dispatch(refreshUserToken())
		}
		return Promise.reject(error)
	}
)

export default axios