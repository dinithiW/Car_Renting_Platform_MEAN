'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for user object.
 */
let UserSchema = new Schema({
    /**
     * Title of the user.
     */
    Name: {
        type: String,
        required: "Name is required"
    },
    Email: {
        type: String,
        required: "Email is required"
    },
    Password: {
        type: String,
        required: "Password is required"
    },
    Address: {
        type: String,
        required: "Address is required"
    },
    City: {
        type: String,
        required: "City is required"
    },
    ProfilePicPath: {
        type: String
    },
    Alerts: {
        type: Number,
        Default: 0
    },
    Ratings: [{
        rating: Number
    }],
    /**
     * Created date.
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

module.exports = mongoose.model('users', UserSchema);
