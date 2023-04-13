const mongoose = require('mongoose');

const userinfoSchema = new mongoose.Schema({
    userId:{type:Number, required:true, unique:true},
    username:{type:String, required:true, unique:true},
    nickname:{type:String, required:true, unique:true},
    icon:{type:String},
    private:{type:Boolean},
    follower:[{type:String}],
    following:[{type:String}],
    visibleTo:[{type:String}]
})


const Userinfo = mongoose.model('Userinfo', userinfoSchema);

module.exports = Userinfo;
