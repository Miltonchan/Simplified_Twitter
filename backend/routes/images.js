const router = require('express').Router();
const multer = require('multer')
const fs = require('fs');
let Image = require('../models/image.model');
let Post = require('../models/post.model');

//local storage on uploads folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

//add tweet images
router.route('/image').post(upload.single('image'),(req,res)=>{
    const saveImage = new Image({
      postid: req.body.postid,
      img:{
        data: fs.readFileSync('uploads/' + req.file.filename),
        contentType:"image/png"
      }
    })
    saveImage.save()
    .then((res)=>{console.log('image is saved')})
    .catch((err)=>{console.log(err,'error has occured')})
    res.send('success')
  })


//get the current() highest postId
router.route('/getpostid').get((req,res)=>{

    Post.findOne().sort({ postId: -1 }).limit(1).exec(function(err, item) {
      if(err){
        res.status(400).json('Error: ' + err);
      }else{
        res.json(item.postId);
      }
    })
  })

//fetch the images needed respect to postid
router.route('/getimage').get((req, res) => {
    const postid = req.query.postid;
    Image.find({ postid: postid },(err,img) =>{
        if(err){
            res.status(400).json('Error: ' + err)
        }else{
            res.json(img)}
    })
})

//*** get all images
router.route('/get').get( async (req, res) => {
    const allData = await Image.find()
    res.json(allData)
})




module.exports = router;
