var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const helpers = require('./ModelControllers.js').helpers




// db = db();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

//GET ALL MUSIC ROUTE

app.get('/music', function(req, res) {
  helpers.getMusic()
  .then(function(data){
    res.send(data);
  })
})


//POST SONG URL TO DATABASE ROUTE

app.post('/music', function(req, res) {
  // console.log(req.body)
   helpers.save(req.body);
})

//DELETE SONG URL FROM DATABASE ROUTE

app.post('/delete', function(req, res) {
  helpers.deleteSong(req.body.url)
   
})

app.listen(8080, function() {
  console.log('listening on port 8080!');
});