var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Account = require('../schema/account.js');

function comparePassword(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

function findAll(cb) {
  Account.find({}, cb);
}

function findOne(username, cb) {
  Account.findOne({username: username}, cb);
}

function insertOne(user, cb) {
  bcrypt.hash(user.password, null, null, function(a,b,c) {
    // console.log('a: ', a ,'b: ', b, 'c: ', c); // this just changes the password at insertion
    user.password = b;
    Account.create(user, cb);
  });
};

// takes a username and a movie, user: String, movie: Object
// puts the movie into user.watched
function insertMovieIntoWatched(user, movie) {

  findOne(user, function (err, account) {
    if (err) throw err;
    console.log('this user is', user)
    account.movies.unshift(movie);
    account.save();
    // console.log(account.watched);
    // console.log('adding movie: ', movie)
    // console.log('to Watched for account: ', account);
    // console.log('for user: ', username);
  });
};

function insertTvIntoWatched(user, tvShow) {

  findOne(user, function(err, account) {
    if (err) throw err;
    console.log('this user is', user)
    account.tvShows.unshift(tvShow);
    account.save();
  });
};

function removeMovieFromWatched(user, imdb_id) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.movies.length; i++) {
      if (account.movies[i].imdb_id === imdb_id) {
          account.movies.splice(i, 1);
          console.log('matched')
        break;
      }
    }
    account.save();
  });
};

function removeTvFromWatched(user, imdb_id) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.tvShows.length; i++) {
      if (account.tvShows[i].imdb_id === imdb_id) {
          account.tvShows.splice(i, 1);
          console.log('matched')
        break;
      }
    }
    account.save();
  });
};

function toggleMovieFavorite(user, movie) {

  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.movies.length; i++) {
      console.log('MOVIE IS', movie, 'account.movies[i]', account.movies[i]);
      if (account.movies[i].imdb_id === movie.imdb_id) {
        account.movies[i].isFavorite = !account.movies[i].isFavorite;
        account.movies.unshift({});
        account.movies.shift({});
        break
      }
    }
    // console.log('ARRE we getting HWEW???', account.watched)
    account.save();
    // console.log('ARRE we getting HWEW AFTER SAVE???', account.watched)
  });
};

function toggleTvFavorite(user, tvShow) {

  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.tvShows.length; i++) {
      console.log('MOVIE IS', movie, 'account.tvShows[i]', account.tvShows[i]);
      if (account.tvShows[i].imdb_id === movie.imdb_id) {
        account.tvShows[i].isFavorite = !account.tvShows[i].isFavorite;
        account.tvShows.unshift({});
        account.tvShows.shift({});
        break
      }
    }
    // console.log('ARRE we getting HWEW???', account.watched)
    account.save();
    // console.log('ARRE we getting HWEW AFTER SAVE???', account.watched)
  });
};

// function removeMovieFromFaves(user, imdb_id) {
//   findOne(user, function (err, account) {
//     if (err) throw err;
//     for (var i = 0; i < account.favorites.length; i++) {
//       if (account.favorites[i].imdb_id === imdb_id) {
//           account.favorites.splice(i, 1);
//         break;
//       }
//     }
//     account.save();
//   });
// };

function addCommentToWatchedMovie(user, imdb_id, comment) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.movies.length; i++) {
      if (account.movies[i].imdb_id === imdb_id) {
        account.movies[i].comment = comment;
        account.movies.unshift({});
        account.movies.shift({});
        break
      }
    }
    account.save();
  });
};

function addCommentToWatchedTv(user, imdb_id, comment) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.tvShows.length; i++) {
      if (account.tvShows[i].imdb_id === imdb_id) {
        account.tvShows[i].comment = comment;
        account.tvShows.unshift({});
        account.tvShows.shift({});
        break
      }
    }
    account.save();
  });
}

function addRatingToWatchedMovie(user, imdb_id, rating) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.movies.length; i++) {
      if (account.movies[i].imdb_id === imdb_id) {
        account.movies[i].rating = rating;
        account.movies.unshift({});
        account.movies.shift({});
        break
      }
    }
    // console.log('ARRE we getting HWEW???', account.watched)
    account.save();
    // console.log('ARRE we getting HWEW AFTER SAVE???', account.watched)
  })
}

function addRatingToWatchedTv(user, imdb_id, rating) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.tvShows.length; i++) {
      if (account.tvShows[i].imdb_id === imdb_id) {
        account.tvShows[i].rating = rating;
        account.tvShows.unshift({});
        account.tvShows.shift({});
        break
      }
    }
    // console.log('ARRE we getting HWEW???', account.watched)
    account.save();
    // console.log('ARRE we getting HWEW AFTER SAVE???', account.watched)
  })
}


exports.comparePassword = comparePassword;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.insertMovieIntoWatched = insertMovieIntoWatched;
exports.insertTvIntoWatched = insertTvIntoWatched;
exports.addCommentToWatchedMovie = addCommentToWatchedMovie;
exports.addCommentToWatchedTv = addCommentToWatchedTv
exports.addRatingToWatchedMovie = addRatingToWatchedMovie;
exports.addRatingToWatchedTv = addRatingToWatchedTv;
exports.removeMovieFromWatched = removeMovieFromWatched;
exports.removeTvFromWatched = removeTvFromWatched;
exports.toggleMovieFavorite = toggleMovieFavorite;
exports.toggleTvFavorite = toggleTvFavorite;
// exports.removeMovieFromFaves = removeMovieFromFaves;
