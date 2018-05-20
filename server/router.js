//creates dependencies
const 
	path = require('path'),
	express = require('express'),
	db = require('./db'),
	tasks = require('./tasks')

//creates router
var router = express.Router();

var rootDir = __dirname + '/../' 

//routes the react app
router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});

//build two views, one for all the urls, one for all the shortened urls
//
//currently set up to eventually use Promis.all, currently will just save the first doc
router.get('/new/:url(*)', (req, res) => {
	//check to see it's already been added?
	//insert into db
	
	const url = req.params.url

	Promise.resolve(
	tasks.checkUrl(url))
	//.then(tasks.checkForUrl(url))	
	.then(url => tasks.createShortUrlDoc(url))
	.then(docs => db.putDoc(docs))
	/*
	//.then(doc =>  doc)
	*/
	.then(doc => tasks.clientDocDisplay(req.headers.host, doc))
	.then((doc) => { 
		console.log('sent')	
		res.send(doc) 
			})
	.catch((err) => {
		res.send(`Unable to create doc. Error:${err.message}`)
	})
})

//flag a doc as deleted
router.delete('/:shortUrl', (req, res) => {
	/*
	db.delDoc(req.body)
		.then((newDoc) => {
			console.log('DELETE SUCCESS')
			res.send(newDoc)
		})
		.catch((err) => {console.log(err),res.send(err)});
	*/
})
//exports the router
module.exports = router
