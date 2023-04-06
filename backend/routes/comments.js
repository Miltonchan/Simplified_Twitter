const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req, res) => {
  const postId = req.query.postId;
  if (postId) {
    Comment.find({ postId: postId })
      .then(comments => res.json(comments))
      .catch(err => res.status(400).json('Error' + err));
  } else {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error' + err));
  }
})

module.exports = router;
