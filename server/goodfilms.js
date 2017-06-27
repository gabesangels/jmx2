var express = require('express');
var app = express();
var config = require('../db/config');
var accounts = require('../db/helpers/account');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var utility = require('./utility.js');

app.use(express.static(__dirname.slice(0, __dirname.length - 6)));
app.use(bodyParser.json());
app.use(session({
  secret: 'kthxbai',
  resave: false,
  saveUninitialized: true
}));

app.get('/userCheck', function(req, res) {
  res.send(req.session);
});

app.get('/sess', function(req, res) {
  accounts.findOne(req.session.user.username, (err, user) => {
    res.send(user);
  });
});

app.get('/signin', function (req, res) {
  res.redirect('/login');
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log('username does not exist');
    } else {
      accounts.comparePassword(password, user.password, function(err, match) {
        if (match) {
          //create session
          utility.createSession(req, res, user);
          console.log('Everything works /signin');
        } else {
          console.log('A user was found, but the password did not match. /signin');
          // res.redirect('/login');
        }
      });
    }
  })
});

app.get('/signup', function (req, res) {
  res.redirect('/user');
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var age = req.body.age;
  var gender = req.body.gender;

  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log('Username already exists!');
      // res.redirect('/signup');
    } else {
      accounts.insertOne({username: username, password: password, age: age, gender: gender}, (err, user) => {
        if (err) throw err;
        console.log('Account created.');
        res.redirect('/user');
      });
    }
  });
});

app.post('/addMovie', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id;

  accounts.insertMovieIntoWatched(user, {imdb_id: imdb_id, rating:'?', comment: 'N/A'});
  res.sendStatus(200);

});

app.post('/addFavorite', function(req, res) {
  var user = req.body.user;
  var movie = req.body.movie;

  accounts.toggleMovieFavorite(user, movie);
  res.sendStatus(200);
});

app.post('/addComment', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id
  var comment = req.body.comment;

  accounts.addCommentToWatchedMovie(user, imdb_id, comment);
  res.sendStatus(200);
});

app.post('/removeFromWatched', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id;

  accounts.removeMovieFromWatched(user, imdb_id);
  res.sendStatus(200);
});

app.post('/editRating', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id;
  var rating = req.body.rating;

  accounts.addRatingToWatchedMovie(user, imdb_id, rating);
  res.sendStatus(200);
});

app.use('/*', function(req, res) {
  res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html');
});

module.exports = app;
