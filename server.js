// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:user@ds113749.mlab.com:13749/news_scraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes

require("./routes/html_routes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});