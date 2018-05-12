//creates dependencies
const 
	path = require('path'),
	express = require('express'),
	tasks = require('./tasks')

//creates router
var router = express.Router();

var rootDir = __dirname + '/../' 

//routes the react app
router.get('/', (req, res) => {

	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

//currently set up to eventually use Promis.all, currently will just save the first doc
router.get('/new', (req, res) => {
	console.log('GET')
	const url = 'Whaddup World'//req.params.url,
	doc = {
		old_url:url
	}	
	res.send(doc)	
	/*
	tasks.addUUID(Array.of(url))
	.then((docs) => tasks.putDoc(docs[0]))
	.then((doc) => { res.send(doc) })
	.catch((err) => {
		console.log(err)
		res.send(new Error(`Unable to create doc. Error:${err}`))
	});
	*/
});

//update a doc
router.put('/api/updateDoc', (req, res) => {
	tasks.putDoc(req.body)
		.then((newDoc) => {
			console.log('UPDATE SUCCESS')
			res.send(newDoc)
		})
		.catch((err) => {console.log(err),res.send(err)});
});

//flag a doc as deleted
router.delete('/api/deleteDoc', (req, res) => {
	tasks.delDoc(req.body)
		.then((newDoc) => {
			console.log('DELETE SUCCESS')
			res.send(newDoc)
		})
		.catch((err) => {console.log(err),res.send(err)});
});
//exports the router
module.exports = router;

