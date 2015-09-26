var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userProvider = require('./userProvider')

//local login
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (email, password, done) => {
    userProvider.
      authenticate(email, password).
      then((user) => {
        return done(null, user);
    	}, (errorMessage) => {
    		return done(null, false, { message:errorMessage })
    	})
}));

// session deserializer
passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
  userProvider.
    findUserById(userId).
    then((user) => {
      done(null, user);
    });
});

module.exports = passport;