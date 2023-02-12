const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const bodyParser = require('body-parser');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => {
    console.log("MongoDB database connection established successfully");

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const useraccountRouter = require('./routes/UserAccounts');
    const adminaccountRouter = require('./routes/adminaccounts');
    const userinfoRouter = require('./routes/userinfos');
    const commentRouter = require('./routes/comments');
    const postRouter = require('./routes/posts');
    const pirvatechatRouter = require('./routes/pirvatechats');

    app.use('/useraccounts', useraccountRouter);
    app.use('/adminaccounts', adminaccountRouter);
    app.use('/userinfos', userinfoRouter);
    app.use('/comments', commentRouter);
    app.use('/posts', postRouter);
    app.use('/pirvatechats', pirvatechatRouter);

    let Adminaccount = require('./models/adminaccount.model');

    // Adminaccount.create({
    //     adminId:'1',
    //     username:'admin',
    //     password:'admin'
    // }, (err,admin)=>{
    //     if(err){
    //         return console.log(err)
    //     } 
    //     console.log(admin)
    // })

    let UserAccount = require('./models/UserAccount.model')
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,  and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
});







