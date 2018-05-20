
const
	db = require('./db'),
	uuidv3 = require('uuid/v3')




const checkUrl = (url) => {
	const check = new RegExp(/^https?:\/\/[0-9a-zA-Z]+.\S+/)
	if(check.test(url)) 
		return url 
	else
		return Promise.reject(Error('INVALID_URL'))
}

const checkForUrl = async (url) => {
		const doc = await db.getView('urls',url)
				console.log(doc)
		if(!doc.error && doc.rows.length < 1) {
				return url 
		}
		else {
			console.log(url,'error')
			return Promise.reject(Error(doc.rows[0]))
		}
		//return Promise.reject(Error('BAD_URLS_VIEW_CHECK'))
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

const tasks = {checkForUrl,checkUrl,createShortUrlDoc,clientDocDisplay}

module.exports = tasks
