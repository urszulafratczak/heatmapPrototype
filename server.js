var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var fs             = require('fs');
//var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

/*fs.readFile('data/test.json', (err, data) => {
  if (err) throw err;
  console.log(JSON.parse(data));
});*/

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/data", function(req, res) {
  console.log("I recieved a GET request");
  fs.readFile('data/test.json', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
  //db.userlist.find(function(err, docs) {
  //  console.log(docs);

  //});
});



app.listen(port);
console.log('Server running on port ' + port);
exports = module.exports = app;
