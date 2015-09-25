//definititions and requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bson = require('bson');
var app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(session({
    secret: 'wolverinePack', 
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Controllers 
var QueueCtrl = require('./controllers/QueueCtrl');
var UserCtrl = require('./controllers/UserCtrl');
var LocationCtrl = require('./controllers/LocationCtrl');
var StatsCtrl = require('./controllers/StatsCtrl'); 

//Models
var User = require('./models/User');
var Location = require('./models/Location');
var Customer = require('./models/Customer');

//Database
var mongoUri = "mongodb://localhost:27017/fashionphile";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log("Connected to db at " + mongoUri);
});

//port
var port = 8080; 
app.listen(process.env.EXPRESS_PORT || port, function(){
    console.log("The Wolverine Pack is hunting on port ", port); 
});

//static 
app.use(express.static(__dirname+'/public'));

//local login
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    console.log(username, password)
    User.findOne({ email: username }).exec().then(function(user) {
        if (!user) {
            return done(null, false);
            console.log('no user');
        }
        user.comparePassword(password).then(function(isMatch) {
            if (!isMatch) {
                console.log('no match');
                return done(null, false);
            }
            return done(null, user);
        });
    });
}));

//authorization check
var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send({message: "Logged In"   }).end();
    }
    return next();
}

//deserializer
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* Endpoints 
**********************************************************************/
//Auth
app.post('/api/users/', UserCtrl.createUser);
app.post('/api/users/auth', passport.authenticate('local'), function(req, res) {
    console.log("Logged In"); 
    return res.status(200).end();
});

app.get('/api/location', requireAuth, LocationCtrl.list);
app.get('/api/store/:id', requireAuth, LocationCtrl.listOne);
app.get('/api/name/:name', requireAuth, LocationCtrl.listName);
app.post('/api/location', requireAuth, LocationCtrl.create);
app.delete('/api/location/:id', requireAuth, LocationCtrl.delete);
app.put('/api/location/:id', requireAuth, LocationCtrl.update);

app.get('/api/employee/:id', QueueCtrl.getByLocation)

app.post('/api/customer/', QueueCtrl.add);
app.put('/api/customer/:id', QueueCtrl.helpCustomer); 

app.get('/api/stats', StatsCtrl.getStats); 


