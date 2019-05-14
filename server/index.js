let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    multer  = require('multer');
  
const crypto = require('crypto');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/car_rental',{useNewUrlParser:true},(err)=>{
    if(!err) console.log("Connection succeeded!");
    else console.log("Connection not successful!");
})
// mongoose.connect('mongodb://admin:admin123@ds137040.mlab.com:37040/car_rental',{useNewUrlParser:true},(err)=>{
//     if(!err) console.log("Connection succeeded!");
//     else console.log("Connection not successful!");
// })
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});




//Initialize app
let initApp = require('./api/app');
initApp(app);

app.listen(port);
console.log('Server started on: ' + port);

module.exports = mongoose;