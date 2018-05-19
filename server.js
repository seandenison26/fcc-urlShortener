const express = require('express');
const bodyParser = require('body-parser'); 
const router = require('./server/router'); 
const handleClientErrors = require('./server/errors'); 
const app = express();
 
//set static
app.use(express.static(__dirname + '/public'));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false}));

//parse application/json
app.use(bodyParser.json());

//app.use((req,res,next) => {console.log(req.params.url), next()})

//sets the the router
app.use('/',router) 
//sets the ckuebt error handler
app.use(handleClientErrors) 

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
