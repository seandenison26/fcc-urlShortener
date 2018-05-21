
const
	db = require('./db'),
	uuidv3 = require('uuid/v3')




const checkUrl = (url) => {
	const check = new RegExp(/^https?:\/\/[0-9a-zA-Z]+.\S+/)
	if(check.test(url)) {
		return url 
	}
	else {
		return Promise.reject(Error('INVALID_URL'))
	}
}

const checkForUrl = async (url) => {
		const doc = await db.getView('urls',url)
		if (!doc.error && doc.rows.length < 1) {
			return url  
		}
		else {
			return doc.rows[0] }
}

const checkForCode = async (code) => {
		console.log(code)
		const doc = await db.getView('codes',code)
		console.log(doc)
		if (!doc.error && doc.rows.length != 1) {
			return Promise.reject(Error('INVALID_CODE'))
		}
		else {
			return doc.rows[0].value }
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

const tasks = {checkForCode,checkForUrl,checkUrl,createShortUrlDoc,clientDocDisplay}

module.exports = tasks
