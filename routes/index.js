var express = require('express');
var router = express.Router();

posts = [
  {
    id: 1,
    title: "First blog post",
    content: "first post content"
  },
  {
    id: 2,
    title: "Second blog post",
    content: "second post content"
  },
  {
    id: 3,
    title: "third blog post",
    content: 'third post content'
  },
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { posts: posts });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  // Save the post
  // Get an id for that post
  // Redirect to /post/id
  var title = req.body.title;
  var content = req.body.body;
  res.render('post', { title: title, content: content });
});

router.get('/post/:id', function(req, res, next) {
  var post = posts.find(function(post) {
    return post.id == req.params.id;
  });
  res.render('post', post);
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
