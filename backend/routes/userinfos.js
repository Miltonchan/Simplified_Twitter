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

// create new userinfo
router.route('/').post(async (req, res) => {
  const data = req.body;
  const lastUserId = await Userinfo.findOne().sort({ userId: -1 }).limit(1)
    .then(userinfo => userinfo.userId);

  const userinfo = new Userinfo({
    userId: lastUserId + 1,
    username: data.username,
    nickname: data.nickname,
    private: false,
    follower: [],
    following: [],
    visibleTo: [],
  });

  userinfo.save((err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.status(200).json('Status: success');
    }
  })
});

module.exports = router;
