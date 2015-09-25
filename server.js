//definititions and requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bson = require('bson');
var app = express();
var pg = require('pg'); //Database

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public/app"));
app.use(cookieParser());
app.use(session({
    secret: 'realwolverines', 
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Controllers 

//Models


//Database
//ADD POSTGRES CONNECTION 

//Set Server
var port = 8080; 
app.listen(process.env.EXPRESS_PORT || port, function(){
    console.log("The Wolverine Pack is hunting on port ", port); 
});

//Serve Static 
app.use(express.static(__dirname+'/public'));

// //local login
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, function(username, password, done) {
//     console.log(username, password)
//     User.findOne({ email: username }).exec().then(function(user) {
//         if (!user) {
//             return done(null, false);
//             console.log('no user');
//         }
//         user.comparePassword(password).then(function(isMatch) {
//             if (!isMatch) {
//                 console.log('no match');
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     });
// }));

// //authorization check
// var requireAuth = function(req, res, next) {
//     if (!req.isAuthenticated()) {
//         return res.status(403).send({message: "Logged In"   }).end();
//     }
//     return next();
// }

// //deserializer
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });