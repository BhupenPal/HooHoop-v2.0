import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const PaypalPaymentButton = ({ toPay, onSuccess, transactionError, transactionCancelled }) => {
	// const onSuccess = (payment) => {
	// 	// Congratulation, it came here means everything's fine!
	// 	console.log("The payment was succeeded!", payment);
	// 	// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
		
	// 	// Calling our sucess prop and passing the payment details
	// 	onSuccess(payment)
	// }

	const onCancel = (data) => {
		// User pressed "cancel" or close Paypal's popup!
		// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data

		// Calling our sucess prop and passing the payment details
		transactionCancelled(data)
	}

	const onError = (err) => {
		// The main Paypal's script cannot be loaded or somethings block the loading of that script!
		// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
		// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear

		// Calling our sucess prop and passing the payment details
		transactionError(data)
	}

	let env = 'sandbox'; // you can set here to 'production' for production
	let currency = 'NZD'; // or you can set this value from your props or state
	
	const client = {
		sandbox: process.env.PAYPAL_SANDBOX_CLIENT_ID,
		production: process.env.PAYPAL_LIVE_CLIENT_ID,
	}
	// In order to get production's app-ID, you will have to send your app to Paypal for approval first
	// For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
	//   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
	// For production app-ID:
	//   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

	// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!

	const style = {
		size: 'large',
		color: 'blue',
		shape: 'rect'
	}
	return (
		<PaypalExpressBtn 
			style={style}
			env={env} 
			client={client} 
			currency={currency} 
			total={toPay} 
			onError={onError} 
			onSuccess={onSuccess} 
			onCancel={onCancel}
		 />
	);
}

export default PaypalPaymentButton