const mongoose = require('mongoose');

const commentaccountSchema = new mongoose.Schema({
    postId:{type:Number, required:true},
    username:{type:String, required:true},
    content:{type:String, required:true},
},{
    timestamps: true 
})

const Comment = mongoose.model('Comment', commentaccountSchema);

module.exports = Comment;
