var url     = require("url");
var http    = require("http");
var sizeOf  = require("image-size");
var sqlite3 = require("sqlite3").verbose();
var fs      = require("fs");
var db      = new sqlite3.Database("PhotoQ.db");
var imgList = JSON.parse(fs.readFileSync("6whs.json")).photoURLs;

for(var i = 0; i < imgList.length; ++i) {
        console.log("Enqueing item ", i," ", imgList[i]);
        enqueue(i, imgList[i], enqueueCallback);
}

// dumpDB();

function enqueue(index, imgURL, callback) {
        var fileName = getFileName(imgURL);
        var landmark = "";
        var tags     = "";

        http.get(url.parse(imgURL), function(response) {
                var chunks = [];
                response.on('data', function(chunk) {
                        chunks.push(chunk);
                }).on('end', function() {
                        var buffer = Buffer.concat(chunks);
                        var dims = sizeOf(buffer);
                        callback(index, fileName, dims.width, dims.height, landmark, tags);
                });
        });

        function getFileName(url) {
                var i = url.length-1;
                while(url[i] != "/") { --i; }
                return url.substring(i+1);
        }
}

function enqueueCallback(index, fileName, width, height, landmark, tags) {
        var cmd = 'INSERT INTO photoTags VALUES ( _IDX, "_FILENAME", _WIDTH, _HEIGHT, "_LANDMARK", "_TAGS" )';
        cmd = cmd.replace("_IDX", index.toString());
        cmd = cmd.replace("_FILENAME", fileName);
        cmd = cmd.replace("_WIDTH", width.toString());
        cmd = cmd.replace("_HEIGHT", height.toString());
        cmd = cmd.replace("_LANDMARK", landmark);
        cmd = cmd.replace("_TAGS", tags);
        console.log("Running command: ", cmd);
        db.run(cmd, insertionCallback);

        function insertionCallback(err) {
                if(err) {
                        console.log("Row insertion error: ", err);
                } else {
                        console.log("Command success: ", cmd);
                }
        }
}

function dumpDB() {
        db.all ( 'SELECT * FROM photoTags', dataCallback);
        function dataCallback( err, data ) {
                console.log(data);
        }
}
