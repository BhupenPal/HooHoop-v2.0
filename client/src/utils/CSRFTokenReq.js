import axios from '../axios'

const CSRFtoken = async () => {
	const { data } = await axios.get('/api/csrf-token')
	// axios.defaults.headers.common['X-CSRF-Tokens'] = data.csrfToken
}

export default CSRFtoken