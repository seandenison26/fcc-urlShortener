const 
	http = require('http'),
	dbOptions = {
		hostname:'star-pelican.glitch.me',
		port: '443',
		path: '/url-short',
	}

//desired middle ware, 
//returns http request promise
const dbRequest = (options, body = null) => {
	console.log(`Req: ${options.method} `, body) 
	return new Promise((res,rej) => {
		const req = http.request(options, (data) => {
			console.log(options)
			let rawData = '' 
			data.setEncoding('utf8')
			data.on('data', c => rawData += c)
			data.on('end',() => { 	
			res(JSON.parse(rawData))
			console.log(rawData)
			})
			data.on('error', (e) => rej(e))	
		})
		req.on('error', (e) => rej(e))	
		req.write(body)
		req.end()
	})
}

//creates http request options
const reqOptions = (method, headers, path = dbOptions.path) => {
	let
       		newOptions = JSON.parse(JSON.stringify(dbOptions))	
	return Object.assign(newOptions, {method,headers,path:newOptions.path + path})
}	
//performs a get request to the DB and returns a JSON view
const queryDB = (url) => {
	return new Promise((res,rej) => {
		http.get(url, (view) => {
			let rawData = '' 
			view.setEncoding('utf8')
			view.on('data', c => rawData += c)
			view.on('end',() => { 	
			res(JSON.parse(rawData))
			})
			view.on('error', (e) => {console.log(`$QUERY ERROR {e}`), rej(e)})	
		})
	})
}

//takes in an array, gets number of UUIDs based upon the length and adds an _id prop to each of the objs
const addUUID = (objs) => {
	const url = `https:\/\/${DB}/_uuids?count=${objs.length}`
	return new Promise((res,rej) => {
		queryDB(url)
			.then((ids) => {
				res(objs.map((o,i) => Object.assign(o,{"_id":ids.uuids[i]})))	
			})
			.catch(rej)		
	})
}

//get single document by ID 
const getDocByID = (id) => {
	const url = `https:\/\/${DB}/${id}`
				console.log(url)
	return new Promise((res,rej) => {
		queryDB(url)
			.then((doc) =>  {
				console.log(doc)
				res(doc)
			}
			)
			.catch(rej)		
	})
}

//updates a doc based on _id and _rev 
const putDoc = (doc) => {
	const
       		path = `/${doc._id}/`	
		body = JSON.stringify(doc),
		method = 'PUT',
		headers = {
			'Content-Type': 'application/json',	
			'Content-Length': `${body.length}`	
		}
	return new Promise((res,rej) => {
		dbRequest(reqOptions(method,headers,path),body)
			.then((data) => {
				data.ok === true ? res(Object.assign(doc,{_rev:data.rev})) : rej(data)
			})
			.catch((err) => { console.log('Update Err'), rej(err)})		
	})
}

//deletes a doc based on _id and _rev 
const delDoc = (doc) => {
	const
       		path = `/${doc._id}/`	
		method = 'DELETE',
		headers = {
			'If-Match': `${doc._rev}`	
		}

	return new Promise((res,rej) => {
		dbRequest(reqOptions(method,headers,path),body)
			.then((data) => {
				data.ok === true ? res(data) : rej(data)
			})
			.catch((err) => { console.log('Delete Err'), rej(err)})		
	})
}

const tasks = {addUUID,putDoc,delDoc,getDocByID}

module.exports =  tasks
