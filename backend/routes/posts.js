const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  const postId = req.query.postId;
  if (postId) {
    Post.find({ postId: postId })
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  }else {
    Post.find()
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

// create new post
router.route('/').post(async (req, res) => {
  const id = await Post.findOne().sort({ postId: -1 }).limit(1)
  .then(post => post.postId);

  const data = req.body;
  let post = new Post({
    postId: id + 1,
    username: data.username,
    content: data.content,
    like: [],
    dislike: [],
    retweetBy: [],
    retweet: false,
  });

  post.save((err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.status(200).json('Status: success');
    }
  });
});

// like a post
router.route('/like').post(async (req, res) => {
  const data = req.body;
  const filter = {
    postId: data.postId,
  }

  let like =  await Post.findOne(filter)
    .then(post => post.like);
  
  // do nothing if user already liked the post
  if (like.includes(data.username)) {
    res.json('Status: success');
    return;
  }

  Post.updateOne(filter, { like: [...like, data.username] }, (err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.json('Status: success');
    }
  })
})

module.exports = router;
