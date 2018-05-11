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
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
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

const port = process.env.PORT  || 5000;
// process.env.PORT 

app.listen(port, () => console.log(`Listening on port ${port}`));
