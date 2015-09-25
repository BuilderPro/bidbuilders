var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userProvider = require('./userProvider')

//local login
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(email, password, done) {
    console.log(email, password)
    userProvider.authenticate(email, password)
    	.then(function authenticated(user) {
    		return done(null, user);
    	}, function handleError(errorMessage) {
    		return done(null, false, { message:errorMessage })
    	})
}));

// session deserializer
passport.serializeUser(function(user, done) {
  done(null, user.userId);
});

passport.deserializeUser(function(userId, done) {
  pg.findByUserId(userId, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;