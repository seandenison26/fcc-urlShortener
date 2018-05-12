const express = require("express");
const bodyParser = require('body-parser'); 
const router = require('./server/router'); 
const app = express();
 
app.use(express.static(__dirname + '/public'));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false}));

//parse application/json
app.use(bodyParser.json());

//sets the the router
app.use('/',router); 

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
