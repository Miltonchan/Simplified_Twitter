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

// create new comment
router.route('/').post((req, res) => {
  const data = req.body;
  const comment = new Comment({
    postId: data.postId,
    username: data.username,
    content: data.content,
  })

  comment.save((err) => {
    if (err) {
      res.status(400).json('Status: faild');
    }else {
      res.status(200).json('Status: success');
    }
  })
})

module.exports = router;
