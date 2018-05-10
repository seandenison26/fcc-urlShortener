//require dependecies
var 
	express = require('express'),
	bodyParser = require('body-parser');

var app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(__dirname))

app.get('/', (req,res) => {
		res.send('index.html');
});

app.use('/new/:url', (req,res) => {
	const
	url = req.params.url
	res.send() 
});

app.use('/:short', (req,res) => {
	const
	query = req.params.date
	res.send() 
});

const urlCheck = (url) => {

}



function parseDate (query) {
	console.log(query)
	if(query === query.match(/[0-9]+/)[0]) {
		num = parseInt(query, 10);
		return dateObj(num,(new Date(num * 1000)).toDateString());
	}
	else if(query.match(/[a-zA-z]+\s[0-9]{2},\s[0-9]{4}/)) {
		date = new Date(query)
		return dateObj(Math.round(date.getTime()/1000),query);
	}
	else {
		return dateObj(null,null);
	}
}


app.listen(8080);
