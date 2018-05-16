const
	uuidv3 = require('uuid/v3')

const checkUrl = (url) => {
	const check = new RegExp(/^https?:\/\/[0-9a-zA-Z]+.\S+/)
	return check.test(url) ? url : new Error("INVALID_URL")
}

const createShortUrlDoc = (url) => {
	const _id = uuidv3(url, uuidv3.URL),

	doc = {
		_id: _id,
		old_url: url,
		shortUrl: `${_id.split('-')[0].toUpperCase()}`
	} 
	return doc
}

const tasks = {checkUrl,createShortUrlDoc}

module.exports = tasks
