const mongoose = require('mongoose');

const useraccountSchema = new mongoose.Schema({
    userId:{type:Number, required:true, unique:true},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

const Useraccount = mongoose.model('Useraccount', useraccountSchema);

module.exports = Useraccount;
