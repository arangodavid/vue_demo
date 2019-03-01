'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const bodyParser = require('body-parser');

//creates an express instance
var webApp = (0, _express2.default)();

//Declaring a port
//Imports express
var port = 3000;

//Setting up a middleware, needed to access the request body
webApp.use(_express2.default.json());
// webApp.use(
// 	bodyParser.urlencoded({
// 		extended: true
// 	})
// );


//Sample endpoint to test the server
webApp.get('/', function (request, response) {
	response.json({ info: 'Node.js, Express, and Postgres API' });
});

webApp.listen(port, function () {
	console.log('App running on port: ' + port);
});