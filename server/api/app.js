'use strict';
module.exports = function(app) {
  // Initialize models
  const carModel = require('./models/car');
  const userModel = require('./models/user');
  const bookingModel = require('./models/booking');

  // Initialize routes
  const carRoutes = require('./routes/car-route');
  carRoutes(app);
  const userRoutes = require('./routes/user-route');
  userRoutes(app);
  const uploadRoutes = require('./routes/file-route');
  uploadRoutes(app);
  const bookingRoutes = require('./routes/booking-route');
  bookingRoutes(app);
};
