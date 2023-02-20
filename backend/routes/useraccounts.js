const router = require('express').Router();

const Useraccount = require('../models/useraccount.model')

router.route('/').get((req, res) => {
  Useraccount.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;



