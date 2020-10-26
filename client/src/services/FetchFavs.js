import axios from '../axios'

const FetchFavs = async () => {
    const Favourites = (await axios.get('/api/user/dashboard/my-favourites')).data
    console.log(Favourites)
    return {
        ...Favourites
    }
}

export default FetchFavs