const sms = require('../helpers/sms');

/**
 * Controller for sticky endpoints.
 */

'use strict';

//import sticky service.
const userService = require('../services/user-service');
/**
 * Returns a list of stickies in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    let callback = function (users) {
        response.status(200);
        response.json(users);
        //console.log(users);
    };
        
    userService.search(request.query, callback);
};     
/**
 * 
 * @param {req} {HTTP request object}
 * @param {res} {HTTP response object}
 */ 
exports.sendSMS = (req, res) => {
    // const code = req.body.code
    //   const number = req.body.phone
        sms.sendSMS("Your verification code is ")
  
  }
/**
 * Creates a new sticky with the request JSON and
 * returns sticky JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    console.log("In body");
    console.log(request.body);
    let newUser = Object.assign({}, request.body),
        callback = function (user) {
        response.status(200);
        response.json(user);
    };
    userService.save(newUser, callback);
};

/**
 * Updates and returns a sticky object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    let user = Object.assign({}, request.body),
        callback = function (user) {
        response.status(200);
        response.json(user);
    };
    user._id = request.params.userId;
    console.log(user);
    userService.update(user, callback);
};


exports.find = function (request, response) {
    let callback = function (user) {
        response.status(200);
        response.json(user);
    };
    let id = request.params.userId;
    userService.findById(id, callback);
};

/**
 * Returns a sticky object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.findByEmail = function (request, response) {
    let callback = function (user) {
        response.status(200);
        response.json(user);
    };
    userService.findByEmail(request.params.emailId, callback);
};
