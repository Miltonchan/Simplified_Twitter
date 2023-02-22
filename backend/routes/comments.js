const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/:postId').get((req, res) => {
  Comment.find({postId: req.params.postId})
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;
