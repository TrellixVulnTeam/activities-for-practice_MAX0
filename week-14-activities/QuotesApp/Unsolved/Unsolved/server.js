var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Root get route
app.get("/", function(req, res) {
  connection.query("SELECT * FROM quotes;", function(err, data) {
    if (err) throw err;

    // Test it
    console.log('The solution is: ', data);

    // Test it
    // return res.send(data);

    res.render("index", { quotes: data });
  });
});

// Post route -> back to home
app.post("/", function(req, res) {
  // Test it
  console.log('You sent, ' + req.body.quote);

  // Test it
  return res.send('You sent, ' + req.body.task);

  // When using the MySQL package, we'd use ?s in place of any values to be inserted, which are then swapped out with corresponding elements in the array
  // This helps us avoid an exploit known as SQL injection which we'd be open to if we used string concatenation
  // https://en.wikipedia.org/wiki/SQL_injection
  connection.query("INSERT INTO tasks (task) VALUES (?,?)", [req.body.author, req.body.quote], function(err, result) {
    if (err) throw err;

    res.json({id: result.insertId });
    res.redirect("/")
  });
});

// Express and MySQL code should go here.

app.listen(port, function() {
  console.log("Listening on PORT " + port);
});
