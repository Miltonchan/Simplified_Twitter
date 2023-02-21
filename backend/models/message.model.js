const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId:{type:Number, required:true, unique:true},
    rmId:{type:Number, required:true, unique:true},
    userId:{type:Number, required:true, unique:true}, 
    message:{type:String, required:true, unique:true}
},{
    timestamps: true 
})


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
