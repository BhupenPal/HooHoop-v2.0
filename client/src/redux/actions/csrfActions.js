
import {
    CSRF_TOKEN_FETCHED
} from './types'

export const csrfTokenFetched = () => {
    return {
		type: CSRF_TOKEN_FETCHED
	}
}