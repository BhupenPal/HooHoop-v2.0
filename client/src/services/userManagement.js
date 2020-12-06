import axios from '../utils/axios';
import { errorSnackbar, successSnackbar } from '../utils/showSnackbar';
export const getUsers = async () => {

    let users = await axios.get('/api/user/dashboard/all-users');
    users = users.data.docs;
    return users.map(user => ({
        _id: user._id,
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

export const deleteUser = async (id) => {
    return axios
    .delete('/api/user/dashboard/delete/user', {data:{value:id}})
    .then(() => {
        successSnackbar("User Deleted successfully")
        return true;
    }) 
    .catch(err => {
        errorSnackbar(err?.message || "Something Went Wrong");
        return false;
    })
}