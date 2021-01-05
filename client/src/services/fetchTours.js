import axios from "../utils/axios"

export const fetchVirtualTours = async (PageNo = 1, query = "") => {
	const res = await axios.get(`/api/virtual-tours/${PageNo}?${query}`)
	const tours = res.data.docs.map((tour) => ({
		Name: tour.Name,
		State: tour.State,
		Partner: tour.Partner,
		isActive: tour.isActive,
		APID: tour.APID,
		Brand: tour.Brand
	}))
	return {
		tours: {
			docs: tours,
			hasNextPage: res.data.hasNextPage,
			hasPrevPage: res.data.hasPrevPage,
			limit: res.data.limit,
			nextPage: res.data.nextPage,
			page: res.data.page,
			pagingCounter: res.data.pagingCounter,
			prevPage: res.data.prevPage,
			totalDocs: res.data.totalDocs,
			totalPages: res.data.totalPages
		}
	}
}