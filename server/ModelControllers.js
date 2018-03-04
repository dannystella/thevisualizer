const mongoose = require('mongoose');
mongoose.connect('mongodb://danny:danny@ds255308.mlab.com:55308/mymusicsongs')
var db = mongoose.connection;

let musicSchema = mongoose.Schema({
    url: {type: String, unique: true}
})

let Song = mongoose.model('Song', musicSchema);

var helpers = {};

helpers.getMusic = function() {
  return Song.find({}).exec();
}

helpers.save = (song) => {
    return Song.create(song, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("success");
        }
    });
}

helpers.deleteSong = function(url) {
    console.log(url)
    return Song.remove({url: url.url}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("success")
        }
    });
  }

module.exports.helpers = helpers;