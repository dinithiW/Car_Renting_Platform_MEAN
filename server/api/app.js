'use strict';
module.exports = function (app) {
    //Initialize models
    let carModel = require('./models/car');
    let userModel = require('./models/user');
    let bookingModel = require('./models/booking');

    //Initialize routes
    let carRoutes = require('./routes/car-route');
    carRoutes(app);
    let userRoutes = require('./routes/user-route');
    userRoutes(app);
    let uploadRoutes = require('./routes/file-route');
    uploadRoutes(app);
    let bookingRoutes = require('./routes/booking-route');
    bookingRoutes(app);

};