var controller = function(formData){
    var fs = require('fs');
    var spawn = require('child_process').spawn;
    
    fs.readFile(__dirname+'/config',function(err,buf){
	var configObject = JSON.parse(buf);
	var machineName= configObject.machines[0].machinename;
	var pswd = configObject.password;

	fs.writeFile('arguments.txt',formData,function(err){
	    if(err)throw err;
	    else console.log('Arguments Saved');
	});
   
	var ls = spawn('./localrun',[__dirname,machineName,pswd]);

	ls.stdout.on('data', function (data) {
	    console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	    console.log('stderr: ' + data);
	});

	ls.on('exit', function (code) {
	    console.log('child process exited with code ' + code);
	});
    });
};

exports.controller = controller;