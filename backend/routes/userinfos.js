const router = require('express').Router();
let Userinfo = require('../models/userinfo.model');

router.route('/').get((req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  if (username) {
    Userinfo.findOne({ username: new RegExp(username, 'i') })
    .then(userinfos => res.json(userinfos)) 
    .catch(err => res.status(400).json('Error' + err));
  }else if (userId) {
    Userinfo.findOne({ userId: userId})
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
    icon: data.icon,
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

// follow a user
router.route('/follow').post(async (req, res) => {
  const data = req.body;
  const followerUsername = data.followerUsername;
  const beFollowUsername = data.beFollowUsername;

  let followerArr = await Userinfo.findOne({ username: beFollowUsername })
    .then(userinfo => userinfo.follower);

  let followingArr = await Userinfo.findOne({ username: followerUsername })
    .then(userinfo => userinfo.following);


  let res1 = await Userinfo.updateOne({ username: followerUsername }, { following: [...followingArr, beFollowUsername] });

  let res2 = await Userinfo.updateOne({ username: beFollowUsername }, { follower: [...followerArr, followerUsername] });

  if (res1.acknowledged && res2.acknowledged) {
    res.json('Status: success');
  }else {
    res.status(400).json('Error: someting wrong');
  }

});

// unfollow a user
router.route('/unfollow').post(async (req, res) => {
  const data = req.body;
  const followerUsername = data.followerUsername;
  const beFollowUsername = data.beFollowUsername;

  let followerArr = await Userinfo.findOne({ username: beFollowUsername })
    .then(userinfo => userinfo.follower);
  let follower_index = followerArr.indexOf(followerUsername);
  if (follower_index != -1) {
    followerArr.splice(follower_index, 1);
  }

  let followingArr = await Userinfo.findOne({ username: followerUsername })
    .then(userinfo => userinfo.following);
  let beFollow_index = followingArr.indexOf(beFollowUsername);
  if (beFollow_index != -1) {
    followingArr.splice(beFollow_index, 1);
  }

  let res1 = await Userinfo.updateOne({ username: followerUsername }, { following: followingArr });

  let res2 = await Userinfo.updateOne({ username: beFollowUsername }, { follower: followerArr });

  if (res1.acknowledged && res2.acknowledged) {
    res.json('Status: success');
  }else {
    res.status(400).json('Error: someting wrong');
  }

});

// update userinfo
router.route('/update').post((req, res) => {
  const data = req.body;
  const filter = {
    userId: data.userId,
  }
  const value = {
    private: data.private,
  }

  Userinfo.updateOne(filter, value, (err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.json('Status: success');
    }
  });
});

// delete userinfo
router.route('/delete').post((req, res) => {
  const data = req.body;
  const filter = {
    userId: data.userId,
  }

  Userinfo.deleteOne(filter, (err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.json('Status: success');
    }
  });
});


router.route('/recommendation').get((req, res) => {
  Userinfo.find().select('username follower icon').exec()
  .then(recommend => res.json(recommend))
  .catch(error => res.status(500).json({error}))
})


module.exports = router;
