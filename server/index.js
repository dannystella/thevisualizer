const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(cors());
// app.options('*', cors({origin: 'http://localhost:3000'}));

const helpers = require('./ModelControllers.js').helpers

// app.get('/', function(req, res){

// })

app.use(express.static(__dirname + '/../public/'));

app.use(bodyParser.json())

app.options(/.*/, function(req, res) {
  res.removeHeader('Content-Type');
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    'Access-Control-Allow-Credentials': false,
    'Access-Control-Max-Age': 86400,
  });
  res.end('{}');
});

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
