

var express = require('express');
var app = express();

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/contest', function (req, res) {
    res.sendFile(__dirname + '/static/contest.html');
});

app.get('/archive', function (req, res) {
    res.sendFile(__dirname + '/static/archive.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/static/about-us.html');
});

app.listen(8080);
console.log('Server running at http://localhost:8080/');

