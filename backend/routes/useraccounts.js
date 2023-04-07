const router = require('express').Router();

const Useraccount = require('../models/useraccount.model')

router.route('/').get((req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  if (username) {
    Useraccount.find({ username: new RegExp(username, 'i') })
    .then(useraccounts => res.json(useraccounts)) 
    .catch(err => res.status(400).json('Error' + err));
  }else if (userId) {
    Useraccount.find({ userId: userId})
    .then(useraccounts => res.json(useraccounts))
    .catch(err => res.status(400).json('Error' + err));
  }else {
    Useraccount.find()
    .then(useraccounts => res.json(useraccounts))
    .catch(err => res.status(400).json('Error' + err));
  }
})

router.route('/').post(async (req, res) => {
  const data = req.body;
  const lastUserId = await Useraccount.findOne().sort({ userId: -1 }).limit(1)
    .then(useraccount => useraccount.userId);

  const useraccount = new Useraccount({
    userId: lastUserId + 1,
    username: data.username,
    password: data.password,
  })

  useraccount.save((err) => {
    if (err) {
      res.status(400).json('Status: faild');
    }else {
      res.status(200).json('Status: success');
    }
  })
})

module.exports = router;



