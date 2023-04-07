const router = require('express').Router();
let Chatroom = require('../models/chatroom.model');

router.route('/').get((req, res) => {
  const firstUserId = req.query.firstUserId;
  if (firstUserId) {
    Chatroom.find({ firstUserId: firstUserId })
      .then(chatrooms => res.json(chatrooms))
      .catch(err => res.status(400).json('Error: ' + err));
  }else {
    Chatroom.find()
    .then(chatrooms => res.json(chatrooms))
    .catch(err => res.status(400).json('Error: ' + err));
  }
})

module.exports = router;
