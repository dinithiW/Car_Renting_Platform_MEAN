/**
 * Service for Booking operations.
 */

'use strict';
const mongoose = require('mongoose');
const Booking = mongoose.model('booking');

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
 * Returns an array of Booking object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.search = function(params, callback) {
  const resultCallback = function(err, bookings) {
    throwError(err);
    callback(bookings);
  };
    // console.log("Inside service : " );
  console.log(params);
  const query = Object.keys(params).map(
      (key) => key + '=' + params[key]).join('&');
  // console.log(query);
  // console.log(query.includes("startTime") + " " + query.includes("endTime"));
  if (query.includes('startTime') && query.includes('endTime')) {
    console.log(params.startTime);
    Booking.find(
        {'$or': [{'booking_startTime':
        {'$gte': params.startTime, '$lt': params.endTime}},
        {'booking_endTime': {'$gt': params.startTime, '$lt': params.endTime}}]},
        resultCallback);
  } else {
    Booking.find(params, resultCallback);
  }
};


/**
 * Saves and returns the new Booking object.
 *
 * @param {Object} user {Booking object}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function(booking, callback) {
  const newBooking = new Booking(booking);
  const resultCallback = function(err, booking) {
    throwError(err);
    callback(booking);
  };
  newBooking.save(resultCallback);
};


exports.findById = function(id, callback) {
  const resultCallback = function(err, booking) {
    throwError(err);
    callback(booking);
  };
  Booking.findById(id, resultCallback);
};


exports.findByDate = function(startDate, endDate, callback) {
  const resultCallback = function(err, bookings) {
    throwError(err);
    callback(bookings);
  };
  Booking.find({booking_startDate: {$gte: startDate, $lt: endDate}},
      resultCallback);
};

exports.update = function(booking, callback) {
  console.log("I'm in boooking weeeeeeeee")
  console.log(booking)
  const resultCallback = function(err, booking) {
    throwError(err);
    callback(booking);
  };
  booking.modified_date = new Date();
  Booking.findOneAndUpdate({
    _id: booking._id,
  }, booking, {
    new: true,
  }, resultCallback);
};

exports.update2 = function(booking, callback) {
  console.log("I'm in boooking weeeeeeeeetamin")
  console.log(booking)
  console.log(booking.booking_endTime)
  console.log(booking.booking_price)
  const resultCallback = function(err, booking) {
    throwError(err);
    callback(booking);
  };
  booking.modified_date = new Date();
  Booking.findByIdAndUpdate(booking._id,{
    carId: booking.carId,
    booking_price: booking.booking_price,

     booking_startTime: booking.booking_startTime,
     booking_endTime: booking.booking_endTime
  }, (err,bookings)=>{
    console.log("aneeeeeeeeeeeeeeeeeeeee")
    if(err) console.log("there is an errorrrrrrrr")//resultCallback.send(500).json(err)
    else resultCallback(err,booking)
    console.log(err)
  });
};
