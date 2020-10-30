import axios from '../utils/axios'

const FetchFavs = async () => {
    return (await axios.get('/api/user/dashboard/my-favourites')).data
}

export default FetchFavs