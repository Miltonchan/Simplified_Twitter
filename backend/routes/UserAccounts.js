const router = require('express').Router()

const UserAccount = require('../models/UserAccount.model')

router.route('/').get((req, res) => {
  UserAccount.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error' + err))
})

module.exports = router