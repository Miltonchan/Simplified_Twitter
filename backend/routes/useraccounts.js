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

module.exports = router;



