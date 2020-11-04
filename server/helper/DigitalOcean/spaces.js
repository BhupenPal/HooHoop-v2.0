const AWS = require('aws-sdk'),
	path = require('path'),
	fs = require('fs')

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT)
const s3 = new AWS.S3({
	endpoint: spacesEndpoint,
	accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
	secretAccessKey: process.env.DO_SPACES_ACCESS_SECRET
})

const params = {
    Bucket: process.env.DO_SPACE_BUCKET_NAME,
    ACL: 'public-read'
}

module.exports = {
	uploadFolder: (fromPath, toPath) => {
		function walkSync(currentDirPath, callback) {
			fs.readdirSync(currentDirPath).forEach(function (name) {
				var filePath = path.join(currentDirPath, name)
				var stat = fs.statSync(filePath)
				if (stat.isFile()) {
					callback(filePath, stat)
				} else if (stat.isDirectory()) {
					walkSync(filePath, callback)
				}
			})
		}

		walkSync(fromPath, filePath => {
			let bucketPath = 'HooHoop' + '/' + toPath + '/' + filePath.substring(fromPath.length + 1)
			params.Body = fs.readFileSync(filePath)
			params.Key = bucketPath
			s3.putObject(params, function (err, data) {
				if (err) console.log(err)
			})
		})
	},

	uploadFile: (fromPath, fileName, toPath) => {
		var filePath = path.join(fromPath, fileName)
		let bucketPath = 'HooHoop' + '/' + toPath + '/' + fileName
		params.Body = fs.readFileSync(filePath)
		params.Key = bucketPath
		s3.putObject(params, function (err, data) {
			if (err) console.log(err)
		})
	}
}