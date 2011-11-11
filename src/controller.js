var controller = function(formData,callbackfn){
var fs = require('fs');
var exec = require('child_process').exec;
var async = require('async');

function callBackFn(error, stdout, stderr){ 
    if(stdout)console.log('stdout is: ' + stdout);
    if(stderr)console.log('stderr is: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
 }

    fs.writeFile('arguments.txt',formData,function(err){
	if(err)throw err;
	else console.log('Arguments Saved');
	});

    var machineName = JSON.parse(formData).machineName;

    if(machineName == 'localhost'){
	exec('node remote.js',callBackFn);
	callbackfn({'message':'BackUp Scheduled'});
    }

    else{
	exec('ssh -i ~/Downloads/my-ec2-key.pem '+machineName+' cd BL',function(error,stdout,stderr){
	if(stderr){
	    exec('ssh -i ~/Downloads/my-ec2-key.pem '+machineName+' mkdir BL',function(error,stdout,stderr){
	    if(stderr)console.log('stderr is: ' + stderr);
	    if (error !== null) {
		console.log('exec error: ' + error);
	    }    
	    exec('scp -i ~/Downloads/my-ec2-key.pem '+__dirname+'/duplicityScript.sh '+__dirname+'/remote.js '+__dirname+'/arguments.txt '+machineName+':~/BL/',function(error,stdout,stderr){
		if(stderr)console.log('stderr is: ' + stderr);
		if (error !== null) {
		    console.log('exec error: ' + error);
	    	}
		exec('ssh -i ~/Downloads/my-ec2-key.pem '+machineName+' node /home/ubuntu/BL/remote.js',callBackFn);
		exec('rm arguments.txt',callBackFn);
	    });
	    });	  
	}else{
	    exec('scp -i ~/Downloads/my-ec2-key.pem '+__dirname+'/arguments.txt '+machineName+':~/BL/',function(error,stdout,stderr){
		if(stderr)console.log('stderr is: ' + stderr);
		if (error !== null) {
		    console.log('exec error: ' + error);
		}	    	
            exec('ssh -i ~/Downloads/my-ec2-key.pem '+machineName+' node /home/ubuntu/BL/remote.js',callBackFn);
	    })
	    //exec('rm arguments.txt',callBackFn);
	}
	    callbackfn({'message':'BackUp Scheduled'});
	})
    }
}

exports.controller = controller;
