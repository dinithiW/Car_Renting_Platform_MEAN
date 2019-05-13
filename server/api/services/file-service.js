/**
 * Service for file operations.
 */

'use strict';
let multer = require('multer'),
    path = require('path');
    const mkdirp = require('mkdirp');


let uploadedPath = '';
let imgPath  = '';

/**
 * Throws error if error object is present.
 *
 * @param {Object} error {Error object}
 */
let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

/**
 * Returns an array of file object matching the search parameters.
 *
 * @param {Object} params {Request parameters}
 * @param {function} callback {Sucess callback function}
 */
exports.save = function (req, res, callback) {
    
    let resultCallback = function (err, message) {
        throwError(err);
        callback(imgPath + uploadedPath);
    };
    console.log("In Service " );
    console.log(req.file);
    let upload = multer({
        
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                console.log(req.query);
                
                if(req.query.userId)
                     imgPath = 'assets/images/users/' + req.query.userId + '/';   
                else if(req.query.carId)
                     imgPath = 'assets/images/cars/' + req.query.carId + '/';
                else
                     imgPath = 'assets/images/' ;

                console.log("Image path is : " + imgPath);    
                const dir = __dirname + './../../../client/src/' + imgPath; 

                console.log("Directory path is : " + dir);
                mkdirp(dir, err => cb(err, dir))
                //cb(null, dir);
            },
            filename: function (req, file, cb) {

                uploadedPath =   path.basename(file.originalname,path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname); 
                
                cb(null, uploadedPath);
            }
        })
    })

    return upload.single('profPic')(req, res, resultCallback);

};