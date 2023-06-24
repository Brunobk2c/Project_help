const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
require('dotenv').config();


const passportOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_ID,
  callbackURL: "http://localhost:8080/auth/github/callback"
};

// Serialization and Deserialization functions (required for persistent sessions)
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
  
passport.use(new GitHubStrategy(passportOptions, function (accessToken, refreshToken, profile, done) {
   
    profile.token = accessToken;
    return done(null, profile);
}));

module.exports = passport;