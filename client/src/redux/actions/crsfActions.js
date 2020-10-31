
import {
    CRSF_TOKEN_FETCHED
} from './types'

export const crsfTokenFetched = () => {
    return {
		type: CRSF_TOKEN_FETCHED
	}
}