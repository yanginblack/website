var express = require('express');
var app = express();

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//app.set('views', __dirname + '/views');

app.use('/files', express.static(__dirname + '/files'));

//router
app.get('/', function(request, response) {
  response.render("index");
});

app.get('/projects', function(request, response) {
  response.render("projects");

});

app.get('/games', function(request, response) {
  response.render("games");

});

app.get('/about', function(request, response) {
  response.render("aboutme");
});
/*
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

   // respond with json
   if (req.accepts('json')) {
     res.send({ error: 'Not found' });
     return;
   }

  // default to plain-text. send()
  res.type('txt').send('Not found');
 });
*/
app.listen(8080);
