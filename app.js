

var express = require('express');
var app = express();

app.use(express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.listen(8080);
console.log('Server running at http://localhost:8080/');

