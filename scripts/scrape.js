// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

request('http://www.myrtlebeachonline.com/latest-news/', function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          console.log(html); 
      }
});