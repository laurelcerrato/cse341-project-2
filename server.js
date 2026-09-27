//https://project2-laurel.onrender.com/artists
const dns = require("dns");
dns.setServers(["8.8.8.8"]);
const express = require('express');
const bodyParse = require('body-parser');
const mongodb = require('./data/database.js');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParse.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X requested-with, Content-type, Access, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();

  
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
.use(cors({origin: '*'}))
.use('/', require('./routes'));

passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user != undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out') });
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});