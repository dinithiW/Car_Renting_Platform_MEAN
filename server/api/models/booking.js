'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for car object.
 */
const BookingSchema = new Schema({
  /**
     * Title of the car.
     */
  email: {
    type: String,
    required: 'Email is required',
  },
  userId: {
    type: String,
    required: 'Id is required',
  },
  carId: {
    type: String,
    required: 'Car is required',
  },
  startDate: {
    type: String,
    required: 'start time is required',
  },
  endDate: {
    type: String,
    required: 'end time is required',
  },
  bookingprice: {
    type: Number,
    required: 'Price is required',
  },
  charge_id: {
    type: String,
    required: 'Charge not successful',
  },
  receipt_url: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  /**
     * car created date.
     */
  created_date: {
    type: Date,
    default: Date.now,
  },
  /**
     * Last modified date.
     */
  modified_date: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('booking', BookingSchema);
