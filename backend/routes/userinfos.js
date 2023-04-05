const router = require('express').Router();
let Userinfo = require('../models/userinfo.model');

router.route('/').get((req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  if (username) {
    Userinfo.find({ username: new RegExp(username, 'i') })
    .then(userinfos => res.json(userinfos)) 
    .catch(err => res.status(400).json('Error' + err));
  }else if (userId) {
    Userinfo.find({ userId: userId})
    .then(userinfos => res.json(userinfos))
    .catch(err => res.status(400).json('Error' + err));
  }else {
    Userinfo.find()
    .then(userinfos => res.json(userinfos))
    .catch(err => res.status(400).json('Error' + err));
  }
})

module.exports = router;
