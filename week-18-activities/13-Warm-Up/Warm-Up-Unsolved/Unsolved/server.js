// Your assignment is to define the routes below. Good luck!

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Configure our app for morgan and body parser
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Static file support with public folder
app.use(express.static("public"));

// Mongojs configuration
var databaseUrl = "warmup";
var collections = ["books"];

// Hook our mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// ======

// TODO: Fill in each route so that the server performs
// the proper mongojs functions for the site to function
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// Post a book to the mongoose database
app.post("/submit", function(req, res) {
  // Save the request body as an object called book
  var book = req.body;

  // If we want the object to have a boolean value of false,
  // we have to do it here, because the ajax post will convert it
  // to a string instead of a boolean
  book.read = false;
  db.books.insert (book, function (err, data) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

function updateRead(isRead, req, res) {
  db.books.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $set: {
      read: isRead
    }, function(err, data) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(data);
      }
    }
  });
}

// Find all books marked as read
app.get("/read", function(req, res) {
  db.books.find({read: true}, function(error, found) {
    //Log any errors if the server encounters one.
    if (error) {
        console.log(error);
    }
    //Otherwise, send the result of this query to the browser.
    else {
        res.json(found);
    }
  });
});

// Find all books marked as unread
app.get("/unread", function(req, res) {
  db.books.find({read: false}, function(error, found) {
    //Log any errors if the server encounters one.
    if (error) {
        console.log(error);
    }
    //Otherwise, send the result of this query to the browser.
    else {
        res.json(found);
    }
});



});

// Mark a book as having been read
app.put("/markread/:id", function(req, res) {
  // Remember: when searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IDYOUWANTTOFIND))
  updateRead(true,req, res);
});

// Mark a book as having been not read
app.put("/markunread/:id", function(req, res) {
  // Remember: when searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IDYOUWANTTOFIND))
  updateRead(false,req, res);
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
