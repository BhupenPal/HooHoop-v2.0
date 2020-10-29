const { default: Nexmo } = require('nexmo')

module.exports = (req, res, next) => {
	req.ValidationDataSet = false
	req.ExteriorSliderCount = 0
	next()
}