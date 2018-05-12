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

//returns an array of the users ven from the db, call backmiddle ware will probablly authticate, or build an object, get uuid is probablly a good one as well
router.get('/api/getUserVen/:user/', (req, res) => {
	let user = req.params.user

	tasks.getUserVen(user)
	.then((data) => {
		console.log(data)
		res.send(data)
	})
	.catch((err) => res.send(new Error ("User has no Ven.")));
});

//returns a number of UUIDs equal to array.length of docs given,
router.post('/api/getUUIDs', (req, res) => {
	tasks.addUUID(req.body)
		.then((data) => {
			res.send(req.body)
		})
		.catch((err) => res.send(err));
});

//currently set up to eventually use Promis.all, currently will just save the first doc
router.post('/api/createDoc', (req, res) => {
	console.log('Creating')
	tasks.addUUID(Array.of(req.body))
	.then((docs) => tasks.putDoc(docs[0]))
	.then((doc) => { res.send(doc) })
	.catch((err) => {
		console.log(err)
		res.send(new Error(`Unable to create doc. Error:${err}`))
	});
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

