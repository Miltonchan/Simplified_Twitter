const router = require('express').Router();
let Message = require('../models/message.model');

router.route('/').get((req, res) => {
  const rmId = req.query.rmId;
  if (rmId) {
    Message.find({ rmId: rmId })
      .then(messages => res.json(messages))
      .catch(err => res.status(400).json('Error: ' + err));
  }else {
    Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json('Error: ' + err));
  }
})

router.route('/').post(async (req, res) => {
  const id = await Message.findOne().sort({ messageId: -1 }).limit(1)
    .then(message => message.messageId);

  const data = req.body;
  let message = new Message({
    messageId: id + 1,
    rmId: data.rmId,
    userId: data.userId,
    message: data.message,
  })

  message.save((err) => {
    if (err) {
      res.status(400).json('Status: faild');
    }else {
      res.status(200).json('Status: success');
    }
  })
})

module.exports = router;
