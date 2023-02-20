const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId:{type:Number, requried:true, unique:true},
    username:{type:String, required:true},
    content:{type:String, required:true},
    like:[{type:String}],
    dislike:[{type:String}],
    retweetBy:[{type:String}],
    retweet:{type:Boolean, required:true}
},{
    timestamps: true 
})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
