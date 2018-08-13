const express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/';
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var UserSession = require('./models/UserSession');
var session =require('express-session');
var validator = require('validator');
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

    if (!validator.isEmail(email)) {
        return res.send({
            success: false,
            message:'Email is invalid'
        });
    }
    if(password==""){
        return res.send({
            success: false,
            message:'Password cannot be empty'
        });
    }
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
                message:'Invalid Login Details!'
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
            //console.log(users._id);

            return res.send({
                success: true,
                message:'Valid Sign! Please Refresh The Page',
                token: doc._id,
                user:users._id,
                role:users.role
            });
        })


    })
});

app.get('/getUserDetails',function (req,res,next) {
    const token = req.query['token'];

    User.find({
        _id: ObjectId(token),

    },(err,result)=>{
        if(err){
            return res.send({
                success: false,
                message:'Error : server error'
            });
        }
        if(!result){
            return res.send({
                success: false,
                message:'Error : Invalid token'
            });
        }
        return res.send({
            success: true,
            message:'Success login!',
            result:result
        });
    })

})

app.post('/register',function (req,res,next) {

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    if (firstname==""){
        return res.send({
            success: false,
            message:'Firstname cannot be empty'
        });
    }
    if (lastname==""){
        return res.send({
            success: false,
            message:'Lastname cannot be empty'
        });
    }

    if (!validator.isEmail(email)) {
        return res.send({
            success: false,
            message:'Email is invalid!'
        });
    }

    if (password==""){
        return res.send({
            success: false,
            message:'Password cannot be empty'
        });
    }
    
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
                message:'User Registered Successfully'
            });
    })




    })

});

app.post('/insertdata',function (req,res,next) {
    //console.log(req.body.data.date);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("labreserve");
        var myobj = { date: new Date(req.body.data.date), time: req.body.data.time,name: req.body.data.name,user:ObjectId(req.body.data.user)};
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
    //console.log(date+"22"+lab)
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

app.post('/makeadmin',function (req,res,next) {
    var email = req.body.user;
    //console.log(email)
    User.find({
        email:email
    },(err,user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error : server error'
            });

        } else if(user.length==0){
            return res.send({
                success: false,
                message: 'User Account Not Exist!'
            });
        }
        else if (user.length > 0) {

            User.findOneAndUpdate({
                email: email

            },{
                $set: {role:"admin"}
            },null,(err,session)=>{
                if(err){
                    return res.send({
                        success: false,
                        message:'Error : server error'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Succesfully Make An Admin!'
                });
            })

        }
    });

})

app.get('/getLatestReservations',function (req,res,next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("labreserve");
        dbo.collection("reservation").find({}).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            db.close();
            return res.send({
                success: true,
                message: 'Succesfully Fetch!',
                result:result
            });

        });
    });
});

app.get('/getLatestReservationsAdmin',function (req,res,next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("labreserve");
        dbo.collection('reservation').aggregate([
            { $lookup:
                    {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userdetails'
                    }
            }
        ]).toArray(function(err, result) {
            if (err) throw err;
            var data = JSON.stringify(result);
            db.close();
            return res.send({
                success: true,
                message: 'Succesfully Fetch!',
                result:result
            });
        });
    });
});

app.post('/getLatestReservationsAdminFromTo',function (req,res,next) {
    const datefrom = req.body.datefrom;
    const dateto = req.body.dateto;
    const labname = req.body.labname;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("labreserve");
        dbo.collection('reservation').aggregate([
            {
             $match:
                 {
                     'date':{
                         $gte: new Date(datefrom),
                         $lt: new Date(dateto)
                     }

                 }
            },
            { $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userdetails'
                }
            }
        ]).toArray(function(err, result) {
            if (err) throw err;
            var data = JSON.stringify(result);
            db.close();
            return res.send({
                success: true,
                message: 'Succesfully Fetch!',
                result:result
            });
        });
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);