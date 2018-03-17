var scrape = require("../scripts/scrape.js");
var db = require("../models");

module.exports = function(app) {
  
  app.get('/', function(req, res) {
    console.log('/ get request received')
    res.render("home");
  });
  
  app.get('/headlines', function (req, res) {
    console.log('/headlines get request received')
    // Grab every document in the Funnys collection
    db.Headline.find({})
      .then(function (dbHeadline) {
          // If we were able to successfully find Funnys, send them back to the client
        res.render("headlines", {headlines: dbHeadline});
        console.log({headlines: dbHeadline})
      })
  });

  app.get("/headlines/:id", function(req, res) {
    db.Headline.findOne({_id: req.params.id})
      .populate("note")
      .then(function(dbHeadline) {
        res.render("headlines", dbHeadline);
      });
  });

  app.post("/headlines/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Headline.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new:true})
      })
      .then(function(dbHeadline) {
        res.render("headlines", dbHeadline);
      });
  });

  app.delete("/deletenote/:id", function(req, res) {
    db.Note.deleteOne(req.body)
      .then(function(dbNote) {
        return db.Headline.findOneAndUpdate({_id: req.paramas.id}, {note: dbNote._id}, {new: true})
      })
      .then(function(dbHeadline) {
        res.render("headlines", dbHeadline);
      });
  });

  app.get("/scrape", function(req, res) {
    scrape();
    res.redirect("/headlines");

  });
};
