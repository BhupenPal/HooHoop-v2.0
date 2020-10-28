import { GET_ERRORS, CLEAR_ERRORS } from './types'

export const returnErrors = (news, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: { news, status, id }
	}
}

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	}
}