import axios from '../axios'
import { getCookie } from './validations'

const CSRFtoken = () => {
	axios
		.get('/api/csrf-token')
		.then(res => {
			axios.defaults.headers.common['X-XSRF-Token'] = getCookie('X-XSRF-Token')
		})
		.catch(err => {
			console.log(err)
		})
}

export default CSRFtoken