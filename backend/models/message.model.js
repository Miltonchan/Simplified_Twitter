const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId:{type:Number, required:true, unique:true},
    rmId:{type:Number, required:true, unique:false},
    userId:{type:Number, required:true, unique:false}, 
    message:{type:String, required:true, unique:false}
},{
    timestamps: true 
})


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
