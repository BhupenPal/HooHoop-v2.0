export const validateEmail = email => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const validPassword = password => {
	// Minimum eight characters, at least one letter, one number and one special character
	const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
	return re.test(password)
}

export const SetLSWithExpiry = (key, value, ttl) => {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	// ttl is in milliseconds
	const item = {
		value: value,
		expiry: now.getTime() + ttl
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export const GetLSWithExpiry = key => {
	const itemStr = localStorage.getItem(key)

	// if the item doesn't exist, return null
	if (!itemStr) return false

	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}

	// If item.value is equal to true (STRING) then return boolean
	// Otherwise return original value
	if (item.value === 'true') return true
	return item.value
}

export const getCookie = name => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop().split(';').shift()
}