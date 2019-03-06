// const http = require('http');
const express = require('express'); //Imports express module
const app = new express(); //Creating a new instance of the express module
const pg = require('pg'); //Imports pg module
let format = require('pg-format'); //Imports pg-format module
let PGUSER = 'vuesace_corp'; //User/Role of DB
let PGDB = 'vuesace_sock_api'; //PostgreSQL DB

const PORT = process.env.PORT || 4001; //Get the Port

app.use(express.static('public')); //Serves static app

var config = {
	user: PGUSER,
	database: PGDB,
	max: 10,
	idleTimeoutMillis: 30000
};

let pool = new pg.Pool(config);
let myClient;

pool.connect((err, client, done) => {
	if(err) console.log(err);
	app.listen(PORT, () => {
		console.log(`Listening on Port: ${PORT}`);
	});
	myClient = client;
	let reviewQuery = format('SELECT * from vuesacereviews');
	myClient.query(reviewQuery, (err, data) => {
		if(err) {
			console.log(err);
		} 
		console.log(data);
	});
});

// let {returnResources} = require('./public/js/returnResources.js');
//If PORT property does not exist in env, assign PORT 4001
// const PORT = process.env.PORT || 4001;
// let server = http.createServer(returnResources); //NODE'S FUNCTION
// app.use(express.static('public'));

// app.listen(PORT, () => {
// 	console.log(`Listening at ${PORT}`);
// }); 




// const express = require('express')
// const app = express()
// var pg = require('pg')
// var format = require('pg-format')
// var PGUSER = 'vuesace_corp'
// var PGDATABASE = 'vuesace_sock_api'

// var config = {
//   user: PGUSER, // name of the user account
//   database: PGDATABASE, // name of the database
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
// }

// var pool = new pg.Pool(config)
// var myClient

// pool.connect(function (err, client, done) {
//   if (err) console.log(err)
//   app.listen(3000, function () {
//     console.log('listening on 3000')
//   })
//   myClient = client
//   var ageQuery = format('SELECT * from vuesacereviews')
//   myClient.query(ageQuery, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(result)
//   })
// })
