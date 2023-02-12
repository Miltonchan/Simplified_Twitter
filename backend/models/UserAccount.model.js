const mongoose = require('mongoose')

const UserAccountSchema = new mongoose.Schema({
    userId:{type: Number, required: true, unique: true},
    username:{type: String, required: true, unique: true},
    password:{type: String, required: true}
})

const UserAccount = mongoose.model('UserAccount', UserAccountSchema)

module.exports = UserAccount
