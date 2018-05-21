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
	const url = req.params.url

	Promise.resolve(
	tasks.checkUrl(url))
	.then(checkedUrl => tasks.checkForUrl(checkedUrl))	
	.then((check) => { 
			const doc = check.value
			if (check.value !== undefined && check.value._id)  {
				return Promise.reject({message: tasks.clientDocDisplay(req.headers.host, check.value)})
			}
			else {
				return tasks.createShortUrlDoc(check)}})
	.then(docs => db.putDoc(docs))
	.then(doc => tasks.clientDocDisplay(req.headers.host, doc))
	.then((doc) => { res.send(doc) })
	.catch((err) => { 
		res.send(err.message) 
	})
})

//flag a doc as deleted
router.get('/:short_code', (req, res) => {
	console.log(req.params.short_code)
	tasks.checkForCode(req.params.short_code)
		.then((doc) => {
			res.redirect(doc.old_url)
		})
		.catch((err) => {console.log(err),res.send('CODE NOT FOUND')});
})

//exports the router
module.exports = router
