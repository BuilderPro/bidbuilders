//definititions and requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passport = require('./providers/sessionProvider');
var userProvider = require('./providers/userProvider');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bson = require('bson');
var app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public/app"));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'real bidbuilders', 
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Controllers 

//Models
var User = require('./models/User.js')

// Authorization Middleware
// var requireAuth = function(req, res, next) {
//     if (!req.isAuthenticated()) {
//         return res.status(403).send({message: "Logged In"  }).end();
//     }
//     return next();
// }

app.post('/signup', function(req, res, next) {
	userProvider.createUser(User(req.body))
	.then(function(createdUser) {
		res.json(createdUser.toJson())
	})
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

//Set Server
var port = process.env.EXPRESS_PORT || 8080; 
app.listen(port, function(){
    console.log("bidbuilder running on ", port); 
});
