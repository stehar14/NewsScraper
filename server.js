// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Requiring the `Headline` and 'Note' models for accessing the collections
var Headline = require("./models/Headline.js");
var Note = require("./models/Note.js")
// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = "mongodb://user:user@ds113749.mlab.com:13749/news_scraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Routes

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
  // Create a new user using req.body
  console.log(req.body);
  // Update this route to run the `setFullName` and `lastUpdatedDate` methods before creating a new User
  // You must create these methods in the model.
  var user = new User(req.body);
  user.setFullName();
  user.lastUpdatedDate();

  User.create(user)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
