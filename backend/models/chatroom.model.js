const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    rmId:{type:Number, required:true, unique:true},
    firstUserId:{type:Number, required:true, unique:false},
    secUserId:{type:Number, required:true, unique:false},
})

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
