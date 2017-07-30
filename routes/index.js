var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

// posts = [
//   {
//     id: 1,
//     title: "First blog post",
//     content: "first post content"
//   },
//   {
//     id: 2,
//     title: "Second blog post",
//     content: "second post content"
//   },
//   {
//     id: 3,
//     title: "third blog post",
//     content: 'third post content'
//   }
// ];
/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/blogapp', function(err, db) {
    if (err) console.log(err);

    db.collection('blogposts').find().toArray(function (err, result) {
      res.render('index', { posts: result });
    });
  });
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.body;


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
