/**
 * Service for user operations.
 */

'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('users');

/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
const throwError = function(error) {
  if (error) {
    throw Error(error);
  }
};

/**
 * Returns an array of user object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function(params, callback) {
  const resultCallback = function(err, users) {
    throwError(err);
    callback(users);
  };
    // console.log(params);
  User.find(params, resultCallback);
};


/**
 * Saves and returns the new user object.
 *
 * @param {Object} user {User object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function(user, callback) {
  const newUser = new User(user);
  const resultCallback = function(err, user) {
    throwError(err);
    callback(user);
  };
  newUser.save(resultCallback);
};

/**
 * Updates and returns the user object.
 *
 * @param {Object} user {User object}
 * @param {function} callback {Sucess callback function}
 */
exports.update = function(user, callback) {
  const resultCallback = function(err, user) {
    throwError(err);
    callback(user);
  };
  user.modified_date = new Date();
  if (user.rating) {
    User.findOneAndUpdate({
      _id: user._id,
    }, {$push: {'Ratings': {'rating': user.rating}}}, {
      new: true,
    }, resultCallback);
  } else {
    User.findOneAndUpdate({
      _id: user._id,
    }, user, {
      new: true,
    }, resultCallback);
  }
};

exports.findById = function(id, callback) {
  const resultCallback = function(err, user) {
    throwError(err);
    callback(user);
  };
  User.findById(id, resultCallback);
};


/**
 * Returns the user object matching the emailid.
 *
 * @param {string} emailId {Id of the sticky object}
 * @param {function} callback {Sucess callback function}
 */
exports.findByEmail = function(emailId, callback) {
  const resultCallback = function(err, user) {
    throwError(err);
    callback(user);
  };
  User.findOne({Email: emailId}, resultCallback );
};
