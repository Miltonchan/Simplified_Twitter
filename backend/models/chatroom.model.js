const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    rmId:{type:Number, required:true, unique:true},
    firstUserId:{type:Number, required:true, unique:true},
    secUserId:{type:Number, required:true, unique:true},
})

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
