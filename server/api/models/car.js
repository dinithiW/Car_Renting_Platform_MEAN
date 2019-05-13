'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for car object.
 */
let CarSchema = new Schema({
    /**
     * Title of the car.
     */
    carName: {
        type: String,
        required: "Name is required"
    },
    carYear:{
        type :String,
        required : "Year is required"
    },
    carImagePath: {
        type: String,
        required: "ImagePath is required"
    },
    carTrips: {
        type: Number,
        required: "Trips is required",
        default : 0
    },
    carPrice: {
        type: Number,
        required: "Price is required"
    },
    description: {
        type: String,
        required: "Description is required"
    },
    features: {
        type: String,
        required: "features is required"
    },
    
    dailyDistance: {
        type: Number,
        required: "dailyDistance is required"
    },
    /*userId: {
        type: String,
        required: "userId is required"
    },*/
    fuelType: {
        type: String,
        required: "fuelType is required"
    },
    doorCount: {
        type: Number,
        required: "doorCount is required"
    },
    seatCount: {
        type: Number,
        required: "seatCount is required"
    },
    address:{
        type: String,
        required: "address is required"
    },
    city:{
        type: String,
        required: "city is required"
    },
    state:{
        type : String,
        required : "state is required"
    },
    zip : {
        type : Number,
        required : "zip is required"
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

module.exports = mongoose.model('cars', CarSchema);
