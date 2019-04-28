'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for car object.
 */
let BookingSchema = new Schema({
    /**
     * Title of the car.
     */
    userId: {
        type: String,
        required: "Name is required"
    },
    carId: {
        type: String,
        required: "Year is required"
    },
    booking_startTime: {
        type: Date,
        required: 'start time is required'
    },
    booking_endTime: {
        type: Date,
        required: 'end time is required'       
    },
    booking_price: {
        type: Number,
        required: 'Price is required'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isRated: {
        type: Boolean,
        default: false
    },
    ownerRating: {
        type: Number,
        default: 0
    },
    userRating: {
        type: Number,
        default: 0
    },
    /**
     * car created date.
     */
    created_date: {
        type: Date,
        default: Date.now
    },
    /**
     * Last modified date.
     */
    modified_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('booking', BookingSchema);
