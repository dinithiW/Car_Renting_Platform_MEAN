/**
 * Controller for booking endpoints.
 */

'use strict';
require('dotenv').config();
// import booking service.
const STRIPE_KEY = process.env.STRIPE_TEST;
const bookingService = require('../services/booking-service');

const stripe = require('stripe')(STRIPE_KEY);
/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function(request, response) {
  const callback = function(bookings) {
    response.status(200);
    response.json(bookings);
  };
  bookingService.search(request.query, callback);
};

/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.pay = function(request, response) {
  stripe.customers
      .create({
        email: request.body.email,
      })
      .then((customer) => {
        return stripe.customers.createSource(customer.id, {
          source: 'tok_visa',
        });
      })
      .then((source) => {
        return stripe.charges.create({
          amount: request.body.bookingprice,
          currency: 'lkr',
          customer: source.customer,
        });
      })
      .then((charge) => {
        const newBooking = Object.assign({}, request.body);
        const charge_id = {charge_id: charge['id'], receipt_url: charge['receipt_url']};

        const newBooking1 = Object.assign(newBooking, charge_id);
        const chargeObject = Object.assign({}, charge);
        // console.log(chargeObject);
        let newObj = '';
        const callback = function(booking) {
          response.status(200);
          newObj = Object.assign(chargeObject, {booking_id: booking['_id']});
          //  console.log(newObj);
          // response.json(booking);
          response.json(newObj);
        };
        // console.log(newBooking1);
        bookingService.save(newBooking1, callback);
        response.status(200);
        // console.log(charge['id']);
        // console.log(charge['receipt_url']);
        // const newResponse = Object.assign(objId, newObj);
        // console.log(chargeObject);
        
        // New charge created on a new customer
      })
      .catch((err) => {
        console.log(err);
        // Deal with an error
      });
};
/**
 * Creates a new booking with the request JSON and
 * returns booking JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function(request, response) {
  const newBooking = Object.assign({}, request.body);
  const callback = function(booking) {
    response.status(200);
    response.json(booking);
  };
  bookingService.save(newBooking, callback);
};

exports.find = function(request, response) {
  const callback = function(booking) {
    response.status(200);
    response.json(booking);
  };
  const id = request.params.bookingId;
  bookingService.findById(id, callback);
};

exports.update = function(request, response) {
  console.log(request.body);
  const booking = Object.assign({}, request.body);
  const callback = function(booking) {
    response.status(200);
    response.json(booking);
  };
  booking._id = request.params.bookingId;
  console.log(booking);
  bookingService.update(booking, callback);
};
