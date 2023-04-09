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

  let post =  await Post.findOne(filter)
    .then(post => post.toObject());
  
  let like = post.like;
  if (!post.like.includes(data.username)) {
    like = [...like, data.username];
  }

  let dislike = post.dislike;
  const index = post.dislike.indexOf(data.username);
  if (index != -1) {
    dislike.splice(index, 1);
  }

  Post.updateOne(filter, { like: like, dislike: dislike }, (err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.json('Status: success');
    }
  });

});

// dislike a post
router.route('/dislike').post(async (req, res) => {
  const data = req.body;
  const filter = {
    postId: data.postId,
  }

  let dislike =  await Post.findOne(filter)
    .then(post => post.dislike);
  
  // do nothing if user already disliked the post
  if (dislike.includes(data.username)) {
    res.json('Status: success');
    return;
  }

  Post.updateOne(filter, { dislike: [...dislike, data.username] }, (err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.json('Status: success');
    }
  })
});



module.exports = router;
