import axios from '../utils/axios';
export const getUsers = async () => {

    let users = await axios.get('/api/user/dashboard/all-users');
    users = users.data.docs;
    return users.map(user => ({
        Role: user.Role,
        EmailVerified: user.EmailVerified,
        PhoneVerified: user.PhoneVerified,
        Credits: user.Credits,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Phone: user.Phone,
        Email: user.Email,
        DisplayPic: user.DisplayPic,
        Address: user.Address,
        DOB:user.DOB
    }));
}