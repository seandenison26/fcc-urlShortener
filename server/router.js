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
	//check to make sure it's a url
	//check to see it's already been added?
	//insert into db
	//return short doc
	
	const url = req.params.url
	Promise.resolve(tasks.checkUrl(url))
	.then((url) => tasks.createShortUrlDoc(url))
	//.then(tasks.checkForDoc(url))	
/*
	.then((docs) => db.putDoc(docs))
*/
	.then((doc) => { 
		console.log(doc)
		res.send(doc) 
	
	})
	.catch((err) => {
		res.send(new Error(`Unable to create doc. Error:${err}`))
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
