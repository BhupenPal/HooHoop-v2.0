'use strict'

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')

function environment() {
	let clientId = process.env.PAYPAL_SANDBOX_CLIENT_ID || process.env.PAYPAL_LIVE_ID
	let clientSecret = process.env.PAYPAL_SANDBOX_CLIENT_SECRET || process.env.PAYPAL_LIVE_SECRET

	return new checkoutNodeJssdk.core.SandboxEnvironment(
		clientId, clientSecret
	)
}

module.exports = {
	PaypalClient: () => {
		return new checkoutNodeJssdk.core.PayPalHttpClient(environment())
	}
}