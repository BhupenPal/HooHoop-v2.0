import axios from '../axios'
import { returnErrors } from './errorActions'
import { SetLSWithExpiry } from '../utils/validations'

import {
	USER_LOADING,
	SET_CURRENT_USER,
	LOGOUT_SUCCESS,
	LOGIN_FAIL,
	AUTH_ERROR,
	GET_ERRORS
} from './types'

// Register User
export const registerUser = (userData, setError, history) => dispatch => {
	axios
		.post('/api/user/register', userData)
		.then(res => {
			res.status === 200 ? history.push('/login') : null
		})
		.catch(err => {
			setError(err.response?.data?.error?.message || err.message)
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: AUTH_ERROR
			})
		})
}

// Login get a user payload
export const loginUser = (userData, setError) => dispatch => {
	axios
		.post('/api/user/login', userData)
		.then(res => {
			SetLSWithExpiry('isAuthenticated', 'true', parseInt(process.env.ACCESS_TOKEN_EXPIRE_IN))
			dispatch(setCurrentUser(res.data))
		})
		.catch(err => {
			setError(err.response?.data?.error?.message || err.message)
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: AUTH_ERROR
			})
		})
}

export const refreshUserToken = () => dispatch => {
	axios
		.get('/api/user/refresh-token')
		.then(res => {
			SetLSWithExpiry('isAuthenticated', 'true', parseInt(process.env.ACCESS_TOKEN_EXPIRE_IN))
			dispatch(setCurrentUser(res.data))
		})
		.catch(err => {
			localStorage.removeItem('isAuthenticated')
			setError(err.response?.data?.error?.message || err.message)
			dispatch({
				type: LOGIN_FAIL
			})
		})
}

export const socialLogin = decoded => dispatch => {
	dispatch({
		type: USER_LOADING
	})
	SetLSWithExpiry('isAuthenticated', 'true', parseInt(process.env.ACCESS_TOKEN_EXPIRE_IN))
	dispatch(setCurrentUser(decoded))
}

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// Log user out
export const logoutUser = () => dispatch => {
	dispatch({ type: LOGOUT_SUCCESS })
	localStorage.removeItem('isAuthenticated')
	axios
		.delete('/api/user/logout')
		.then(res => {})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response?.data
			})
		})
}