'use strict';




module.exports = function (app) {
    const fileController = require('../controllers/file-controller');
    // File Routes for search and create.
    app.route('/fileUpload')
        .post(fileController.upload);

};

