'use strict';
//import file service.
const fileService = require('../services/file-service');
/**
 * Returns a list of file in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.upload = function (request, response) {
    let callback = function (message) {
        response.status(200);
        response.json(message);
    };
    console.log(request.files);
    console.log("Incontroller : " + request.query.userId);
    console.log('Params ' + request.params);
    fileService.save(request, response, callback);
};