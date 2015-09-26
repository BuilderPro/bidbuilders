// DEFS AND REQS
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require("bluebird");
var cors = require('cors');
var session = require('express-session');
var passport = require('./providers/sessionProvider');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bson = require('bson');
var app = express();

// PROVIDERS
var userProvider = require('./providers/userProvider');
var projectProvider = require('./providers/projectProvider');
var bidProvider = require('./providers/bidProvider');

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'real bidbuilders', 
    resave: false,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// CONTROLLERS 

// MODELS
var User = require('./models/User.js')
var Project = require('./models/Project.js')
var Bid = require('./models/Bid.js')

// Authorization Middleware
// var requireAuth = function(req, res, next) {
//     if (!req.isAuthenticated()) {
//         return res.status(403).send({message: "Logged In"  }).end();
//     }
//     return next();
// }

// HELPERS
function serialize(model) {
	return Promise.resolve(model.toUIModel());
}

function serializeAll(models) {
	return Promise.resolve(models.map((model) => model.toUIModel()))
}


// AUTH ENDPOINTS
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/user', (req, res, next) => {
	res.json(req.user.toUIModel())
})

// USER ENDPOINTS
app.post('/signup', (req, res, next) => {
	userProvider.
		createUser(User(req.body)).
		then(serialize).
		then((user) => { res.json(user) })
});

app.post('/user/:userId', (req, res, next) => {
	var userData = req.body;
	userData.userId = req.params.userId;

	userProvider.
		saveUser(User(userData)).
		then(serialize).
		then((user) => { res.json(user) })
});

app.get('/user/:userId', (req, res, next) => {
	userProvider.
		findUserById(req.params.userId).
		then(serialize).
		then((user) => { res.json(user) })
});

app.get('/user/:userId/projects', (req, res, next) => {
	projectProvider.
		findProjectsByUserId(req.params.userId).
		then(serializeAll).
		then((projects) => { res.json(projects) })
})

app.get('/user/:userId/bids', (req, res, next) => {
	bidProvider.
		findBidsByUserId(req.params.userId).
		then(serializeAll).
		then((bids) => { res.json(bids) })
})



// PROJECT ENDPOINTS
app.post('/project', (req, res, next) => {
	projectProvider.
		createProject(Project(req.body)).
		then(serialize).
		then((project) => { res.json(project)})
});

app.post('/project/:projectId', (req, res, next) => {
	var projectData = req.body;
	projectData.projectId = req.params.projectId;

	projectProvider.
		saveProject(Project(projectData)).
		then(serialize).
		then((project) => { res.json(project)})
});

app.get('/project/:projectId', (req, res, next) => {
	projectProvider.
		findProjectById(req.params.projectId).
		then(serialize).
		then((project) => { res.json(project) })
});


app.get('/project/:parentId/subs', (req, res, next) => {
	projectProvider.
		findProjectsByParentId(req.params.parentId).
		then(serializeAll).
		then((projects) => { res.json(projects) })
});

app.get('/project/:parentId/all', (req, res, next) => {
	projectProvider.
		findAllProjectsByParentId(req.params.parentId).
		then(serializeAll).
		then((projects) => { res.json(projects) })
});

app.get('/project/:projectId/bids', (req, res, next) => {
	bidProvider.
		findBidsByProjectId(req.params.projectId).
		then(serializeAll).
		then((bids) => { req.json(bids) })
});

// BID ENDPOINTS
app.post('/bid', (req, res, next) => {
	bidProvider.
		createBid(Bid(req.body)).
		then(serialize).
		then((bid) => { res.json(bid)})
});

app.post('/bid/:bidId', (req, res, next) => {
	var bidData = req.body;
	bidData.bidId = req.params.bidId;

	bidProvider.
		saveBid(Bid(bidData)).
		then(serialize).
		then((bid) => { res.json(bid)})
});

app.get('/bid/:bidId', (req, res, next) => {
	bidProvider.
		findBidById(req.params.bidId).
		then(serialize).
		then((bid) => { res.json(bid) })
});


// START LISTENING
var port = process.env.EXPRESS_PORT || 8080; 
app.listen(port, () => { console.log("bidbuilder running on ", port) });
