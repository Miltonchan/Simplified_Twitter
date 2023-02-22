const router = require('express').Router();
let Userinfo = require('../models/userinfo.model');

router.route('/').get((req, res) => {
  Userinfo.find()
    .then(userinfos => res.json(userinfos))
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/:userId').get((req, res) => {
  Userinfo.findOne({userId: parseInt(req.params.userId)})
    .then(userinfo => res.json(userinfo))
    .catch(err => res.status(400).json('Error' + err))
})

module.exports = router;
