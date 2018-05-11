// "Hello world" server

//REQUIRE statements
var http = require('http');
var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./public');

http.createServer(function (request, response) {
  request.addListener('end', function () {
      //
      // Serve files!
      //
      file.serve(request, response);
  }).resume();
}).listen(8080);

// like a callback
function handler (request, response) {
  var url = request.url;
  url = url.replace("/","");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello!</h1>");
  response.write("<p>You asked for <code>" + url + "</code></p>");
  response.end();
}


var server = http.createServer(handler);

server.listen('50232');//my port number
