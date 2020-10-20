import axios from 'axios'

const FetchProfile = async () => {
	const Profile = await axios.get('/api/user/dashboard/profile')
	return Profile.data
}

export default FetchProfile