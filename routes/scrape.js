const express = require('express');
const cheerio = require('cheerio');
const rp = require('request-promise');
const router = express.Router();
const db = require('../models');
var axios = require("axios");

// ROUTE: /scrape

router.get('/', function(req, res) {
  axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

        console.log(result)

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        // Promise.all()
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err)
          // If an error occurred, send it to the client
          return res.json(err);

        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send('scrape complete');
  });
})

module.exports = router;



  // axios.get("https://medium.com/").then(function(response) {
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   var $ = cheerio.load(response.data);

  //   // Now, we grab every h2 within an article tag, and do the following:
  //   $(".extremePostPreview-post").each(function(i, element) {
  //     // Save an empty result object
  //     var result = {};

  //     // Add the text and href of every link, and save them as properties of the result object
  //     result.title = $(this)
  //       .children('a')
  //       .children('h3')
  //       .text();
  //     result.link = $(this)
  //       .children('a')
  //       .attr('href')
  //     result.byline = $(this)
  //       .children('a.ds-link--stylePointer')
  //       .children('div')
  //       .text()
        
  //     // Create a new Article using the `result` object built from scraping
  //     db.Article.create(result)
  //       .then(function(dbArticle) {
  //         // View the added result in the console
  //         console.log(dbArticle);
  //       })
  //       .catch(function(err) {
  //         // If an error occurred, send it to the client
  //         return res.json(err);
  //       });
  //   });

  //   // If we were able to successfully scrape and save an Article, send a message to the client
  //   res.send('scrape complete');
  // });


  // axios.get("http://www.echojs.com/").then(function(response) {
  //   // Then, we load that into cheerio and save it to $ for a shorthand selector
  //   var $ = cheerio.load(response.data);

  //   // Now, we grab every h2 within an article tag, and do the following:
  //   $("article h2").each(function(i, element) {
  //     // Save an empty result object
  //     var result = {};

  //     // Add the text and href of every link, and save them as properties of the result object
  //     result.title = $(this)
  //       .children("a")
  //       .text();
  //     result.link = $(this)
  //       .children("a")
  //       .attr("href");

  //     // Create a new Article using the `result` object built from scraping
  //     db.Article.create(result)
  //       .then(function(dbArticle) {
  //         // View the added result in the console
  //         console.log(dbArticle);
  //       })
  //       .catch(function(err) {
  //         // If an error occurred, send it to the client
  //         return res.json(err);
  //       });
  //   });

  //   // If we were able to successfully scrape and save an Article, send a message to the client
  //   res.send("Scrape Complete");
  // });
