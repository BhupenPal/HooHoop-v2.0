import axios from 'axios';
export const getProfile = async () => {

    let profile = await axios.get('/api/user/dashboard/profile');
    profile = profile.data;
    return {
        Role: profile.Role,
        EmailVerified: profile.EmailVerified,
        PhoneVerified: profile.PhoneVerified,
        Credits: profile.Credits,
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        Phone: profile.Phone,
        Email: profile.Email,
        DisplayPic: profile.DisplayPic,
        Address: profile.Address,
        DOB:profile.DOB
    }
}