var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//memory chat room script

var messages = [], names = [];
var storeMessage = function(name, data) {
  messages.push({name:name, data:data});
  if (messages.length > 15)
    messages.shift();
};
io.on('connection', function(client) {
  client.on('join', function(name) {
    client.nickname = name;
    client.broadcast.emit('message', name + " just enter the room");
    console.log("client " + name + " is connecting...");
    for (var i=0;i<messages.length; i++) {
      client.emit('message', messages[i].name + ": " + messages[i].data);
    }
    names.push({name:name});
    client.emit('names', names);
    client.broadcast.emit('names', names);
  });
  client.on('message', function(data) {
    client.broadcast.emit('message', client.nickname + ": " + data);
    client.emit('message', client.nickname + ": " + data);
    storeMessage(client.nickname, data);      
  });
  client.on('disconnect', function() {
    if (typeof client.nickname !== "undefined") {
      client.broadcast.emit('message', client.nickname + "has left room");
      console.log("client " + client.nickname + " has left room"); 
      for (var i=0;i<names.length;i++) {
        if (names[i].name === client.nickname) {
          names.splice(i, 1);
        }
      }
      client.broadcast.emit('names', names); 
    }    
  });

});



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

app.get('/snow', function(request, response) {
  response.render("snow");
});

app.get('/memorygame', function(request, response) {
  response.render("MemoryGame");
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
server.listen(8080);
