const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set("strictQuery", false);
// Nodejs v16 use IPv16, so if you use Nodejs v16, replace localhost with 127.0.0.1
mongoose.connect('mongodb://127.0.0.1:27017/');
// mongoose.connect('mongodb://localhost:27017/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
    console.log("MongoDB database connection established successfully");

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors({
        origin: '*'
    }));

    const useraccountRouter = require('./routes/useraccounts');
    const adminaccountRouter = require('./routes/adminaccounts');
    const userinfoRouter = require('./routes/userinfos');
    const commentRouter = require('./routes/comments');
    const postRouter = require('./routes/posts');
    const chatroomRouter = require('./routes/chatrooms');
    const messageRouter = require('./routes/messages');

    app.use('/useraccounts', useraccountRouter);
    app.use('/adminaccounts', adminaccountRouter);
    app.use('/userinfos', userinfoRouter);
    app.use('/comments', commentRouter);
    app.use('/posts', postRouter);
    app.use('/chatrooms', chatroomRouter);
    app.use('/messages', messageRouter);

    let Useraccount = require('./models/useraccount.model');
    let Adminaccount = require('./models/adminaccount.model');
    let Userinfo = require('./models/userinfo.model');
    let Comment = require('./models/comment.model');
    let Post = require('./models/post.model');
    let Chatroom = require('./models/chatroom.model');
    let Message = require('./models/message.model');

    //Init the schema data 
    Adminaccount.create({
        adminId:'1',
        username:'admin',
        password:'admin'
    }, (err,admin)=>{
        if(err){
            return console.log(err)
        } 
        console.log(admin)
    })

    Useraccount.create({
        userId:'100',
        username:'stu100',
        password:'stu100'
    }, (err,user)=>{
        if(err){
            return console.log(err)
        } 
        console.log(user)
    })

    Useraccount.create({
        userId:'101',
        username:'stu101',
        password:'stu101'
    }, (err,user)=>{
        if(err){
            return console.log(err)
        } 
        console.log(user)
    })

    Useraccount.create({
        userId:'102',
        username:'stu102',
        password:'stu102'
    }, (err,user)=>{
        if(err){
            return console.log(err)
        } 
        console.log(user)
    })

    Userinfo.create({
        userId:'100',
        username:'stu100',
        nickname:'Mickey',
        private: false,
        follower: ['stu100','stu102'],
        following:['stu100'],
        visibleTo:['stu100']
    }, (err,user)=>{
        if(err){
            return console.log(err)
        } 
        console.log(user)
    })

    Userinfo.create({
        userId:'101',
        username:'stu101',
        nickname:'Minnie',
        private: false,
        follower: ['stu100','stu102'],
        following:['stu100'],
        visibleTo:['stu100']
    }, (err,user)=>{
        if(err){
            return console.log(err)
        } 
        console.log(user)
    })

    Userinfo.create({
        userId:'102',
        username:'stu102',
        nickname:'Donald',
        private: false,
        follower: ['stu101'],
        following:['stu101','stu100'],
        visibleTo:['stu100']
    }, (err,user)=>{
        if(err){
            return console.log(err)
        } 
        console.log(user)
    })

    Post.create({
        postId:'1',
        username:'stu100',
        content:'Today is my first day using Twitter :D',
        like:['Mickey','Minnie'],
        dislike:['Donald'],
        retweetBy:['Minnie'],
        retweet:false,
        retweeter:''
    }, (err,post)=>{
        if(err){
            return console.log(err)
        } 
        console.log(post)
    })

    Comment.create({
        postId:'1',
        username:'stu101',
        content:'Enjoy!!!'
    }, (err,comment)=>{
        if(err){
            return console.log(err)
        } 
        console.log(comment)
    })

    Comment.create({
        postId:'1',
        username:'stu100',
        content:'You too!!'
    }, (err,comment)=>{
        if(err){
            return console.log(err)
        } 
        console.log(comment)
    })

    Chatroom.create({
        rmId:'1',
        firstUserId:'100',
        secUserId:'101'
    }, (err,chatroom)=>{
        if(err){
            return console.log(err)
        } 
        console.log(chatroom)
    })

    Message.create({
        messageId:'1',
        rmId:'1',
        userId:'101',
        message:'Hello'
    }, (err,message)=>{
        if(err){
            return console.log(err)
        } 
        console.log(message)
    })



})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
});







