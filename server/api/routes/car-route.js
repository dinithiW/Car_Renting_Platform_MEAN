/**
 * Car endpoint route definitions.
 */

'use strict';
module.exports = function(app) {
  const carController = require('../controllers/car-controller');
  // Car Routes for search and create.
  app.route('/cars')
      .get(carController.list)
      .post(carController.post);

  app.route('/paymentcode').post(carController.sendSMS);
  app.route('/cars/:carId')
      .put(carController.put)
      .get(carController.find)
      .delete(carController.delete);
  app.route('/allCars')
      .get(carController.findAll);
  app.route('/allCars/:carId')
      .delete(carController.delete);
};
