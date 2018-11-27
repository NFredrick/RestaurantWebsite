var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home', {
    title: "Home",
    scripts: [{script: "/js/nav.js"}]
  }); 
});

app.get('/menu', function(req, res) {
  res.render('menu', {title: "Menu"});
});

app.get('/directions', function(req, res) {
  res.render('directions', {title: "Directions"});
});

app.get('/events', function(req, res) {
  res.render('events', {title: "Events"});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});