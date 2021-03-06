const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(cors());
// app.options('*', cors({origin: 'http://localhost:3000'}));

const helpers = require('./ModelControllers.js').helpers

// app.get('/', function(req, res){

// })

app.use(express.static(__dirname + '/../build/'));

app.use(bodyParser.json())
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000' || process.env.PORT);

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
  .then((data) =>  {
    res.send(data);
  })
  .catch((err) => {
    console.log("reloading");
  })
})

//POST SONG URL TO DATABASE ROUTE

app.post('/music', function(req, res) {
  // console.log(req.body)
   helpers.save(req.body).then((data) => {
     res.sendStatus(202);
   })
})

//DELETE SONG URL FROM DATABASE ROUTE

app.post('/delete', function(req, res) {
  helpers.deleteSong(req.body.url).then(() =>{
    res.sendStatus(202);
  })
   
})

const port = process.env.PORT || 5000;
// process.env.PORT 

app.listen(port, () => console.log(`Listening on port ${port}`));
