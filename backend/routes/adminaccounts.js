const router = require('express').Router();
let Adminaccount = require('../models/adminaccount.model');

router.route('/').get((req, res) => {
    Adminaccount.find()
      .then(admins => res.json(admins))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
