const express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/';
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var UserSession = require('./models/UserSession');
var session =require('express-session')

var db = mongoose.connect('mongodb://localhost:27017/labreserve',function (err,respond) {
    if(err) console.log("there is error in connecting with mongodb");
    console.log('connect to the database')
})
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret:"lksdjlaskjdsdaldasjdaln",resave:false,saveUninitialized:true}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/logout',function (req,res,next) {
    const token = req.query['token'];
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    },{
        $set: {isDeleted:true}
    },null,(err,session)=>{
        if(err){
            return res.send({
                success: false,
                message:'Error : server error'
            });
        }

        return res.send({
            success: true,
            message:'Success logout!'
        });
    })
})

app.get('/checkLogin',function (req,res,next) {
    const token = req.query['token'];

    UserSession.find({
        _id: token,
        isDeleted: false
    },(err,session)=>{
        if(err){
            return res.send({
                success: false,
                message:'Error : server error'
            });
        }
        if(session.length!=1){
            return res.send({
                success: false,
                message:'Error : Not loggedIn'
            });
        }
        return res.send({
            success: true,
            message:'Success login!'
        });
    })
});

app.post('/login',function (req,res,next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email,password:password},function (err,users) {
        if (err){
            console.log(err);
            return res.send({
                success: false,
                message:'Error : server error'
            });

        }
        if(!users){
            return res.send({
                success: false,
                message:'Invalid!'
            });

        }



        var userSession = new UserSession();

        userSession.userID = users._id;

        userSession.save((err,doc)=>{
            if(err){
                return res.send({
                    success: false,
                    message:'Server error!'
                });
            }
            return res.send({
                success: true,
                message:'Valid signin!',
                token: doc._id
            });
        })


    })
});

app.post('/register',function (req,res,next) {
    console.log(req.body)
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    User.find({
        email:email
    },(err,previousUser) => {
        if (err){
            return res.send({
                success: false,
                message:'Error : server error'
            });
        }else if(previousUser.length > 0){
            return res.send({
                success: false,
                message:'Account already exist'
            });
        }
        var user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;

        user.save((err,result)=>{
            if(err){
                console.log('There is an errror in addind user');
                return res.send({
                    success: false,
                    message:'Error : server error'
                });
            }
            return res.send({
                success: true,
                message:'Registered'
            });
    })




    })

});

app.post('/insertdata',function (req,res,next) {
    //console.log(req.body.data.date);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("labreserve");
        var myobj = { date: new Date(req.body.data.date), time: req.body.data.time,name: req.body.data.name};
        dbo.collection("reservation").insertOne(myobj, function(err, res) {
            if (err) throw err;
            //console.log("1 document inserted");
            db.close();
        });
    });
    //res.json("pasindu")
});

app.post('/checkAvalable',function (req,res,next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("labreserve");
        dbo.collection("reservation").findOne({date:new Date(req.body.data.date),time: req.body.data.time,name: req.body.data.name}, function(err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
            res.json(result)
        });
    });
});

app.get('/getResDetails',function (req,res,next) {
    const date= req.query['date'];
    const lab = req.query['lab'];
    console.log(date+"22"+lab)
    if(lab != "ALL"){
        const myobj ={id: lab};
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("labreserve");
            dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"08.00-09.00"}, function(err, result) {
                if (err) throw err;
                //console.log(result);
                if(result != null){
                    myobj['on1']= 'RESERVE';
                }else {
                    myobj['on1']= 'FREE';
                }
                dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"09.00-10.00"}, function(err, result) {
                    if (err) throw err;
                    //console.log(result);
                    if(result != null){
                        myobj['on2']= 'RESERVE';
                    }else {
                        myobj['on2']= 'FREE';
                    }

                    dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"10.00-11.00"}, function(err, result) {
                        if (err) throw err;
                        //console.log(result);
                        if(result != null){
                            myobj['on3']= 'RESERVE';
                        }else {
                            myobj['on3']= 'FREE';
                        }

                        dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"11.00-12.00"}, function(err, result) {
                            if (err) throw err;
                            //console.log(result);
                            if(result != null){
                                myobj['on4']= 'RESERVE';
                            }else {
                                myobj['on4']= 'FREE';
                            }

                            dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"13.00-14.00"}, function(err, result) {
                                if (err) throw err;
                                //console.log(result);
                                if(result != null){
                                    myobj['on5']= 'RESERVE';
                                }else {
                                    myobj['on5']= 'FREE';
                                }

                                dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"14.00-15.00"}, function(err, result) {
                                    if (err) throw err;
                                    //console.log(result);
                                    if(result != null){
                                        myobj['on6']= 'RESERVE';
                                    }else {
                                        myobj['on6']= 'FREE';
                                    }


                                    dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"15.00-16.00"}, function(err, result) {
                                        if (err) throw err;
                                        //console.log(result);
                                        if(result != null){
                                            myobj['on7']= 'RESERVE';
                                        }else {
                                            myobj['on7']= 'FREE';
                                        }

                                        dbo.collection("reservation").findOne({date:new Date(date),name:lab,time:"16.00-17.00"}, function(err, result) {
                                            if (err) throw err;
                                            //console.log(result);
                                            if(result != null){
                                                myobj['on8']= 'RESERVE';
                                            }else {
                                                myobj['on8']= 'FREE';
                                            }

                                            db.close();
                                            res.json(myobj)

                                        });

                                    });
                                });

                            });

                        });

                    });

                });


            });

        });



    }
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);