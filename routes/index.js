//Dependencies
const express = require('express');
const router = express.Router();
const db = require("../models");

router.get("/", function(req, res) {
  // Query MongoDB for all article entries (sort newest to top, assuming Ids increment)
  db.Article.find().sort({_id: -1})
    // .populate('comments')
    .exec(function(err, doc){
      if (err){
        console.log(err);
      } 
      // or send the doc to the browser as a json object
      else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
      }
    });
  });

module.exports = router;
