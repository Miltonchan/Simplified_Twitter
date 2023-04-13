const mongoose = require('mongoose');


const imgSchema  = new mongoose.Schema({
    postid: {type:Number, requried:true},
    img:{
        data: Buffer,
        contentType:String
    }
})


const Image = mongoose.model('Image', imgSchema);

module.exports = Image;
