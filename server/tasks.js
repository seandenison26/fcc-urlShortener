const
	uuidv3 = require('uuid/v3')

const checkUrl = (url) => {
	const check = new RegExp(/^https?:\/\/[0-9a-zA-Z]+.\S+/)
	if(check.test(url)) 
		return url 
	else
		throw Error("INVALID_URL")
	}

const createShortUrlDoc = (url) => {
	const _id = uuidv3(url, uuidv3.URL),

	doc = {
		_id: _id,
		old_url: url,
		short_code: `${_id.split('-')[0].toUpperCase()}`
	} 
	return doc
}

const clientDocDisplay = (host,urlDoc) => { return {old_url:urlDoc.old_url, new_url:`http:\/\/${host}\/${urlDoc.short_code}`} }

const tasks = {checkUrl,createShortUrlDoc,clientDocDisplay}

module.exports = tasks
