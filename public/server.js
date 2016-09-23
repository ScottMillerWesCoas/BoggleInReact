var express = require ('express'); 
var app = express(); 
var bodyParser = require('bodyParser'); 
var fs = require('fs'); 

app.use(express.static(path.join(__dirname, './'))); 
app.use(bodyParser.urlencoded({extended: true})); 


app.get('/', function(req, res){
    res.send('./index.html'); 
});


app.listen(3000); 

