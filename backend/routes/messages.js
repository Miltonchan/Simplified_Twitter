const router = require('express').Router();
let Message = require('../models/message.model');

router.route('/').get((req, res) => {
  const rmId = req.query.rmId;
  if (rmId) {
    Message.find({ rmId: rmId })
      .then(message => res.json(message))
      .catch(err => res.status(400).json('Error: ' + err));
  }else {
    Message.find()
    .then(message => res.json(message))
    .catch(err => res.status(400).json('Error: ' + err));
  }
})

module.exports = router;
