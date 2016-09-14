var express = require('express');
var bodyParser = require('body-parser');
var Hashids = require('hashids'); // generate unique hash based on id and salt

var app = express();
var db = require('./models');

// configure body-parser
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// configure app to use ejs for templates
app.set('view engine', 'ejs');

// tell our server where our static files live.
var staticPath = __dirname + '/static';
app.use(express.static(staticPath));

// create instance of Hashids object
var hashids = new Hashids('mee siam mai hump');

// READ homepage
app.get('/', function (req, res) {
  res.render('index');
});

// UPDATE database
app.post('/links', function (req, res) {
  var longUrl = req.body.url;
  console.log('longUrl:', longUrl);
  // create entry in db
  db.link.create({
    url: longUrl
  }).then(function (data) {
    console.log('index.js data after create entry:', data);
    // turn a number (such as a model id) to a hash
    var hash = hashids.encode(data.id);
    res.send(hash);
  });
});

// db.link.create({
//   url: 'www.sethgodin.com'
// }).then(function (data) {
//   // code
// });

app.listen(3000);
