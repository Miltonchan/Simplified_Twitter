const router = require('express').Router();
let Adminaccount = require('../models/adminaccount.model');

router.route('/').get((req, res) => {
    Adminaccount.find()
      .then(admins => res.json(admins))
      .catch(err => res.status(400).json('Error: ' + err));
});

// admin login
router.route('/login').post((req, res) => {
  const data = req.body;
  const filter = {
    username: data.username,
    password: data.password,
  }

  Adminaccount.findOne(filter)
    .then(adminaccount => adminaccount? res.json(adminaccount) : res.json('Error: wrong username or passoword'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
