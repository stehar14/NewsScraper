// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");

module.exports = function() {
  request('http://www.myrtlebeachonline.com/latest-news/', function(err, resp, html) {
    if (!err){
      const $ = cheerio.load(html);
      let results = [];
      $("#nativo").each(function(i, element) {
        var title = $(element).children("article").children().children(".title").text();
        console.log(title);
      })
      $("#story-list-2").each(function(i, element) {
      var title = $(element).children("article").children().children(".title").text();
      console.log(title);
      })
      $("#story-list-3").each(function(i, element) {
        var title = $(element).children("article").children().children(".title").text();
        console.log(title);
        })
        // var body =$(element).children()
        // var url = $(element).children()
      
    }
  })
}