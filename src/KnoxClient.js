var knoxClient = function(socket,accessKey,secretKey,directoryPath,bucketId,folder,callbackfn){

var knox = require('knox'),
        fs = require('fs'),
        client = knox.createClient({
	    key: accessKey,
	    secret: secretKey,
	    bucket: bucketId
	});

var remotePath = '/BaushLomb/'; //Default Folder in Amazon S3 Bucket
var noOfFiles =0; 

if( folder != ''){
remotePath = '/BaushLomb/'+folder+'/'; 
}
console.log('Remote Path is ' + remotePath);

var pattern = /\/$/;
if(!pattern.test(directoryPath)){
directoryPath = directoryPath+'/';
}
console.log('Directory path is ' + directoryPath);

//Read the Directory & then Individual file is saved to specified Bucket in Amazon S3

  try{
    fs.readdir(directoryPath, function(err,files){
    if(err){
	console.log('Error Occurred ' + JSON.stringify(err));
	callbackfn({'Error':'Needs a Directory Path'});
	socket.emit('done',{'msg':'Needs a Directory Path'});
	return;
    }
	var count = files.length;
	console.log('files.length value is ' + files.length);
    files.forEach(function(file){
	console.log('Backing Up File  ' + directoryPath+file);
	fs.readFile(directoryPath+file,function(err,buf){
    	if(err){
	    console.log('Error Occurred ' + JSON.stringify(err));
	    socket.emit('note',{'NOTE':'Files in subDIR '+file+' will not be backed Up'});
	    count--;
	    return;
	}
        var req = client.put(remotePath+file, {
                        'Content-Length': buf.length,
                        'Content-Type': 'text/plain'
                 });
    	req.on('response', function(res){
	    console.log('status response for '+req.url+' is ' + res.statusCode);
	    if( res.statusCode == 200 ){
		noOfFiles++;
	    }
	    else{
		callbackfn({'err':'response status code is '+res.statusCode});
		socket.emit('done',{'msg':'response status code is '+res.statusCode});
	    }
	    if(noOfFiles == count){
		callbackfn({'msg':'Back Up successful'});
		socket.emit('done',{'msg':'Successfully done BackUP'});		
	    }
	});
    	req.end(buf);
	});
   });	
  });
  }
    catch(err){
	console.log('Error: '+JSON.stringify(err));
	callbackfn({'Error':'Error in backUp' + JSON.stringify(err)});
	socket.emit('done',{'msg':'Error In BackUP'});
    }
}

exports.knoxClient = knoxClient;
