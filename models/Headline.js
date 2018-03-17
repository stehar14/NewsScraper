var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new HeadlineSchema object
// This is similar to a Sequelize model
var HeadlineSchema = new Schema({
// `title` and 'body' must be of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: "note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Headline model
module.exports = Headline;