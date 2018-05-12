var http  = require('http');
var static = require('node-static');
var fs = require('fs');
var file = new static.Server('./public');
var port = 8888;

http.createServer(function(request, response){
    request.addListener('end', function(){
        file.serve(request, response, function(e, res){
            if (e && e.status === 404){
                file.serveFile('/testWHS.html', 404, {}, request, response)
            }
        })
    }).resume();
}).listen(8888, function(){
    console.log("server started on port " + port);
})

// //404 response

// function send404response(response){
//     response.writeHead(404, {"Content-Type": "text/plain"});
//     response.write("Error 404: Page Not Found");
//     response.end();
// }

// function onRequest(request, response){
//     //if statement where user is looking to access the home page
//     if(request.method === "GET" && request.url=="/"){
//         response.writeHead(200, {"Content-Type": "text/html"});
//         fs.createReadStream("testWHS.html").pipe(response);
//     }
// }

// http.createServer(function(request, response){
//     console.log("A user made a request" + request.url);
//     request.addListener('end', function () {
//         file.serve(request, response, function (e, res) {
//             if (e && (e.status === 404)) { // If the file wasn't found
//                 file.serveFile('testWHS.html', 404, {}, request, response);
//             }
//         });
//     }).resume();

//     response.writeHead(200, {"Context-Type": "text/plain"});
//     response.write("Here is some data");
//     response.end();
// }).listen("8888");

// console.log("Server is now running");



// var http = require('http');
// var node = require('node-static');
// var fileServer = new node.Server('./public');

// function findBooks(request, response){
//     var url = request.url;

//     if(url.split("/")[1] != 'test.WHS.html'){
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("<hq>Hello!</h1>");
//     }
// }

// "Hello world" server

// like include



// http.createServer(function (request, response) {
//     console.log("There you go, happy?");
//     response.writeHead(200, {"Context-Type": "text/plain"});
//     response.write("Here is your response");
//     response.end();
// }).listen("5764");

// console.log("User made a request");


// like a callback
// function handler (request, response) {
//     var url = request.url;
//     url = url.replace("/","");
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("<h1>Hello!</h1>");
//     response.write("<p>You asked for <code>" + url + "</code></p>");
//     response.end();
// }


// var server = http.createServer(handler);

// fill in YOUR port number!


// scp localmachine/Users/hariswasim/Desktop/Davis\ Work/Quarter_Work/Spring2018/ECS162/Assignments/github/photoQ/photoQ/server.js hariswas@138.68.254.37:
// scp hariswas@138.68.254.37: localmachine/Users/hariswasim/Desktop/Davis\ Work/Quarter_Work/Spring2018/ECS162/Assignments/github/photoQ/photoQ/testWHS.html

