// const http = require('http');
const express = require('express');
let {returnResources} = require('./public/js/returnResources.js');

let app = new express();

// let {returnResources} = require('./src/returnResources.js');

//If PORT property does not exist in env, assign PORT 4001
const PORT = process.env.PORT || 4001;

// let server = http.createServer(returnResources); //NODE'S FUNCTION
app.use(express.static('public'));

// app.get('/', returnResources);

app.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
});