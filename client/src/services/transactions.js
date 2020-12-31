import axios from '../utils/axios'

export const FetchTransactions = async (pageNo = 0, size = 10) => {
    return (await axios.get(`/api/transactions/all/${pageNo}/${size}`)).data
}
