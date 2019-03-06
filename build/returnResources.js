"use strict";

var fs = require('fs');

module.exports = {
  returnResources: function returnResources(request, response) {
    fs.readFile('./index.html', 'utf-8', function (err, data) {
      if (err) {
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.write("".concat(err));
        console.log(request.url);
        response.end();
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.write(data);
        console.log(request.url);
        console.log(request.method);
        response.end();
      }
    });
  }
}; //HTML
// fs.readFile('./index.html', 'utf-8', (err, data) => {
// 	if(err) {
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write(`${err}`);
// 		console.log(request.url);
// 		response.end();
// 	}else {
// 		response.writeHead(200, {'Content-Type': 'text/html'});
// 		response.write(data);
// 		console.log(request.url);
// 		console.log(request.method);
// 		response.end();
// 	}
// });
//CSS
// fs.readFile('./style.css', 'utf-8', (err, data) => {
// 			if(err) {
// 				response.writeHead(200, {'Content-Type': 'text/css'});
// 				response.write(`${err}`);
// 				console.log(request.url);
// 				response.end();
// 			}else {
// 				response.writeHead(200, {'Content-Type': 'text/css'});
// 				response.write(data);
// 				console.log(request.url);
// 				console.log(request.method);
// 				response.end();
// 			}
// 		});
//JS
// fs.readFile('./src/sock-product.js', 'utf-8', (err, data) => {
// 	if(err) {
// 		response.writeHead(200, {'Content-Type': 'text/javascript'});
// 		response.write(`${err}`);
// 		console.log(request.url);
// 		response.end();
// 	}else {
// 		response.writeHead(200, {'Content-Type': 'text/javascript'});
// 		response.write(data);
// 		console.log(request.url);
// 		console.log(request.method);
// 		response.end();
// 	}
// });