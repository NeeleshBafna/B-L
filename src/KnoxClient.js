var knoxClient = function(accessKey,secretKey,filePath,bucketId,callbackfn){

    var knox = require('knox'),
        sys = require('sys'),
        fs = require('fs'),
        client = knox.createClient({
	    key: accessKey,
	    secret: secretKey,
	    bucket: bucketId
	});
console.log(' file path is ' + filePath);
fs.readdir(filePath, function(err, files){
    if (err)
	throw err;
    files.forEach(function(file){
	console.log('filename is ' + file);
	console.log('filename+file is ' + filePath+'/'+file);
	fs.readFile(filePath+'/'+file,function(err,buf){
        var req = client.put('/BaushLomb/'+file, {
                        'Content-Length': buf.length,
                        'Content-Type': 'text/plain'
                 });
    req.on('response', function(res){
	console.log('status response is ' + res.statusCode);
     });
    req.end(buf);
	});
    });
	});
}

exports.knoxClient = knoxClient;
