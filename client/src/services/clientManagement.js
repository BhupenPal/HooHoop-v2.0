import axios from 'axios';
export const getMyClientTestDrives = async () => {

    let users = await axios.get('/api/user/dashboard/test-drives');
    users = users.data;
    return users.map(user => ({
        _id: user._id,
        Date:user.Date,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        MakeModel: user.MakeModel,
        VINum: user.VINum,
        createdAt: user.createdAt
    }));
}

export const getAllClientTestDrives = async () => {

    let users = await axios.get('/api/user/dashboard/admin/test-drives');
    users = users.data;
    return users.map(user => ({
        _id: user._id,
        Date:user.Date,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        MakeModel: user.MakeModel,
        VINum: user.VINum,
        createdAt: user.createdAt,
        Author:{
            DealershipName: user.Author?.DealershipEmail,
            DealershipEmail: user.Author?.DealershipEmail,
            DealershipPhone: user.Author?.DealershipPhone,
            _id: user.Author?._id,
            FirstName: user.Author?.FirstName,
            LastName: user.Author?.LastName,
            Email: user.Author?.Email,
            Phone: user.Author?.Phone
        }
    }));
}


export const getMyClientCallBackRequests = async () => {

    let users = await axios.get('/api/user/dashboard/callback-requests');
    users = users.data;
    return users.map(user => ({
        _id: user._id,
        Date:user.Date,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        MakeModel: user.MakeModel,
        VINum: user.VINum,
        createdAt: user.createdAt
    }));
}


export const getAllClientCallBackRequests = async () => {

    let users = await axios.get('/api/user/dashboard/admin/callback-requests');
    users = users.data;
    return users.map(user => ({
        _id: user._id,
        Date:user.Date,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        MakeModel: user.MakeModel,
        VINum: user.VINum,
        createdAt: user.createdAt,
        Author:{
            DealershipName: user.Author?.DealershipEmail,
            DealershipEmail: user.Author?.DealershipEmail,
            DealershipPhone: user.Author?.DealershipPhone,
            _id: user.Author?._id,
            FirstName: user.Author?.FirstName,
            LastName: user.Author?.LastName,
            Email: user.Author?.Email,
            Phone: user.Author?.Phone
        }
    }));
}


export const getMyClientShipments = async () => {

    let users = await axios.get('/api/user/dashboard/shipments');
    users = users.data;
    return users.map(user => ({
        _id: user._id,
        Date:user.Date,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        MakeModel: user.MakeModel,
        VINum: user.VINum,
        createdAt: user.createdAt
    }));
}


export const getAllClientShipments = async () => {

    let users = await axios.get('/api/user/dashboard/admin/shipments');
    users = users.data;
    return users.map(user => ({
        _id: user._id,
        Date:user.Date,
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone,
        MakeModel: user.MakeModel,
        VINum: user.VINum,
        createdAt: user.createdAt,
        Author:{
            DealershipName: user.Author?.DealershipEmail,
            DealershipEmail: user.Author?.DealershipEmail,
            DealershipPhone: user.Author?.DealershipPhone,
            _id: user.Author?._id,
            FirstName: user.Author?.FirstName,
            LastName: user.Author?.LastName,
            Email: user.Author?.Email,
            Phone: user.Author?.Phone
        }
    }));
}

