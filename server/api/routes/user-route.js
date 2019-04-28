/**
 * User endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
    const userController = require('../controllers/user-controller');
    // Sticky User for search and create.
    app.route('/users')
        .get(userController.list)
        .post(userController.post);
    
    app.route('/users/:userId')
        .get(userController.find)
        .put(userController.put)

    
    app.route('/users/email/:emailId')
        .get(userController.findByEmail)
        
};        