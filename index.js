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

// READ original URL and redirect
app.get('/:hash', function (req, res) {
  var hashed = req.params.hash; // just hash param, not full link
  var id = hashids.decode(hashed); // id = decoded hash
  console.log('hash...', hashed, '... & id:', id);
  // retrieve original url from db using id
  db.links.find({
    where: {id: id}
  }).then(function (data) {
    var actualUrl = 'http://' + data.url;
    res.redirect(actualUrl);
  });
  // db.links.findById(id).then(function (data) {
  //   res.redirect(data.id);
  // });
});

// UPDATE database
app.post('/links', function (req, res) {
  var longUrl = req.body.url;
  console.log('longUrl:', longUrl);
  // create entry in db
  db.links.create({
    url: longUrl
  }).then(function (data) {
    res.redirect('/links/' + data.id);
  });
});

// READ UPDATED shortened url page
app.get('/links/:id', function (req, res) {
  // turn a number (such as a model id) to a hash
  var hash = hashids.encode(req.params.id);

  var shortUrl = 'localhost:3000/' + hash;
  console.log('shortUrl:', shortUrl);
  res.render('link_show.ejs', {url: shortUrl});
});

app.listen(3000);
