//Dependencies
const express = require('express');
const router = express.Router();
const db = require("../models");

router.get("/", function(req, res) {
  db.Article.find().sort({_id: -1})
    .exec(function(err, doc){
      if (err){
        console.log(err);
      } 
      else {
        var hbsObject = {articles: doc}
        res.render('index', hbsObject);
      }
    });
  });

module.exports = router;
