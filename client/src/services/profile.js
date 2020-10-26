import axios from '../axios'

const FetchProfile = async () => {
	let Profile = (await axios.get('/api/user/dashboard/profile')).data
	return {
		Role: Profile.Role,
		EmailVerified: Profile.EmailVerified,
		PhoneVerified: Profile.PhoneVerified,
		Credits: Profile.Credits,
		FirstName: Profile.FirstName,
		LastName: Profile.LastName,
		Phone: Profile.Phone,
		Email: Profile.Email,
		DisplayPic: Profile.DisplayPic,
		Address: Profile.Address,
		DOB: Profile.DOB
	}
}

export default FetchProfile