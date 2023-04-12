const router = require('express').Router();
let Chatroom = require('../models/chatroom.model');

router.route('/').get((req, res) => {
  const userId = req.query.userId;
  if (userId) {
    Chatroom.find({ $or: [{ firstUserId: userId }, {secUserId: userId}] })
      .then(chatrooms => res.json(chatrooms))
      .catch(err => res.status(400).json('Error: ' + err));
  }else {
    Chatroom.find()
    .then(chatrooms => res.json(chatrooms))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

// create a new chatroom
router.route('/').post(async (req, res) => {
  const data = req.body;
  const filter = {
    firstUserId: data.firstUserId,
    secUserId: data.secUserId,
  }
  const oldChatroom = await Chatroom.findOne(filter)
    .then(chatroom => chatroom? true : false);

  if (oldChatroom) {
    res.status(400).json('Error: chatroom already exists');
  }else {
    const rmId = await Chatroom.findOne()
      .sort({ rmId: -1 })
      .then(chatroom => chatroom.rmId);

    const chatroom = new Chatroom({
      rmId: rmId + 1,
      firstUserId: data.firstUserId,
      secUserId: data.secUserId,
    });

    chatroom.save((err) => {
      if (err) {
        res.status(400).json('Error: ' + err);
      }else {
        res.status(200).json('Status: success');
      }
    });
  }
});

module.exports = router;
