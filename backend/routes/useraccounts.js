const router = require('express').Router();

const Useraccount = require('../models/useraccount.model');

router.route('/').get((req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  if (username) {
    Useraccount.find({ username: new RegExp(username, 'i') })
    .then(useraccounts => res.json(useraccounts)) 
    .catch(err => res.status(400).json('Error: ' + err));
  }else if (userId) {
    Useraccount.find({ userId: userId})
    .then(useraccounts => res.json(useraccounts))
    .catch(err => res.status(400).json('Error: ' + err));
  }else {
    Useraccount.find()
    .then(useraccounts => res.json(useraccounts))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

// create new useraccount
router.route('/').post(async (req, res) => {
  const data = req.body;
  const lastUserId = await Useraccount.findOne().sort({ userId: -1 }).limit(1)
    .then(useraccount => useraccount.userId);

  const useraccount = new Useraccount({
    userId: lastUserId + 1,
    username: data.username,
    password: data.password,
  });

  useraccount.save((err) => {
    if (err) {
      res.status(400).json('Error: ' + err);
    }else {
      res.status(200).json('Status: success');
    }
  })
});

// change password
router.route('/changePassword').post(async (req, res) => {
  const data = req.body;
  const filter = { 
    username: data.username,
    password: data.oldPassword,
  };

  const oldUseraccount = await Useraccount.findOne(filter);
  if (oldUseraccount) {
    if (data.oldPassword == data.newPassword || !data.newPassword) {
      res.status(400).json('Invalid input');
    }else {
      Useraccount.updateOne(filter, {password: data.newPassword}, (err) => {
        if (err) {
          res.status(400).json('Something wrong');
        }else {
          res.json('Status: success');
        }
      })
    }
  }else {
    res.status(400).json('Old password incorrect');
  }
});

module.exports = router;



