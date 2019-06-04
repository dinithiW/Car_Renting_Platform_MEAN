/**
 * Service for Car operations.
 */

'use strict';
const mongoose = require('mongoose');
const Car = mongoose.model('cars');
Car.watch().
    on('change', (data) => console.log(data));
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
 * Returns an array of Car object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function(params, callback) {
  const resultCallback = function(err, cars) {
    throwError(err);
    callback(cars);
  };
  Car.find(params, resultCallback);
};

/**
 * Saves and returns the new sticky object.
 *
 * @param {Object} car {Car object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function(car, callback) {
  const newCar = new Car(car);
  const resultCallback = function(err, car) {
    throwError(err);
    callback(car);
  };
  newCar.save(resultCallback);
};

/**
 * Updates and returns the Car object.
 *
 * @param {Object} car {Car object}
 * @param {function} callback {Sucess callback function}
 */
exports.update = function(car, callback) {
  const resultCallback = function(err, car) {
    throwError(err);
    callback(car);
  };
  car.modified_date = new Date();
  Car.findOneAndUpdate({
    _id: car._id,
  }, car, {
    new: true,
  }, resultCallback);
};

exports.find = function(id, callback) {
  const resultCallback = function(err, car) {
    throwError(err);
    callback(car);
  };
  Car.findById(id, resultCallback);
};

exports.findAll = function(callback) {
  const resultCallback = function(err, cars) {
    throwError(err);
    callback(cars);
  };
  Car.find(resultCallback);
};

exports.delete = function(id, callback) {
  const resultCallback = function(err, car) {
    throwError(err);
    callback(car);
  };
  Car.findByIdAndDelete(id, resultCallback);
};
