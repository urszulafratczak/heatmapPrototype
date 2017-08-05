var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var fs             = require('fs');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/heatmap/data", function(req, res) {
  fs.readFile('data/heatmapData.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });

});



app.listen(port);
console.log('Server running on port ' + port);
exports = module.exports = app;
