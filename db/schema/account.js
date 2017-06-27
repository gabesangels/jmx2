var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var accountSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  watched: [],
  toWatch: [Object]
});

module.exports = mongoose.model('Account', accountSchema);

accountSchema.pre('save', function(next) { // This just isn't working...
  console.log('PRE IS HAPPENING'); // it's not happening
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});


// function comparePassword(candidatePassword, savedPassword, cb) {
//   bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
//     if (err) { return cb(err); }
//     cb(null, isMatch);
//   });
// };

// function findAll(cb) { // I think this should just be find, not findOne -JO
//   // Account.findOne({}, cb);
//   Account.find({}, cb);
// }

// function findOne(username, cb) {
//   Account.findOne({username: username}, cb);
// }

// function insertOne(user, cb) {
//   bcrypt.hash(user.password, null, null, function(a,b,c) {
//     console.log('a: ', a ,'b: ', b, 'c: ', c); // this just changes the password at insertion
//     user.password = b;
//     Account.create(user, cb);
//   });
// };

// exports.comparePassword = comparePassword;
// exports.findOne = findOne;
// exports.findAll = findAll;
// exports.insertOne = insertOne;
