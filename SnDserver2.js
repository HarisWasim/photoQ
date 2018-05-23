var url     = require('url');
var http    = require('http');
var static  = require('node-static');
var sqlite3 = require('sqlite3').verbose();
var fs      = require('fs');  // file access module
var port    = 8888;
var db      = new sqlite3.Database("PhotoQ.db");

// Initialize the Server
var fileServer = new static.Server('./public');

function handler(request, response) {
    	var url = request.url;
            url = url.split("/")[1];

    	if(url.substring(0,14) == 'query?numList=') {
		var nums = url.substring(14).split("+");
		var numEntries = nums.length;
		var objs = [];
		var ctr = 0;
		response.writeHead(200, {"Content-Type": "text/plain"});
		for(var i = 0; i < nums.length; ++i) {
			var cmd = "SELECT fileName, width, height FROM photoTags WHERE idNum = " + nums[i] + ";";
			if(nums[i] >= 0 && nums[i] <= 988) {
				db.each(cmd, function(err, row) {
					if(!err) {
						objs[ctr] = row;
					}
					ctr++;
					if(ctr == numEntries) {
						var myJSON = JSON.stringify(objs);
						response.write(myJSON);
						response.end();
					}
				});
			} else {
				numEntries--;
			}
		}
    	} else {
        	request.addListener('end', function () {
            		function fnf(e, res) {
                		if(e && (e.status === 404)) {
                    			fileServer.serveFile('./not-found.html', 404, {}, request, response);
                		}
            		}
            		fileServer.serve(request, response, fnf);
        	}).resume();
    	}
}

var server = http.createServer(handler);
server.listen(port);

