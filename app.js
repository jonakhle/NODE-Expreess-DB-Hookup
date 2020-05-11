//Loading libraries/frameworks
var express = require('express'); //Importing express and saving it to a variable
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();  //executing entire express package and saving it to a variable

//Configuration lines
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'join_us'
});

// respond with "hello world" when a GET request is made to the homepage
// Below code adds a route expects a request and sends out a response 
app.get('/', function(req, res){
    //Find count of users in DB
    //Respond with that count
    var q = 'Select COUNT(*) AS count FROM users';
    connection.query(q, function(err, results){
        if(err) throw err;
        var count = results[0].count; //Stores the results into count
        // res.send("We have " + count + " users in our db");
        res.render('home', {count: count}); // home looked for in the views directory and variable count
    });
});


app.post('/register', function(req, res){

    var person = {
        email:req.body.email
    };
    
    connection.query('Insert into users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});


//Starts the server on port 3000
app.listen(3000, function(){                     
    console.log("Server running on 8080!");

});
