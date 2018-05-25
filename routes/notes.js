const express = require('express');
const router = express.Router();
const db = require("../models");

// API ROUTE /notes
//post route to create a new note in the database
router.post('/post/:id', function (req,res){
  let {body, articleId } = req.body;
  db.Note
    .create({body})
    .then( result => {
      db.Article
        .findOneAndUpdate({_id: articleId}, {$push:{notes: result._id}})
        .then( data => res.json(result))
        .catch( err => res.json(err));
    })
    .catch(err => res.json(err));
});
//get route to retrieve all notes for a particlular article
router.get('/getNotes/:id', function (req,res){
  db.Article
    .findOne({_id: req.params.id})
    .populate('notes')
    .then(results => res.json(results))
    .catch(err => res.json(err));
});
//post route to delete a note
router.post('/deleteNote', (req,res)=>{
  let {articleId, noteId} = req.body
  db.Note
    .remove({_id: noteId})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


module.exports = router;