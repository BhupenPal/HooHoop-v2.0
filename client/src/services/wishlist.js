import axios from 'axios';
export const addToWishList = async (VINum) => {

    let res = await axios.patch('/api/wish-handle',{VINum});
    return res.data;
}