const http = require('http');

let {returnResources} = require('./src/returnResources.js');

//If PORT property does not exist in env, assign PORT 4001
const PORT = process.env.PORT || 4001;

let server = http.createServer(returnResources);

server.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
});