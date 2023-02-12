const mongoose = require('mongoose');

const adminaccountSchema = new mongoose.Schema({
    adminId:{type:Number, required:true, unique: true},
    username:{type:String, required:true, unique: true},
    password:{type:String, required:true}
})

const Adminaccount = mongoose.model('Adminaccount', adminaccountSchema);

module.exports = Adminaccount;
