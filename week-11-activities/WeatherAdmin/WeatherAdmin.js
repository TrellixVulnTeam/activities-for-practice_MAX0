var fs = require("fs");
var UserSearch = require("./UserSearch");

var WeatherAdmin = function() {
  this.getData = function() {
    fs.readFile("log.txt", "utf8", function(error, data) {
      console.log(data);
    });
  };

  this.newUserSearch = function(name, location) {
    var newUserSearch = new UserSearch(name, location);
    var logTxt =
      "\nName: " + newUserSearch.name + " Location: " + newUserSearch.location + " Date: " + newUserSearch.date;

    fs.appendFile("log.txt", logTxt);

    newUserSearch.getWeather();
  };
};

module.exports = WeatherAdmin;

// Instructions

// Implement the logic for the WeatherAdmin component. As with the UserSearch component, you should start with pseudocode.


// This component requires you to read and save information. Be sure to require the appropriate Node package.
// Create a WeatherAdmin constructor. This constructor should return an object with two methods.
// One of those methods is newUserSearch, which should accept a user's name and location; search for the weather in their area; and save the user's information in a log of all searches users have made thus far.
// The other method is getData, which should log or return a list of all of the searches users have executed thus far.
// Test the WeatherAdmin component by feeding it dummy data for now.