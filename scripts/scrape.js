// Require request and cheerio. This makes the scraping possible
const request = require("request");
const cheerio = require("cheerio");
var db = require("../models");

module.exports = function() {
  request('http://www.myrtlebeachonline.com/latest-news/', function(err, resp, html) {
    const $ = cheerio.load(html);
    $("article").each(function(i, element) {
      let results = {};
      results.title = $(element).children().children(".title").text().trim();
      results.url = $(element).children().children(".title").children("a").attr("href");
      if ($(element).find("img").attr("src") != null) {
        results.image = $(element).find("img").attr("src");
      } else {
        results.image = "assets/images/placeholder.png";
      }
      results.body = $(element).children().children().remove().end().text().trim();        
        console.log("URL" + results.url);
      
      // let url = $(element).find("a").attr("href");
      // console.log(url);
      // console.log(title + "\n" + content);
      // results.url = url;
      var headline = new db.Headline(results);
      headline.save(function(err, headline) {
        if (err) {
          if (err.name === "BulkWriteError") {
            return console.log("Article exists in database, skipped.");
          } else {
            return console.error(err);
          }
        }
      })
    });
  })
}