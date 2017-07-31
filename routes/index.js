var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) throw err;

    db.collection('blogposts').find().toArray(function (err, result) {
      res.render('index', { posts: result });
    });
  });
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;


  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) throw err;

    db.collection('blogposts').insertOne({
      title: title,
      content: content
    }, function(err, result) {
      res.redirect('/post/' + result.insertedId);
    })
  });
});

router.post('/delete', function(req, res, next) {
  var id = new ObjectID(req.body._id);

  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) throw err;

    db.collection('blogposts').deleteOne({
      "_id": id
    }, function(err, result) {
      res.redirect('/');
    })
  });
});

// /post/:id/edit
router.get('/post/:id', function(req, res, next) {
  var id = new ObjectID(req.params.id);

  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) throw err;

    db.collection('blogposts').findOne({"_id": id}, function(err, result){
      console.log(result);
      res.render('post', result);
    });
  });
});

router.get('/post/:id/edit', function(req, res, next) {
  var id = new ObjectID(req.params.id);

  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) throw err;

    db.collection('blogposts').findOne({"_id": id}, function(err, result){
      console.log(result);
      res.render('edit', result);
    });
  });
});

router.post('/post/:id', function(req, res, next) {
  console.log(req.params.id);
  var id = new ObjectID(req.params.id);
  var title = req.body.title;
  var content = req.body.content;

  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) throw err;

    db.collection('blogposts').updateOne({"_id": id}, {
      $set: { "title": title, "content": content}
    }, function(err, result){
      console.log(result);
      res.redirect('/post/' + id);
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('new');
});



module.exports = router;

//- /
//- post/
//-   - index
//- post/:id
//-   - id = favorite-ny-bar
//- post/new
//-   - new form
//-   - submit 'post/'
//-
//- comments/
//- recipes/
