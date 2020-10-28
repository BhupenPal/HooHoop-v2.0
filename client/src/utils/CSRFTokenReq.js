import axios from '../axios'
import { getCookie, deleteCookie } from './validations'

const CSRFtoken = () => {
	axios
		.get('/api/csrf-token')
		.then(res => {
			axios.defaults.headers.delete['X-XSRF-Token'] = getCookie('X-XSRF-Token')
			axios.defaults.headers.patch['X-XSRF-Token'] = getCookie('X-XSRF-Token')
			axios.defaults.headers.post['X-XSRF-Token'] = getCookie('X-XSRF-Token')
			axios.defaults.headers.put['X-XSRF-Token'] = getCookie('X-XSRF-Token')
			deleteCookie('X-XSRF-Token')
		})
		.catch(err => {
			console.log(err)
		})
}

export default CSRFtoken